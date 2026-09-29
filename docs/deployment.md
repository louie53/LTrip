# M0 部署准备

**状态：未创建托管资源或公开部署。** 用户已将基础提交 `ae22794` 推送到 [louie53/LTrip](https://github.com/louie53/LTrip) 的 `main`；本地修复及本轮首页接入尚未推送。本地启动、构建和页面验收的实际结果见 [PROGRESS.md](./PROGRESS.md)。

LocalTrip 采用 Node.js Web Service 运行方式，保留服务端 Route Handler，后续承载身份和预订逻辑。不要配置为 `output: "export"` 静态导出。Render 官方区分完整服务端应用的 Web Service 与静态导出站点；本项目选前者。[官方部署说明](https://render.com/docs/deploy-nextjs-app)

## 最小配置记录

以下是用户确认部署后可采用的配置，不会自动创建服务：

| 设置 | 值 |
|---|---|
| Service type / runtime | Web Service / Node |
| Repository / branch | `https://github.com/louie53/LTrip` / `main`；已存在，尚未连接托管服务 |
| Root directory | 仓库根目录 |
| Node.js | 与项目 `.nvmrc` 和 `package.json` 要求保持一致 |
| Build command | `npm ci && npm run build` |
| Start command | `npm run start` |
| Health check path | `/api/health` |
| Port | 由托管环境设置 `PORT` |
| Region / plan | 部署时核对可用区域、费用和配额，由用户确认 |

`npm run start` 运行已经构建的 Next.js 应用。Next.js 支持从进程环境读取 `PORT`，默认端口为 3000，默认监听 `0.0.0.0`。`PORT` 应在托管平台或启动命令中设置，不能依靠 `.env.local` 设置服务器端口。[Next.js CLI](https://nextjs.org/docs/app/api-reference/cli/next)

M0 的健康检查只证明应用能处理请求，不包含数据库、登录、库存或第三方服务的可用性。当前也没有这些依赖。

## 本地模拟生产启动

在项目根目录执行。若本项目的开发服务正在运行，先在其终端使用 `Ctrl+C` 停止，再构建并启动生产服务：

```sh
npm ci
npm run build
npm run start -- --hostname 127.0.0.1
```

浏览器打开 `http://localhost:3000` 和 `http://localhost:3000/api/health`。端口占用时可使用 `npm run start -- --hostname 127.0.0.1 --port 3001`，然后访问对应端口。开发模式与生产模式不要同时占用同一个端口；结束服务使用 `Ctrl+C`。

这些是复现步骤，不代表本文件作者已经执行。请以 PROGRESS 中带结果的记录为准。

## 账户、配置与授权

M0 本地运行不需要 Supabase、支付、地图或 AI 密钥。后续阶段真正需要变量时，在本地 `.env.local` 填写，并在 `.env.example` 记录无秘密的说明；不要把密钥发到聊天中。服务端变量默认不暴露给浏览器，`NEXT_PUBLIC_` 前缀会使对应值进入客户端构建，因此不可用于数据库密码等秘密。[Next.js 环境变量说明](https://nextjs.org/docs/app/guides/self-hosting#environment-variables)

公开部署前需要用户确认托管账户、方案与要部署的提交，并授权公开地址。远程推送由用户处理。费用按当时方案核查，不假设免费额度永久有效。本轮不创建 Render 或 Supabase 资源。

`ae22794` 的[首次 GitHub Actions 运行](https://github.com/louie53/LTrip/actions/runs/35978397962)安装成功，但 lint 失败，后续检查跳过；修复后的远程结果尚未验证。本地检查通过不能代替 GitHub Actions 远程运行。公开后应另记真实地址、部署版本、健康检查结果与远程 CI 结果。
