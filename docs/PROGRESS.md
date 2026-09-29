# LocalTrip 进度与交接

更新日期：2026-09-29（Pacific/Auckland）。

## 当前阶段

**M0 按用户调整后的范围收尾：本地项目、检查、浏览器验收、`cff7e4d` 的远程 CI 和部署准备已完成。用户已决定保持 AWS Free plan，项目目前不需要上线；公开部署和线上 URL 明确暂缓，不能标记为通过。AWS 已配置费用预算，未创建 LTrip 主机或公开发布。当前只剩文档提交由用户处理；M1 尚未获授权、未开始。**

此前用户明确授权最小 lint 修复，并自行完成 Vitest `.mts` 重命名和类型检查范围修复。2026-09-29 用户授权继续 M0 后续；PM 协调首页接入并验收。随后完成 Render 和 AWS 部署准备。最新用户在 AWS 部署对话决定「先 Free plan，项目目前不需要上线，以后有需要再说」；已覆盖此前的部署候选和后续操作建议。

用户最新决定：主对话作为 PM／整体验收入口；在 LTrip 项目中使用可单独追问的 UI 设计、项目初始化和 AWS 部署对话。内部 agent 不替代这些用户可见对话。每个小步骤完成后汇报并停止，用户确认后才继续下一步。用户自行推送 GitHub。

2026-09-29 补充约定：用户要求以后每步结束都给下一步指引。已写入 AGENTS.md：报告完成内容和验证边界，说明下一步由谁、在哪个任务或目录操作，提供必要命令、成功标志以及需反馈的输出；保留运行中的服务时说明地址与归属，避免重复启动。约定更新时仅修改文档，`git diff --check` 通过，未重复应用检查。用户随后完成提交推送，远程结果见下方最新记录。

用户已选择直接使用当前 LTrip 目录，各对话的写入边界如下：

| 对话 | ID | 本次交付与写入边界 |
| --- | --- | --- |
| LocalTrip｜UI 设计 | `01a0d28a-8295-72b1-8cb7-6bf02b2d450e` | 首页桌面／手机第一稿，仅写 `docs/design/` 或报告设计工具的产物路径；交付后停下 |
| LocalTrip｜项目初始化 | `01a0d28a-85b9-79b3-a2d8-424839a17628` | 已完成最小 lint 修复；2026-09-29 完成首页设计接入、相关说明更新、四项检查和生产启动，交付后停下 |
| LocalTrip｜AWS 部署 | `01a0eb93-aced-7172-97c2-1f45494709fc` | 已交付方案、账户核对、学习资源盘点和获批的预算配置；仅写 `docs/aws-deployment.md`；按用户最终决定保持 Free、保留学习资源、暂不部署，已停止 |

测试分工建议：M0 由开发执行检查、PM 独立浏览器验收；M1/M2 再考虑单独的测试与质量对话。当前 Playwright 技能可用、Vitest 已安装；未额外安装测试技能，未创建测试对话。

本轮尚未开始 M1；没有数据库、登录、预约、后台或任何后续模块。

## 已完成的准备与草稿

- 完整阅读 701 行项目计划及 49 行启动说明。
- 初始文档目录名为 `docx/`；用户随后自行更名为 `docs/`，现在已按新路径工作。保留两份源文档；`docs/project-plan.md` 是项目计划的原样副本。
- 检查目录：开始时没有应用代码、Git 仓库或已有锁文件；保留 `.DS_Store` 并在 Git 中忽略。
- 初始化本地 Git `main`；用户先推送 `ae22794`（`chore: add M0 foundation draft`），后推送 `cff7e4d`（`feat: integrate M0 homepage and fix tooling`）至 `https://github.com/louie53/LTrip`，本地 `main` 已跟踪 `origin/main`。提交和推送均由用户完成。
- 写入 Next.js App Router／TypeScript／Tailwind 基础配置及首页、布局、图标、健康接口草稿。
- 写入 npm 开发／检查／构建脚本、Vitest 健康响应合同测试、GitHub Actions 配置骨架。
- 写入 README、AGENTS、路线图、部署准备、学习说明、`.gitignore` 和无密钥的 `.env.example`。
- `npm install` 已完成并生成 `package-lock.json`。这不等于应用检查或构建通过。

首页现已接入用户确认“暖白＋深绿＋海岸大图，保留概念风景图”的方向，并通过 PM 本次浏览器验收。以本地静态稿和交接说明为实现依据，保留 Georgia／Arial 系统字体及图片 AI 标注；没有修改 Figma 或原设计资料。用户仍可在本地审阅视觉细节。

## 2026-09-29 用户推送及远程 CI 复核

- 提交：`cff7e4dc7ef1d21e3148f0ff2eb37b6673bf639e`，标题 `feat: integrate M0 homepage and fix tooling`。用户提供 `ae22794..cff7e4d main -> main` 推送结果；PM 核对本地提交一致，检查时工作区干净。
- PM 通过 GitHub 公共 API 只读查询运行及 job steps，核实 [CI 运行 36522712121](https://github.com/louie53/LTrip/actions/runs/36522712121) 的 `head_sha` 与该提交完全一致，状态为 `completed`、结论为 `success`。
- `checks` job 的 **Install locked dependencies（npm ci）、Lint、Typecheck、Unit tests、Production build 全部 completed / success**；设置 Node／npm 等步骤也成功，没有将跳过项计为通过。运行时间为 2026-09-29 04:41:04–04:41:38 UTC。
- 旧提交 `ae22794` 的失败记录保留为历史，当前修复已有远程通过证据。CI 通过不代表公开部署已完成。
- 本次 PM 仅更新 PROGRESS、README 和部署说明中的状态，并运行 `git diff --check`；未重复本地应用检查，未提交、推送或创建托管资源。这些状态文档的新改动尚未提交，可随后续文档收尾一起提交。
- 此步完成后用户授权部署准备审查，结果见下一节；这不等于公开部署授权。

## 2026-09-29 M0 收尾与部署暂缓

- PM 已读取部署对话最新用户决定、最终交付及 `docs/aws-deployment.md` 第 13 节：保持 Free plan，目前不需要上线，未来有需求再提出。此前「继续只读盘点」「选择域名」「升级后部署」等下一步均已被最新决定替代，不要求用户重复执行。
- 据部署对话的保存后复核记录，已创建两个费用预算和四条邮箱告警；账户仍为 Free，学习资源保持原状。邮件实际送达尚未验证，预算不是 LTrip 的上线或运行证明。PM 本步没有重新访问 AWS、创建预算或操作资源。
- 收尾判定：原计划的公开测试地址由用户明确暂缓；本地基础、文档、检查、CI 及浏览器验收已达到当前 M0 范围。保留原项目计划作为源文档，在 AGENTS、README、roadmap、deployment 和本记录中同步范围调整，不把线上项伪记为成功。
- 本步只修改文档，`git diff --check` 通过；应用和依赖未变，未重跑 lint、typecheck、unit、build 或浏览器验收，也未重启本地服务。相关历史通过证据见下方。文档未提交、未推送，由用户完成。
- M0 到此停止。下一里程碑建议从 M1 的最小数据模型和数据流讲解开始，先确认边界再实现；该建议不代表已经授权或开始 M1。

## 2026-09-29 AWS 方向与部署分工（历史准备记录）

- 用户已有 Render 账户，但选择结合正在学习的 AWS。用户最初将额度描述为学校／活动赠送；部署对话后续在用户授权下读取实际控制台，已修正为 Free account plan 与 Free Tier／EC2 学习活动额度。普通 AWS 账户不等于 Paid plan。
- PM 已创建用户可见的「LocalTrip｜AWS 部署」对话并派发第一小步，负责比较单台 EC2 原生 Node 与 Lightsail 等低复杂度路线，给出费用组成、HTTPS、日志、重启、回退与清理方案。当前不新增应用代码、Docker、云资源或自动发布配置。
- 当前 [Amplify 官方支持说明](https://docs.aws.amazon.com/amplify/latest/userguide/ssr-amplify-support.html)列出的 Next.js 支持范围为 12–15；本项目为 16.3.6，存在正式支持范围差距。方案评估不能假定已兼容，也不能擅自降级依赖。
- 部署对话已交付 [aws-deployment.md](./aws-deployment.md)，PM 读取了该文件及已完成的任务状态。用户给 PM 的 Credits 截图显示两笔 Active 额度及合计预计余额；金额已在聊天核对，不将账户／Credit ID、截图或账单明细写入仓库。
- 据部署对话的实际控制台记录，Free account plan 于 **2026-11-01** 结束，两笔额度到期日为 **2027-05-01**；适用服务列表包含 EC2、Lightsail、VPC 与 Data Transfer。该对话还观察到 N. Virginia 的既有学习资源用量；账单用量不能证明资源此刻仍存在或可复用。本 PM 步骤没有再次访问账户。
- PM 核对了 [AWS 账户计划官方规则](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html)：Free plan 在六个月或额度用尽时结束，以先到者为准；不升级则账户关闭，失去资源访问。不能按额度余额推断网站可一直运行到 2027 年。升级 Paid、创建资源及公开发布均未获批。
- PM 审阅结论：接受初步调查与有条件的单台 EC2 方向；具体 EC2 区域报价、创建权限、HTTPS 地址和实际云端运行尚未验证，因此不是可直接执行的最终部署批准。下一步建议只读盘点既有资源，并确认域名与展示期限。
- 本步 PM 更新 AGENTS、部署说明和本记录；保留之前 README 等未提交变化，`git diff --check` 通过。应用与依赖未变，不重复运行应用检查或浏览器验收；当前本地服务未被本步启停。未创建、删除或修改云资源。

## 2026-09-29 Render 部署准备审查（现为备选）

- PM 已阅读 Render 当前官方的 Next.js 部署、Node 版本、Free 限制、定价、区域、Git 连接、端口、健康检查及手动部署说明。来源、访问日期和可直接填写的配置集中在 [deployment.md](./deployment.md)。
- 推荐沿用原计划：Hobby 工作区、一个 Free Node Web Service，区域候选 Singapore，部署仓库 `louie53/LTrip`、分支 `main`、候选提交 `cff7e4d`。实例与工作区都选免费范围，先使用平台分配域名，不创建数据库、磁盘或其他服务。
- 已告知免费实例的休眠与唤醒等待；记录共享额度、绑卡后的超额计费边界。方案只覆盖免费范围，出现付费要求时交用户确认，不能自动升级。当前账户是否已有付款方式或满足免费创建条件仍未核实。
- 初始化任务只读核对项目与已安装 Next CLI：标准 Node Web Service 无需改源码；`next start` 支持 `PORT` 和 `0.0.0.0`；健康接口合同有效；锁文件已含 sharp 及 Linux 平台包；无新增密钥需求。
- 具体云端构建命令：`npm install --global npm@11.7.0 && npm ci --include=dev --include=optional && npm run build`。启动命令：`npm run start -- --hostname 0.0.0.0`，使用平台的 `PORT`。非秘密配置 `NODE_VERSION=24.11.1`、`NEXT_TELEMETRY_DISABLED=1`。这些命令和变量仅形成方案，未在 Render 执行。
- 建议 Auto-Deploy 为 Off，避免每次推送自动公开新版本。首次点击 Create Web Service 仍会立即触发构建和公开，必须在用户确认之后进行；账户登录与 GitHub 授权由用户在平台完成，不索要密码或令牌。
- 本次只读检查 Git／配置／已安装 CLI 和官方资料，更新 `docs/deployment.md` 与本记录，`git diff --check` 通过。未重复 lint、typecheck、unit、build 或浏览器验收：应用未变且已验收。本次未创建托管资源、操作计费、推送、部署或进行线上检查。
- 线上进程是否成功、免费实例内存是否足够、图片优化是否正常，需在实际部署后验证。已在部署说明定义真实 HTTPS 首页、响应式和键盘、控制台、图片、健康接口及部署 SHA 的验收标准。
- 当前生产服务仍由 PM 保留在 `http://127.0.0.1:3000/`，未被本步骤启停。部署准备到此结束，等待用户确认候选方案及公开范围。

## 2026-09-29 首页接入及最终本地复核

### 实现与检查

- 初始化任务修改 `src/app/page.tsx`、`src/app/globals.css`，新增 `public/images/coast-concept.png`；图片复用原设计素材，由 `next/image` 静态导入并按响应式尺寸加载。首页保持 Server Component，只提供原生同页锚点，无新增业务模块或依赖。
- 顶部保留完整演示声明；明确活动和预约尚不可用；保留虚构运营商说明及 `AI-generated concept image`。箭头采用内联 SVG，避免字体将其显示为彩色 emoji。
- 同步 `README.md`、`docs/deployment.md` 和 `docs/m0-learning.md` 的首页说明、启动方法及过期 Git／CI 状态。
- PM 已阅读初始化任务的实际 `npm run check` 输出：退出码 **0**；lint 无 warning，typecheck 成功，Vitest **1 个文件、2/2 测试通过**（256ms），生产构建成功。生成 `/`、框架自带的 `/_not-found`、`/icon.svg` 和动态 `/api/health`。
- 构建 ID：`V3E_viY-z1fDLVKXoN0Vk`。初始化任务保留生产服务 `http://127.0.0.1:3000/`，仅监听本机；交付时 PID `23311`、启动会话 `82307`，启动日志 `Ready in 78ms`。这些进程信息只代表本次验收时刻，重启后可能变化。
- `git diff --check` 最初发现 CSS 末尾空白；初始化任务清除后，PM 对全部当前差异复验，退出码 **0**。构建后唯一的应用文件调整是末尾空白，没有为此重复构建。

### PM 独立浏览器及 HTTP 验收

- PM 使用独立 Playwright 会话 `localtrip-m0-closeout` 打开实际生产首页，并逐张查看桌面 **1440×1000**、手机 **390×844**、窄屏 **320×720** 的完整截图；主要层级、留白、图片裁切及声明与本地静态稿一致，无阻塞性显示问题。
- 视口／内容宽度分别为 **1440/1425、390/375、320/305**，没有横向溢出。三个宽度下图片均已成功加载；实际来源是 Next.js 图片优化端点。初始化任务另核实优化响应为 WebP。
- 全页只有一个 h1。链接点击区域实测至少 44px 高。键盘 Tab 显示 Skip to content，焦点为 3px `#A24823` 实线；Enter 后焦点进入 `main-content`，下一次 Tab 到 Meet LocalTrip，Enter 后焦点进入 `about`。
- PM 另点击 About LocalTrip 和品牌链接，分别到达 `#about` 和 `#top`；返回顶部后 `scrollY` 为 0。Meet LocalTrip 可通过其可访问名称找到。
- 浏览器控制台 **0 errors / 0 warnings**。PM 实际请求首页与 `/api/health` 均为 **HTTP 200**；健康响应为 `{"data":{"status":"ok"}}`，含 `Cache-Control: no-store`。
- 截图在 `output/playwright/m0-acceptance/`：`m0-coast-desktop-1440.png`、`m0-coast-mobile-390.png`、`m0-coast-mobile-320.png`、`m0-coast-skip-focus.png`。这些本地验收产物由 Git 忽略。

### 同日生产服务重启

- 用户再次构建成功后，执行 `npm run start -- --hostname 127.0.0.1` 遇到 `EADDRINUSE`。PM 核实占用 3000 端口的 PID `23311` 工作目录为本项目，确为此前验收保留的生产服务；本次失败原因是重复监听端口。
- PM 停止该旧进程，执行同一启动命令成功（`Ready in 122ms`）。当前构建 ID 为 `U9SkLNvc2GHpWy5SqHvxZ`，交付时新 PID `25512`、PM 启动会话 `83492`，仍只监听 `127.0.0.1:3000`。当前可直接访问，无需再次执行 start。
- 重启后 PM 重新打开首页并查看 `m0-coast-restart.png`，图片及页面正常，控制台 0 errors / 0 warnings；首页和健康接口均 HTTP 200，健康响应和 no-store 不变。本次未修改应用源码，未重复 lint、typecheck、unit 或 build；构建成功依据用户本次完整输出和实际产物。
- 后续需要重新构建时，先停止当前生产服务；同一地址和端口只能由一个服务监听。用户自己启动的前台服务可在对应终端按 Ctrl+C 停止。

### 未运行项与工具限制

- 本轮 **未运行 `npm ci`**，依赖和锁文件未变，沿用现有安装；PM 没有重复执行初始化任务已通过的四项检查。本次新首页验收使用生产模式，未另跑开发模式；此前开发服务记录见下方历史。
- 未做真实手机、Safari、读屏器或完整无障碍审计；两项健康函数单元测试不覆盖尚未实现的数据库、登录和预约业务。
- PM 最初通过包装脚本启动浏览器工具时，npm 查询因网络限制失败；离线查询也未命中缓存，随后直接使用已安装的 CLI。浏览器缓存写入及本机 HTTP 请求最初受沙箱限制，获准执行后成功。工具环境失败未计为应用通过，也未靠隐藏警告处理。
- 首页接入交付时尚未提交、推送或公开部署；用户随后完成推送，远程 CI 通过情况见上方最新记录。公开测试地址仍待用户单独确认部署。

## 2026-09-24 初次执行与结果（历史记录）

| 项目／命令 | 结果及界限 |
| --- | --- |
| 目录、已有文件检查 | 完成；开始时仅两份源文档和 `.DS_Store` |
| 初始 `git status` 等 Git 检查 | 报错：当时不是 Git 仓库；随后 `git init -b main` 成功 |
| `node --version` | v24.11.1 |
| `npm --version` | 11.7.0 |
| `corepack --version` | 0.34.2 |
| `pnpm --version` | 11.19.0；本项目选择 npm，不混用锁文件 |
| npm registry 版本／peerDependencies 核对 | 已执行，见下方兼容性记录 |
| `npm install` | 成功：新增 393 包，审计 394 包，报告 0 vulnerabilities；出现 ESLint 版本已停止支持的警告，尚待处理 |
| Playwright CLI 环境准备 | 最初直接执行脚本权限失败；改用 `bash` 后成功。本次已实际打开本地页面、操作键盘和链接并检查截图 |
| `npm ci` | **本地未运行**；使用已有且与锁文件一致的安装。本次未改依赖或锁文件 |
| `npm run lint` | 诊断阶段复现退出码 1：0 errors、12 warnings；本次最小修复后退出码 **0**，无 error 或 warning，仍使用 `eslint . --max-warnings=0` |
| `npm run typecheck` | 用户最新执行正常结束，无类型错误；PM 核实已保存的 `include` 含 `**/*.mts`，TypeScript 解析的文件列表包含 `vitest.config.mts`，配置解析错误为 0。此前遗漏新配置文件的覆盖问题已解决；PM 未重复运行完整类型检查 |
| `npm run test:unit` | 用户最新实际执行输出：Vitest 5.0.1，**1 个测试文件通过、2/2 项测试通过**，耗时 104ms。配置改名后 Vite warning 已消失 |
| `npm run build` | 用户执行后提供构建结尾；PM 确认 `.next/BUILD_ID` 存在，ID 为 `cF_c0CEV8Cl3HqQmk6-25`，且该产物已成功启动并响应。PM 未重新运行构建，不冒称已审阅完整构建日志 |
| 开发服务／生产启动 | 开发服务此前已验收。首次生产启动因缺少构建产物而失败；用户随后完成构建并执行 `npm run start`，在 `localhost:3000` 成功启动，PM 已独立访问验证 |
| 首页和 `/api/health` 的 HTTP 检查 | 本次实际执行 curl：`/` 返回 **200**；`/api/health` 返回 **200**、`{"data":{"status":"ok"}}`，响应含 `Cache-Control: no-store` |
| PM 浏览器验收 | 已检查桌面 1440×1000、窄屏 390×844 和 320×720；布局可读、无横向溢出。Skip to content 键盘聚焦可见、Enter 后焦点进入 main；Meet LocalTrip 正确定位 #about；所检查页面控制台 **0 errors / 0 warnings** |
| GitHub Actions | 已核实 `ae22794` 的[首次运行](https://github.com/louie53/LTrip/actions/runs/35978397962)：安装成功、Lint 失败，Typecheck／Unit tests／Production build 跳过。本次修复未推送，**尚无修复后的远程验证结果** |
| 公开部署 | **未进行**，须用户明确确认 |
| PostgreSQL 集成测试、业务 E2E | **未实现／未运行**，不属于当前准备步骤 |

## 本次最小 lint 修复

- `postcss.config.mjs`：将配置对象赋给 `const config`，再 `export default config`，满足 `import/no-anonymous-default-export`；插件配置内容不变。
- `eslint.config.mjs`：添加带用途注释的精确路径 `docs/design/figma/helpers.js`。它是 Figma 执行片段，部分符号供其他设计片段使用，不参与网站构建；没有排除整个设计目录，没有关闭规则或放宽 `--max-warnings=0`。
- `helpers.js` 已存在于提交 `ae22794` 中。本轮保留设计对话已有的 `STATUS.md`、`design-notes.md` 改动及未跟踪的 `HANDOFF.md`，未编辑设计文件或应用源码。
- 实际执行 `npm run lint`，结果通过；未运行 `npm ci`、typecheck、unit、build、dev/start、HTTP 或浏览器验收。此次配置修复不代表 M0 或页面已验收。

## 本次 PM 基础页面验收

- 访问的是用户运行中的 Next.js 开发服务，不是设计目录下的静态 HTML 预览。没有重启或关闭用户的服务。
- 使用 Playwright CLI `open`、`resize`、`press Tab`、`press Enter`、`click`、`eval`、`console warning` 和 `screenshot --full-page`。PM 逐张查看桌面和两种窄屏截图。
- 检查了英文标题、单一 h1、虚构运营商说明、未开放预约提示和完整演示声明；未发现当前最小页的阻塞性显示问题。
- 页面宽度测量分别为 1440/1425、390/375、320/305（视口宽度／文档内容宽度），没有横向溢出。
- 最初尝试通过 CLI `run-code` 保存手机截图时出现工具语法错误；改用 CLI 原生 `screenshot --full-page --filename` 后成功。该错误不是页面运行错误。
- 截图位于 `output/playwright/m0-acceptance/desktop-1440.png`、`mobile-390.png`、`mobile-320.png`；目录由 Git 忽略，属于本地验收产物。
- 这是桌面浏览器中的响应式宽度检查，未做真实手机或 Safari 验收。此段记录的是开发模式的首次验收；后续生产验收见下一节，完整可访问性审计未进行。
- 本次只更新本进度文档，未修改页面、配置、依赖，也未提交或推送。

## 生产构建及启动复核

- 用户最初直接执行 `next start`，因缺少生产构建而失败；随后尝试启动第二个开发服务，也因同一项目已有开发进程而退出。两次失败均不记为启动通过。
- 用户随后提供构建输出末尾及 `npm run start` 成功日志。PM 核实 `.next/BUILD_ID` 和实际服务，不仅依据 `Ready` 字样判断。
- 实际访问 `http://localhost:3000/`：HTTP 200；`/api/health`：HTTP 200、`{"data":{"status":"ok"}}`、`Cache-Control: no-store`。
- 使用 Playwright 重新导航到当前生产服务，查看桌面和 390px 窄屏截图；页面、样式和声明正常，窄屏内容宽度 375px，小于 390px 视口。页面中没有 Next.js 开发工具浮层，浏览器控制台 0 errors / 0 warnings。
- 本地截图：`output/playwright/m0-acceptance/production-desktop.png` 和 `production-mobile.png`，由 Git 忽略。
- 本次只记录用户已执行的构建／启动和 PM 实际浏览器／HTTP 复核。未执行独立 `npm run typecheck` 或 `npm run test:unit`，也未提交、推送或公开部署。

## 类型检查与单元测试结果复核

- 用户执行 `npm run typecheck`：输出 `Types generated successfully`，随后正常回到终端提示符，没有 TypeScript 错误。
- 用户执行 `npm run test:unit`：`tests/unit/health.test.ts` 的公开健康响应合同、禁止缓存两项测试均通过；报告 1 passed file、2 passed tests，总耗时 108ms。
- 测试启动时 Vite 提示：`vitest.config.ts` 使用 ESM 语法，但被作为 CommonJS 文件加载；未来默认的 native config loader 不支持该组合。这是配置加载的兼容性 warning，本次测试仍成功。
- 用户随后将配置改名为 `vitest.config.mts`，内容未变；重新运行 lint、typecheck、unit 后未再出现 Vite warning，2/2 测试通过。没有以隐藏警告的方式处理。
- PM 首次使用 TypeScript 的 `readConfigFile` 和 `parseJsonConfigFileContent` 读取文件列表时，发现改名后的 `vitest.config.mts` 未被纳入类型检查，要求补上范围后复验。
- 用户随后在 `include` 中加入 `**/*.mts` 并保存，再次提供 `npm run typecheck` 正常结束的输出。PM 重新读取磁盘配置和 TypeScript 文件列表，确认 `vitestConfigIncluded: true`、配置解析错误为空，覆盖问题已解决。当前还显式列出 `vitest.config.mts`，与通配项重复但不影响检查，无需为此再修改。
- 本次 PM 只记录用户输出和范围核对结果，没有修改配置、测试断言或依赖。
- 这两项测试直接调用健康接口函数，不覆盖数据库、身份权限、预约事务或完整浏览器流程。那些功能尚未实现，不能据此宣称已通过业务测试。

## 版本与待解决事项

当前锁定：Next.js 16.3.6、React／React DOM 19.3.0、Tailwind 4.3.3、TypeScript 6.0.3、Vitest 5.0.1、Vite 8.3.0、ESLint 9.39.5、eslint-config-next 16.3.6。

- npm registry 的 TypeScript latest 是 7.0.2；当前 typescript-eslint 声明支持 `>=4.8.4 <6.1.0`，故草稿暂选 6.0.3，不能绕过校验来强行升级。
- npm 安装报告 ESLint 9.39.5 已不再支持。这不是本次 lint 失败的原因；当前 React、jsx-a11y、import 插件的兼容声明不接受 ESLint 10，后续需单独评估整套升级，本次不改依赖。
- 本地 lint、独立类型检查、两项单元测试、生产构建及启动均已有执行证据；Vite 配置格式 warning 已消失，`.mts` 的 TypeScript 检查范围已补上并复验。检查通过的范围限定在当前最小项目。
- 原 M0 计划包含测试地址；用户最新决定暂不上线。按调整范围完成本地验收及部署准备，线上项明确暂缓，未来另行授权。
- M0 无需任何密钥。以后需要配置时放根目录 `.env.local`，不要求在聊天中提供密钥。

## 下一个小步骤（用户保存 M0 收尾）

1. 用户在 `/Users/louieliu/Desktop/LTrip` 检查 Git 差异，提交本次六份文档：AGENTS.md、README.md、docs/PROGRESS.md、docs/roadmap.md、docs/deployment.md、docs/aws-deployment.md；再自行推送。不要将其他不明改动一并暂存。
2. 成功标志是提交与推送成功，`git status --short --branch` 中本次文档不再显示未提交，当前分支无 ahead；把提交／推送末尾和状态反馈 PM。PM 可据新提交只读核对远程 CI，不把旧 CI 结果套用于新 SHA。
3. 保存完成后，由用户明确确认是否开始 M1 第一个小步骤：最小数据模型与数据流说明。仍使用「LocalTrip｜项目初始化」负责实现细节，由 PM 审阅；先出可理解的设计和验收标准，不一次生成全部认证、数据库和预约系统。
4. 本步无需 AWS 操作，也无需重新启动应用。最近保留的本地服务为 PM 的 `http://127.0.0.1:3000/`，本步骤未重验进程状态。若已停止，可按 README 的本地启动指引重新运行。
5. ESLint 已停止维护的兼容性事项保留为后续独立评估。本次停在 M0 收尾，不自动进入 M1。

本记录刻意区分“已写入”“已运行”和“已验收”。后续每次仅用实际执行结果更新。
