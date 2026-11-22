// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "jsr:@supabase/server@1";

const ALLOWED_ORIGINS = new Set([
  "https://eyuxq.com",
  "https://www.eyuxq.com",
  "https://russianhub.github.io",
]);

function corsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("Origin") ?? "";
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
  if (ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

const systemPrompt = `你是“俄语星球 AI 学习助理”，服务中国俄语学习者和在俄罗斯留学生。
回答必须准确、友好、简洁，并优先帮助用户真正学会，而不只是给答案。
规则：
1. 中俄翻译要给自然表达；必要时补充重音、语法、语境和更口语的版本。
2. 纠错时按“修改后—问题—解释—替代表达”组织。
3. 学习计划必须具体、可执行，并考虑用户水平和每日可用时间。
4. 对话陪练时保持用户要求的角色和水平，一次推进一轮；发现错误可温和纠正。
5. 只能把上下文中的资源称为本站资源；不要虚构网址。
6. 涉及签证、法律、医疗、学校规定、汇率或时效信息时，提醒用户以官方最新信息为准。
7. 不索取密码、验证码、证件号等敏感信息。拒绝作弊、违法和危险请求。
8. 默认用中文解释，俄语示例使用西里尔字母。`;

const json = (req: Request, body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { ...corsHeaders(req), "Content-Type": "application/json" },
});

export default {
  fetch: withSupabase({ auth: ["publishable", "secret"] }, async (req) => {
    if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders(req) });
    if (req.method !== "POST") return json(req, { error: "Method not allowed" }, 405);

    try {
      // Verify the caller is a real signed-in Supabase user before spending AI quota.
      const authorization = req.headers.get("authorization") || "";
      const apikey = req.headers.get("apikey") || "";
      const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
      if (!authorization || !apikey || !supabaseUrl) return json(req, { error: "请先登录" }, 401);
      const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
        headers: { authorization, apikey },
      });
      if (!userResponse.ok) return json(req, { error: "登录状态无效，请重新登录" }, 401);

      const deepseekKey = Deno.env.get("DEEPSEEK_API_KEY");
      const openaiKey = Deno.env.get("OPENAI_API_KEY");
      const provider = (Deno.env.get("AI_PROVIDER") || (deepseekKey ? "deepseek" : "openai")).toLowerCase();
      if (provider === "deepseek" && !deepseekKey) throw new Error("DEEPSEEK_API_KEY is not configured");
      if (provider === "openai" && !openaiKey) throw new Error("OPENAI_API_KEY is not configured");
      const body = await req.json();
      const message = String(body?.message || "").trim().slice(0, 2000);
      if (!message) return json(req, { error: "Message is required" }, 400);
      const history = Array.isArray(body?.history)
        ? body.history.slice(-12).map((item: any) => ({
            role: item?.role === "assistant" ? "assistant" : "user",
            content: String(item?.content || "").slice(0, 3000),
          }))
        : [];
      const context = JSON.stringify(body?.context || {}).slice(0, 12000);
      const userContent = `用户当前问题：${message}\n\n可用的本站资源与学习状态：${context}`;
      const useDeepSeek = provider === "deepseek";
      const response = await fetch(useDeepSeek ? "https://api.deepseek.com/chat/completions" : "https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${useDeepSeek ? deepseekKey : openaiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(useDeepSeek ? {
          model: Deno.env.get("DEEPSEEK_MODEL") || "deepseek-flash",
          messages: [
            { role: "system", content: systemPrompt },
            ...history,
            { role: "user", content: userContent },
          ],
          thinking: { type: "disabled" },
          max_tokens: 1200,
          stream: false,
        } : {
          model: Deno.env.get("OPENAI_MODEL") || "gpt-5-mini",
          instructions: systemPrompt,
          input: [...history, { role: "user", content: userContent }],
          max_output_tokens: 1200,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error?.message || "OpenAI request failed");
      const reply = useDeepSeek
        ? data.choices?.[0]?.message?.content
        : data.output_text || data.output
            ?.flatMap((item: any) => item.content || [])
            .find((item: any) => item.type === "output_text")?.text;
      if (!reply) throw new Error("Empty model response");
      return json(req, { reply });
    } catch (error) {
      console.error(error);
      return json(req, { error: "AI service is temporarily unavailable" }, 503);
    }
  }),
};
