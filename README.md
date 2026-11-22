# 俄语星球

> **网站入口：[立即打开俄语星球 →](https://eyuxq.com/)**

[AI 学习助理](https://eyuxq.com/agent.html) · [资源导航](https://eyuxq.com/resources.html) · [学习路线](https://eyuxq.com/roadmap.html) · [登录](https://eyuxq.com/auth.html)

面向中国俄语学习者和在俄罗斯留学生的学习、交流与生活资源平台。

## 主要功能

- 171 个经过整理的俄语课程、词典、翻译、听说输入、留学、求职、兼职、社交和 ИГУ 学生入口
- AI 学习助理：中俄翻译、俄语纠错、学习计划、场景对话和站内资源推荐
- A1–C1 学习路线、生词本、语法练习、每日任务和学习档案
- 邮箱验证码登录、学习数据云同步和管理员数据后台
- 响应式网页与 PWA，支持手机和电脑

## 目录结构

```text
sites-plugin-sites-openai-curated-remote/work/life-spark/
├── dist/                    # GitHub Pages 部署目录
│   ├── index.html           # 首页
│   ├── agent.html           # AI 学习助理
│   ├── russian-data.js      # 资源目录
│   └── ...
├── supabase/functions/      # AI Agent 服务端函数
├── docs/                    # Supabase 与 AI 部署说明
├── check-russian-hub.cjs    # 功能检查
└── audit-site.cjs           # 资源和公开文件审计
```

## 本地预览

```powershell
cd sites-plugin-sites-openai-curated-remote/work/life-spark
node serve.cjs
```

浏览器打开 `http://localhost:4173`。

## 检查

```powershell
node check-russian-hub.cjs
node audit-site.cjs
```

## AI Agent 部署

网页不会保存模型密钥。真实 AI 请求通过 Supabase Edge Function 转发，配置步骤见 [`docs/ai-agent-setup.md`](sites-plugin-sites-openai-curated-remote/work/life-spark/docs/ai-agent-setup.md)。

## 安全与版权

- 网盘入口仅用于管理自有或获授权资料，不收录盗版、破解软件或来源不明的分享链接。
- 浏览器只使用可公开的 Supabase publishable key；服务端密钥不得提交到仓库。
- AI 输出可能有误，签证、法律、医疗和学校规定请以官方最新信息为准。
