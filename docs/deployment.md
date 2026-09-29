# M0 部署准备与 Render 备选方案

**状态：未创建托管资源或公开部署。** 用户已将首页接入及工具链修复提交 `cff7e4d` 推送到 [louie53/LTrip](https://github.com/louie53/LTrip) 的 `main`，对应远程 CI 已通过。本地启动、构建和页面验收的实际结果见 [PROGRESS.md](./PROGRESS.md)。

**最新决定：暂不部署。** 2026-09-29 用户在「LocalTrip｜AWS 部署」明确选择保持 Free plan，项目目前不需要上线，以后有需要再提出。该对话记录了两个已创建的费用预算及四条邮箱告警，实际邮件送达仍未验证；全部学习资源保持原状，账户未升级。EC2／Lightsail／域名及公开部署方案均暂缓，不再要求用户继续盘点、升级或创建服务。详见 [AWS 部署记录](./aws-deployment.md)。

账户核对显示 **Free account plan 于 2026-11-01 结束**，区别于两笔 **Free Tier／EC2 学习奖励额度的 2027-05-01 到期日**。M0 按用户调整后的范围完成本地与部署准备收尾，线上地址未实现；后续重新提出部署时再核对账户、费用和兼容性，不能直接执行历史方案。

以下 Render 内容是此前已审查的**备选方案**，保留供比较；当前不执行其中的创建或部署步骤。官方资料核对日期：2026-09-29。实际部署耗时和运行内存仍须在获批部署后验证。

LocalTrip 需要保留 Node.js 服务端运行能力和 Route Handler。不要配置为 `output: "export"` 静态导出。若使用 Render，官方区分完整服务端应用的 Web Service 与静态导出站点；本项目应选前者。[官方部署说明](https://render.com/docs/deploy-nextjs-app)

## Render 备选方案与费用边界

若后续决定采用 Render，原候选方案为：**Render Hobby 工作区 + 一个 Free Node Web Service**。用于验证公开演示链路，暂不增加数据库、付费实例、磁盘或自定义域名。当前应用可直接使用原生 Node 运行方式，不需要为这一页增加 Docker、自定义服务器或 Blueprint。

| 项目 | 官方当前公布的额度／价格 | 对本项目的影响 |
|---|---|---|
| Hobby 工作区 | $0/月 | 工作区套餐与服务实例是两层设置，需要分别确认 |
| Free Web Service | $0/月，512 MB RAM | 本次建议的唯一实例；实际内存表现尚未在 Render 测量 |
| Hobby 出站流量 | 每月包含 5 GB | 工作区内共享，网站图片也占流量 |
| 标准构建流水线 | 每月包含 500 分钟 | 构建消耗此额度，与服务运行时间不同 |

以上数值来自 [Render 定价](https://render.com/pricing) 与 [新工作区套餐说明](https://render.com/docs/new-workspace-plans)，不承诺永久不变，也不将免费套餐理解为无使用限制。

- Free 实例连续 15 分钟没有访问会休眠，下次访问的唤醒过程通常约一分钟；工作区每月共享 750 个免费实例小时。适合当前 M0 演示，但首次访问等待会影响招聘者体验。[Free 限制](https://render.com/docs/free)
- 绑定付款方式后，超出的带宽／构建用量可能计费。没有付款方式时，达到相关额度会暂停服务或新构建。本次只接受免费范围；创建时若要求绑卡、授权扣款或显示付费方案，先停下交由用户确认。[计费 FAQ](https://render.com/docs/faq)
- 免费实例的运行时文件不持久保存。当前图片来自 Git 仓库，无需新增存储；图片优化缓存可以重新生成。以后需要保存业务数据时，在对应里程碑另行设计。[文件系统限制](https://render.com/docs/free)

## 确认后填写的具体配置

以下字段填在 Render 的 **New → Web Service** 表单中。本文件没有创建任何服务；点击最终创建按钮会触发首次部署，须先取得用户的公开部署确认。

| 设置 | 值 |
|---|---|
| Workspace plan | Hobby |
| Service name | `ltrip`；如不可用，可用 `ltrip-louie53`，实际网址由平台分配 |
| Service type / runtime | Web Service / Node |
| Repository / branch | Git Provider → GitHub → `louie53/LTrip` / `main` |
| 已通过 CI 的候选版本 | `cff7e4dc7ef1d21e3148f0ff2eb37b6673bf639e` |
| Root directory | 留空，使用仓库根目录 |
| Region | Singapore（本次建议，用户可确认；尚未实测新西兰访问延迟） |
| Instance / compute plan | Free |
| Node.js | `24.11.1`，与已提交 `.nvmrc` 一致 |
| Build command | `npm install --global npm@11.7.0 && npm ci --include=dev --include=optional && npm run build` |
| Start command | `npm run start -- --hostname 0.0.0.0` |
| Health check path | `/api/health` |
| 环境变量 | `NODE_VERSION=24.11.1`；`NEXT_TELEMETRY_DISABLED=1`。均非密钥 |
| Port | 使用 Render 提供的 `PORT`，不固定为本地 3000 |
| Auto-Deploy | Off，按本项目每一步确认后手动发布 |
| Pre-deploy command / disk / database | 留空，不添加 |

Singapore 是官方列出的区域之一；当前区域列表没有新西兰或澳大利亚。此选择是本项目的候选方案，并非最低延迟测试结论。服务创建后不能直接更改区域，迁移需要新建服务。[区域说明](https://render.com/docs/regions)

Render 支持 `.nvmrc`，但 `NODE_VERSION` 的优先级更高；两者均填 `24.11.1`，防止环境采用平台默认值。构建命令先固定 npm，再按锁文件安装，显式保留 TypeScript／Tailwind 等开发依赖及图片优化所需的可选平台依赖。它是待在 Render 执行的构建方案，不是已运行的云端命令。[Node 版本选择](https://render.com/docs/node-version)

`next start` 运行已经构建的应用，读取进程环境中的 `PORT`。云端必须监听 `0.0.0.0`，让平台代理访问；本地验收使用的 `127.0.0.1` 只允许本机连接，因此不要原样抄到云端。Render 默认提供 `PORT=10000`，无需在 `.env.local` 写端口，也不要把 `npm run dev` 用作部署启动命令。[Render 端口要求](https://render.com/docs/web-services#port-binding)、[Next.js CLI](https://nextjs.org/docs/app/api-reference/cli/next)

Auto-Deploy 设为 Off 只关闭后续自动发布，**不阻止点击 Create Web Service 后的首次部署**。新版本获批时手动选择提交；若 `main` 已经变化，先核对新 SHA 与对应 CI，不能将旧版本检查结果套用于新版本。[部署与手动选择提交](https://render.com/docs/deploys)

M0 的健康检查只证明应用能处理请求，不包含数据库、登录、库存或第三方服务的可用性。当前也没有这些依赖。

## 账户准备与操作顺序

1. 用户自行登录或注册 [Render](https://dashboard.render.com/)，选择个人 Hobby 工作区；不发送密码、验证码或访问令牌到聊天。
2. 用户确认本方案及公开部署范围后，连接 GitHub，仓库权限选择本次需要的 `louie53/LTrip`。Render 支持 GitHub 登录和 Git Provider 授权；以实际授权页列出的权限为准。[Git 连接说明](https://render.com/docs/git-provider)
3. 按上表填写 Web Service 表单，复核 Free、区域、构建命令、启动命令、健康路径、自动部署设置及 `main` 当前提交。
4. 确认没有收费或额外资源后，才执行获授权的 Create Web Service。这个按钮开始实际构建和公开部署，并不是单纯保存草稿。[创建流程](https://render.com/docs/web-services)
5. 查看部署日志，记录实际提交、Node／npm 版本、构建和启动结果。失败时先按日志定位，不自动升级付费或放宽检查。
6. 把平台给出的真实 HTTPS 地址交给 PM 验收。不要预先假定 `ltrip.onrender.com` 已经属于本项目。

## 公开后的验收标准（本轮未执行）

- Render 显示服务成功运行，部署提交与批准版本一致；构建及启动日志没有阻塞错误。
- PM 实际打开 HTTPS 首页：桌面和手机布局、海岸图、AI 标注及完整演示声明正常；Tab 和页内链接正常；浏览器控制台无应用错误。
- `GET /api/health` 返回 HTTP 200、`{"data":{"status":"ok"}}` 和 `Cache-Control: no-store`。把该路径配置为平台 HTTP 健康检查。[健康检查说明](https://render.com/docs/health-checks)
- 让用户从另一台设备或手机网络打开，确认不是只在本机可访问。遇到免费实例唤醒页，记录等待情况，不能将其当成页面损坏或谎称即时可用。
- 将实际网址、版本、套餐和线上验收结果写回 README／PROGRESS。达到这些条件后才将 M0 的公开测试地址项标记完成，随后停止，不进入 M1。

## 本地模拟生产启动

在项目根目录执行。若本项目的开发服务正在运行，先在其终端使用 `Ctrl+C` 停止，再构建并启动生产服务：

```sh
npm ci
npm run build
npm run start -- --hostname 127.0.0.1
```

浏览器打开 `http://localhost:3000` 和 `http://localhost:3000/api/health`。端口占用时可使用 `npm run start -- --hostname 127.0.0.1 --port 3001`，然后访问对应端口。开发模式与生产模式不要同时占用同一个端口；结束服务使用 `Ctrl+C`。

这些是复现步骤，不代表本文件作者已经执行。请以 PROGRESS 中带结果的记录为准。

当前已由 PM 保留一个本地生产服务；检查网页时直接访问即可，不要再占用 3000。其会话和重启记录见 PROGRESS，本次部署准备没有操作该进程。

## 账户、配置与授权

M0 本地运行不需要 Supabase、支付、地图或 AI 密钥。后续阶段真正需要变量时，在本地 `.env.local` 填写，并在 `.env.example` 记录无秘密的说明；不要把密钥发到聊天中。服务端变量默认不暴露给浏览器，`NEXT_PUBLIC_` 前缀会使对应值进入客户端构建，因此不可用于数据库密码等秘密。[Next.js 环境变量说明](https://nextjs.org/docs/app/guides/self-hosting#environment-variables)

公开部署前需要用户确认托管账户、方案与要部署的提交，并授权公开地址。远程推送由用户处理。费用按当时方案核查，不假设免费额度永久有效。本轮不创建 Render 或 Supabase 资源。

`cff7e4d` 的 [GitHub Actions 运行](https://github.com/louie53/LTrip/actions/runs/36522712121)已核实安装、lint、类型检查、单元测试及生产构建全部成功，解决了初始提交的 lint 失败。远程 CI 通过不等于部署已完成；公开后仍需另记真实地址、部署版本及线上健康检查结果。

本轮实际完成的是配置与官方资料核对，以及文档差异检查。未执行 Render 构建、创建服务、账户授权、计费操作或线上 HTTP／浏览器验收；没有新增应用配置文件或修改依赖。本地和 GitHub 的历史通过结果保持原有验证范围。
