# 俄语星球 AI Agent 部署

前端已经包含游客站内检索和登录用户 AI 对话。真实模型调用必须经过 Supabase Edge Function，不能把 `OPENAI_API_KEY` 写入网页、GitHub 仓库或 `auth-config.js`。

## 1. 安装 Supabase CLI 并登录

```powershell
npx supabase login
npx supabase link --project-ref oysjcnqglghkjjbiffzv
```

## 2. 保存服务端密钥

推荐使用价格较低的 DeepSeek Flash：

```powershell
npx supabase secrets set DEEPSEEK_API_KEY=你的_DeepSeek_API_Key
npx supabase secrets set DEEPSEEK_MODEL=deepseek-flash
npx supabase secrets set AI_PROVIDER=deepseek
```

也可以保留 OpenAI 作为备用：

```powershell
npx supabase secrets set OPENAI_API_KEY=你的_OpenAI_API_Key
npx supabase secrets set OPENAI_MODEL=gpt-5-mini
```

密钥只会保存在 Supabase 服务端。不要截图、提交或发送给其他人。

## 3. 部署函数

在 `work/life-spark` 目录执行：

```powershell
npx supabase functions deploy russian-agent
```

函数默认要求 Supabase 登录 JWT；这与网站现有邮箱验证码登录兼容。部署后访问：

`https://eyuxq.com/agent.html`

游客仍可使用站内资源检索；登录用户可使用完整 AI 对话。

## 安全要求

- 只使用浏览器可公开的 Supabase publishable key。
- OpenAI API Key 只能放在 Supabase Secrets。
- 上线前在 OpenAI 平台设置项目预算与用量告警。
- 在 Supabase 查看 Edge Function 日志与调用量，遇到滥用时可暂停函数。
