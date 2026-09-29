# M0：AWS 部署可行性与方案准备

核查日期：**2026-09-29（Pacific/Auckland）**。**用户最新决定：保持 Free plan，项目目前不需要上线；以后有需求再提出。** 两个费用预算及四条邮箱告警已经创建并保留，全部学习资源保持原状。**Paid 升级、Lightsail 创建、域名注册和公开部署均已搁置，原升级按钮交接已撤回，不是待用户补做的任务。** 控制台再次确认账户仍为 Free，未发生升级。未安装云工具，未提交或推送，未启停本地服务。

此前讨论过 **Sydney Lightsail 2 GB Linux 主机＋静态 IPv4＋免费 DuckDNS 子域名＋Caddy＋原生 Node.js**，用于 2026-11-01 后持续展示。该需求已被用户最新决定取代。**第 2–12 节的主机、价格、运行及部署顺序仅保留为历史方案／未来参考，不构成当前待办或执行授权；第 13 节记录实际结果与收尾决定。** N. Virginia 的学习实例、磁盘、快照和 EIP 全部保留；保持 Free 不代表这些资源可无限期访问。

**重要修正：**用户随后授权查看已登录的 AWS 控制台。本次实际页面显示 **Free account plan**，不能沿用“普通付费账户＋学校 promotional credits”的计费假设。普通 AWS 账户不等于 Paid plan。已知免费计划结束日为 **2026-11-01**，两笔 Free Tier credits 的到期日为 **2027-05-01**；这两个日期不同。本文件记录方案所需状态，不保存账户 ID、Credit ID、邮箱、账单截图、资源 ID 或 IP 地址，仅记录用途名称与配置。

## 1. 项目事实与本步边界

以下项目事实来自仓库及 PM 的既有验收记录，不是本轮重新执行的应用测试：

| 项目 | 已知状态 |
| --- | --- |
| 候选版本 | `main`，`cff7e4dc7ef1d21e3148f0ff2eb37b6673bf639e` |
| 运行方式 | Next.js `16.3.6` App Router，React `19.3.0`；Node `24.11.1`、npm `11.7.0` |
| 命令 | `npm run build` → `next build`；`npm run start` → `next start` |
| 动态能力 | `/api/health` 返回 HTTP 200、`{"data":{"status":"ok"}}`、`Cache-Control: no-store` |
| 图片 | 首页使用 `next/image`；锁文件包含 `sharp` 及 Linux 可选包 |
| 数据与秘密 | 无数据库、认证或业务预订；M0 无外部服务密钥 |
| 既有验证 | PM 已记录本地生产页面验收，以及该 SHA 的 [GitHub CI 成功结果](https://github.com/louie53/LTrip/actions/runs/36522712121)；详情见 [PROGRESS.md](./PROGRESS.md) |
| 本地服务 | `http://127.0.0.1:3000/`，由 PM 保留；本对话没有操作该进程 |
| AWS 账户 | 实际控制台显示 Free account plan；两笔有效额度名称为 AWS Free Tier 和 Explore AWS: Launch an instance using EC2。未看到独立学校／活动 promotional credit 的证据 |

保留一个 Next.js 项目和服务端运行时，不改成静态导出、不降级框架、不提前 Docker 化。当前没有云端上线需求；AWS 与 Render 方案都仅作参考，不启动任何部署。

本步唯一写入文件为 `docs/aws-deployment.md`。PM 负责同步 AGENTS、PROGRESS 和总部署说明；保留 README 等已有未提交改动。第二小步只读取 Instances、实例配置／Storage、Volumes、Snapshots 和 Elastic IPs；第三小步核对官方资料并准备方案，未重新操作账户控制台。未登录主机读取文件，也未启动、停止、覆盖或删除资源。未开始 M1，也不引入数据库、负载均衡器、NAT Gateway、Kubernetes、微服务或业务模块。

## 2. 既有路线比较（当前不实施）

| 路线 | 适配判断 | 取舍与本次决定 |
| --- | --- | --- |
| EC2 单台 Linux + Node | 可原生运行；独立新建候选为 Sydney `t3.small`、20 GiB gp3、一个公网 IPv4 | 保留为希望直接学习 EC2／VPC／安全组／EBS 时的备选，分项价格见第 3 节。学习资源全部保留，不复用其实例、磁盘或地址 |
| Lightsail 单台 Linux + Node | 可自行安装锁定 Node/npm。此前账户可打开 Sydney 创建表单，显示 $12 的 2 GB 套餐且未出现升级拦截；**未提交创建，不代表服务端创建权限已验证** | 曾选作长期展示方案，现已搁置。当前计费 FAQ 说明新客户旧试用已由 Free Tier credits 替代，本方案不扣除额外三个月试用；用户决定保持 Free，不升级 Paid |
| Amplify Hosting | 官方页面目前列出的 SSR 支持范围是 Next.js **12–15** | 不能声称项目的 Next.js 16 已正式受支持；不为适配平台擅自降级，本轮不选 |
| Render Node Web Service | 原方案已整理于 [deployment.md](./deployment.md) | 若 AWS 额度／域名／运维条件不合适，回到此备选；不在本步创建服务 |

依据：[EC2 与 Lightsail 的 Free plan 比较](https://aws.amazon.com/free/compute/lightsail-vs-ec2/)、[Lightsail 当前计费 FAQ](https://docs.aws.amazon.com/lightsail/latest/userguide/amazon-lightsail-frequently-asked-questions-faq-billing-and-account-management.html)、[Next.js 自托管说明](https://nextjs.org/docs/app/guides/self-hosting)、[Amplify 官方支持范围](https://docs.aws.amazon.com/amplify/latest/userguide/ssr-amplify-support.html)。虚拟机支持安装 Node 不等于本项目的云端构建、图片处理或性能已经通过。

推荐 Sydney（`ap-southeast-2`）是考虑新西兰访问者的地理位置，**并非实测最低延迟结论**。Lightsail 官方可用区域包含 Sydney，当前列表没有 New Zealand。[AWS 区域列表](https://docs.aws.amazon.com/lightsail/latest/userguide/understanding-regions-and-availability-zones-in-amazon-lightsail.html)

## 3. 两条单机路线的费用组成

所有服务标价为 **USD、credits 抵扣前**，用于比较资源消耗；**不等于当前 Free plan 的信用卡应付金额**。当前计划的免费保护与到期停止规则见第 6 节。若以后批准升级 Paid plan，超出 credits 或不适用的服务才需按该计划规则承担费用；不默认试用、汇率或额外抵扣。

### EC2 备选：分项核算

候选边界为一台独立 Linux On-Demand `t3.small`、20 GiB gp3、一个新的公网 IPv4；采用同机反向代理，不加 NAT Gateway、负载均衡器或收费网络端点。若以后选择 EC2，先只读检查 Sydney 默认 VPC／公有子网，再确定项目专用安全组；不更改 N. Virginia 学习网络。本步不创建或修改网络。

第三步已从 AWS 官方公开 Price List 补齐第一步未取得的地区单价。版本为 `20260925174521`，发布于 2026-09-25，相关行生效日 2026-09-01；筛选为 Linux、Shared、OnDemand、无预装收费软件、`CapacityStatus=Used`，不是预留实例或闲置容量预留价格。按 730 小时估算：

| 基础费用 | Sydney `ap-southeast-2` | N. Virginia `us-east-1`（对照） |
| --- | ---: | ---: |
| `t3.small` 计算 | `$0.0264/小时 × 730 = $19.272` | `$0.0208/小时 × 730 = $15.184` |
| 20 GiB gp3，基础性能 | `$0.096/GB-Mo × 20 = $1.92` | `$0.08/GB-Mo × 20 = $1.60` |
| 1 个公网 IPv4 | `$0.005/小时 × 730 = $3.65` | `$3.65` |
| **合计** | **$24.842，约 $24.84/月** | **$20.434，约 $20.43/月** |

官方固定版本价目：[Sydney CSV](https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonEC2/20260925174521/ap-southeast-2/index.csv)、[N. Virginia CSV](https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonEC2/20260925174521/us-east-1/index.csv)。gp3 采用包含的 3,000 IOPS／125 MiB/s，不额外配置性能；CSV 存储计价单位原文为 `GB-Mo`。公网 IPv4 在用和空闲均收费。[EBS 定价](https://aws.amazon.com/ebs/pricing/)、[公网 IPv4 定价](https://aws.amazon.com/vpc/pricing/)

以上未含税、互联网出站超额、快照或额外日志；也未把账户级免费用量重复扣除。若选 EC2，建议显式使用 **Standard** CPU credit 模式以避免 surplus 附加费，接受积分不足时降至基线、初次构建可能较慢的取舍。默认 Unlimited 模式下 Linux CPU surplus 可另收 `$0.05/vCPU-hour`，所以基础月费不是总费用上限。CPU credit 与账户赠送额度是不同概念，实际构建／响应性能仍须验证。[Standard 模式](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/burstable-performance-instances-standard-mode.html)、[EC2 On-Demand 费用说明](https://aws.amazon.com/ec2/pricing/on-demand/)

### Lightsail 推荐：套餐费用

| 项目 | 官方事实／本方案估计 | 边界 |
| --- | --- | --- |
| Lightsail Linux，带公网 IPv4 的 2 GB 套餐 | 当前标价 **$12/月**，2 vCPU、60 GB SSD；按小时计费，单个套餐有月度价格上限 | 这是建议的起始规格，不是 Next.js 的官方最低内存要求，也不保证构建不会内存不足 |
| 套餐流量 | 通用额度 3 TB；Sydney 为一半，即 **1.5 TB/月** | 入站和出站均消耗额度，超额出站才产生流量超额费；包含图片流量。套餐价格不是全部账单的封顶 |
| 静态 IPv4 | 附着到实例时无额外费用 | 未附着超过一小时的静态 IP 按 **$0.005/小时**收费；不能套用 EC2 的 IPv4 加价规则重复计算 |
| 系统盘／日志／图片缓存 | 首轮使用套餐内系统盘 | 不额外申请磁盘；限制日志占用，定期查看剩余空间 |
| 实例／磁盘快照 | 如另行启用，当前 **$0.05/GB/月** | 本轮不启用自动快照；同机的旧发布目录不等于灾难恢复备份 |
| 域名／DNS | 用户没有自己的域名；本轮默认建议 DuckDNS 免费子域名，备选独立 `.com` | 第 11 节说明依赖与费用；未注册名字或购买域名，不新增 Route 53 托管区 |
| HTTPS | 候选为同机 Caddy + 公共 ACME 证书 | 不增加 AWS 负载均衡器／CDN；域名、端口和证书自动续期仍须实测 |
| 预算通知 | AWS Budgets 基础监控与通知免费 | 两个普通邮件预算已获批并创建，结果见第 13 节。定期 Budgets Reports 和 action-enabled budgets 有不同计价，首轮无需引入 |

价格与限制依据：[Lightsail 定价](https://aws.amazon.com/lightsail/pricing/)、[Lightsail 计费 FAQ](https://aws.amazon.com/lightsail/faq/)、[AWS Budgets 定价](https://aws.amazon.com/aws-cost-management/aws-budgets/pricing/)。创建前再次核对实际区域、套餐和价格；本文件不是报价锁定。

**估计：**若一个月只保留这一台 $12 实例、静态 IP 始终附着、流量未超额、不加快照／磁盘，则新增主机基础资源消耗约 **$12/月，税费另核**。采用第 11 节免费子域名方案时域名和证书费为零；若选择独立域名则另外支付注册／续费。流量超额和账户既有资源也不在这 $12 内。credits 抵扣与 Free plan 保护需分开理解，不能把资源消耗写成零。

如果首次构建内存不足，先记录内存／磁盘／构建日志，再提出单独的小步骤评估 Linux 构建产物交付或更大实例。不自动升级到付费更高的规格，不在未经测量时承诺 512 MB／1 GB 足够。2 GB 也需要实测；构建时与现有服务争用内存可能使页面短暂不可用。

## 4. HTTPS、运行与网络方案（尚未配置）

两条虚拟机路线共用此运行方案：一台 Ubuntu LTS 的 OS-only 实例，EC2 优先 x86_64，具体镜像留到获批后的创建表单核对。安装项目锁定的 Node/npm；不依赖应用蓝图中预装的 Node 版本。Caddy 接收公网 HTTP／HTTPS，把请求转给同机 `127.0.0.1:3000` 的 Next.js。

| 方面 | 待执行方案与验收要求 |
| --- | --- |
| 可信 HTTPS | 用户控制的域名／子域名 A 记录指向静态 IPv4；只在 IPv6 也配置并验证后添加 AAAA。Caddy 申请并续期公共证书、将 HTTP 转到 HTTPS。证书存储目录须持久可写；验证证书链和续期配置 |
| 域名缺口 | 用户没有自己的域名；第 11 节提出 DuckDNS 免费子域名，由用户选定并取得控制权后指向新主机。名字可用性、解析、证书签发及续期均未验证；不能以忽略证书警告完成验收 |
| 公网入口 | 仅公开 TCP 80、443；80 用于证书验证与 HTTPS 重定向。端口 3000 只监听回环地址，不设公网规则 |
| 管理入口 | EC2 安全组的 SSH 22 限制为用户当前管理来源；Lightsail 需核对浏览器 SSH 的必要来源。先确保受限连接可用，再关闭宽泛默认规则；不公开密码登录，不把私钥写入仓库或聊天 |
| IPv4／IPv6 | EC2 检查安全组的两种地址规则；Lightsail 则分别检查两套防火墙。不能只限制 IPv4 后留下 IPv6 的全网 SSH；不为 M0 新增无用的 VPC 或网络服务 |
| 进程运行 | 以非 root 的 `ltrip` 系统用户运行一个 Next.js 服务；由 systemd 开机启动、失败后有退避地重启，并设重启频率限制。不依赖 SSH 终端、`npm run dev` 或手工后台进程 |
| 环境与写权限 | 启动环境设 `NODE_ENV=production`、`NEXT_TELEMETRY_DISABLED=1`，使用固定 Node 路径；允许必要的 `.next/cache` 写入。M0 不放业务密钥，也不需要把 AWS Access Key 放进应用 |
| 日志与维护 | Next.js 标准输出／错误及 Caddy 错误交给 journald，设保留时间和容量上限；首轮建议 7 天／100 MiB，待实测调整。访问日志若启用需轮换，不记录敏感内容；安排系统安全更新及必要重启 |
| 健康 | 外部 HTTPS `/api/health` 与服务器回环请求都须验证。systemd 的进程重启不是 HTTP 健康监控；本轮不宣称已有外部告警或自动修复 |

Next.js 官方建议自托管时使用反向代理，`next start` 支持 `next/image`；Caddy 官方说明了域名 DNS、80／443 和持久证书目录的条件；Lightsail 官方说明 IPv4／IPv6 防火墙彼此独立。[Next.js 自托管](https://nextjs.org/docs/app/guides/self-hosting)、[Caddy 自动 HTTPS](https://caddyserver.com/docs/automatic-https)、[Lightsail 防火墙](https://docs.aws.amazon.com/lightsail/latest/userguide/understanding-firewall-and-port-mappings-in-amazon-lightsail.html)

这里 Next.js 监听 `127.0.0.1` 是因为 Caddy 就在同机；Render 方案要求 `0.0.0.0` 是另一种平台代理接入方式。不要混用两份说明。

这是接受短暂停机风险的单机演示方案，不承诺高可用。主机故障、系统升级或发布重启都可能中断演示；M0 不为规避这一取舍增加多台实例。

## 5. 可重复发布、回退与清理（尚未执行）

### 发布与回退

1. 发布前确认完整 SHA 和该 SHA 的 CI。本次候选是 `cff7e4dc7ef1d21e3148f0ff2eb37b6673bf639e`；若 `main` 已变化，重新核实，不能直接拉取不明的最新版本。
2. 在服务器的独立发布目录（候选 `/srv/ltrip/releases/<sha>/`）取得批准源码，核对 `node --version`、`npm --version`。公开仓库可只读获取；不为此给服务器 GitHub 写权限。
3. 在该目录执行锁文件安装 `npm ci --include=dev --include=optional`，再执行 `npm run build`。保留 TypeScript／Tailwind 等构建依赖和 Linux 原生可选包；不上传 Mac 的 `node_modules` 或本地 `.next`。这些命令本轮未执行。
4. 构建成功才允许切换 `/srv/ltrip/current` 到新目录并由 systemd 重启；拟采用的应用启动命令为 `npm run start -- --hostname 127.0.0.1 --port 3000`。最终服务单元应固定实际可执行文件路径，另一步审阅后写入。
5. 立即检查进程、日志、本机与公网健康接口、首页及图片。保留上一份成功发布的源码、依赖、构建产物和配置版本；失败则切回上一目录并重启、复验。第一次部署没有上一份成功版本，失败时保留证据并关闭公开入口，不声称已具备成功回退记录。
6. 记录 UTC 部署时间、SHA、Node/npm、实例规格、构建结果和 URL。自动部署保持不配置；Docker、构建产物流水线或 GitHub Actions 发布权限等，等实际需求出现时单独提案。

部署验收还包括一次获批的进程重启／主机重启验证、证书续期配置核对、后续有两个版本时的回退演练。启动日志显示 `Ready` 不能替代这些检查。

### 停用与资源清理

下面的“收费”指资源费用／credits 消耗；当前 Free plan 的免扣款与自动结束机制另按第 6 节适用，不能把它读成已向付款方式扣款。

- **Lightsail Stop 仍会收费。** 删除实例才能结束其后续实例计费；删除是破坏性操作，应先确认需保留的源码、配置和日志。删除后静态 IP 可能仍在账户，须另行释放；保留的快照或额外磁盘也要单独核对。[Lightsail 生命周期与计费 FAQ](https://aws.amazon.com/lightsail/faq/)
- EC2 的停机与 Lightsail 不同：常规 On-Demand 计算可停止计费，但 EBS、保留的 EIP、快照等可能继续收费；终止实例后也检查这些残留。待选定 EC2 时再给逐项操作清单。[EC2 实例生命周期](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-lifecycle.html)
- 清理按本项目名称／标签及实际资源清单确认，不批量删除账户其他资源。移除本项目 DNS 指向前确认没有其他用途；次日及结账后查看 Bills，考虑账单延迟，不因控制台实例消失便宣称费用归零。
- **Free plan 于 2026-11-01 或额度先耗尽时结束**；结束后不能继续访问学习资源，账户内容保留期限见第 6 节。用户当前选择保持 Free，不安排升级。若希望日后保留课程文件／配置，需要在结束前另行处理导出或备份；本步没有读取主机内容、执行备份、自动删除或创建定期维护提醒。费用预算通知见第 13 节。

## 6. Credits 与预算的事实边界

**当前账户的官方规则：**Free account plan 在六个月或 credits 用尽时结束，以先发生者为准。未升级时不收取使用费；计划结束会自动关闭账户并停止资源／数据访问。内容保留 90 天；期间升级 Paid 可恢复访问，未在这 90 天内升级才会永久删除账户及内容。普通手动升级后可继续使用未到期的 Free Tier credits，但 Paid 不能降回 Free。因此当前的停止机制来自 Free plan 生命周期，**不是预算告警，也不是所有赠送 credits 都有的硬上限**。[AWS 账户计划规则](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html)、[Free Tier FAQ](https://aws.amazon.com/free/free-tier-faqs/)

**仅在以后批准 Paid plan 时适用：**credits 只抵扣 eligible services，直至耗尽或到期；超出额度及不适用项目仍由账户承担。通用 promotional credits 条款有域名注册／转移、交易类税费等排除项。当前 Free plan 不接受额外 promotional credits，不能把这次看到的 Free Tier 奖励自动当作学校赠送额度。普通账户、Free/Paid 计划和某一笔 credit 的性质是三个不同信息。[AWS Credits 条款](https://aws.amazon.com/awscredits/)、[账户计划限制](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html)

**官方事实：**AWS Budgets 基础监控／通知免费，但不是硬性停机开关。费用数据每日最多更新三次，通常相隔 8–12 小时；用量入账与通知还有延迟。越过预算阈值后仍可能继续产生用量、消耗 credits；Paid plan 下也可能继续产生应付费用。预算告警不会改变当前 Free plan 的结束规则。Budget actions 是额外配置，本方案不以自动停机保证零超额。[Budgets 更新与告警边界](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html)、[Budgets 定价](https://aws.amazon.com/aws-cost-management/aws-budgets/pricing/)

**已批准并配置的预算：**分别观察抵扣前资源消耗和抵扣后净费用，金额、阈值与实际保存结果见第 13 节。采用实际费用告警；forecast 只能辅助，不依赖新账户的预测数据。没有创建 SNS、自动关机角色或定期收费报告。[AWS Budgets 最佳实践](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-best-practices.html)

## 7. 已完成的账户核对与剩余缺口

用户在第一步进行中提供已登录的控制台并授权“看看”。通过该窗口只读查看了 Console Home、Credits（两笔额度的适用服务列表）、Free Tier、Bills 和 Budgets；另外临时打开 Lightsail 创建表单查看套餐，未选择或提交配置，随后关闭该临时标签页。第一步未创建资源、预算、角色或访问密钥，未点击 Upgrade。以下表格保留第一步观察；预算的后续变更见第 13 节。

| 控制台页面 | 2026-09-29 实际观察 | 对方案的影响 |
| --- | --- | --- |
| Console Home／Free Tier | Free account plan；页面显示余下 34 天，结束日 2026-11-01 | 仅可据此安排短期演示，长期公开地址另需决定迁移或 Paid 升级 |
| Credits | 两笔状态均 Active，名称分别为 AWS Free Tier 和 Explore AWS: Launch an instance using EC2；到期字段均为 05/01/2027（结合 Free Tier 日期规则为 2027-05-01） | 不是 2026-11-01 的免费计划结束日；余额按当前估计字段读取，具体账单数字已在对话中回报 |
| 两笔额度的 Applicable products | 都看到了 Amazon Elastic Compute Cloud、Amazon Lightsail、Amazon Virtual Private Cloud、AWS Data Transfer | 证明这些服务在 credit 清单中；不证明所有服务功能在 Free plan 都开放，也不证明创建权限 |
| Bills → September 2026 | Pending，估计应付为零；EC2/EBS 与 VPC 用量有对应负数抵扣。已有用量包括 gp3 磁盘、快照和 Idle public IPv4，区域为 N. Virginia | 账户已有学习资源消耗额度；这不是本次 LocalTrip 产生的用量。账单是月内累计，不能单凭账单判断资源现在是否还存在 |
| Budgets | 显示首次创建预算的介绍页面，没有已有预算列表 | 尚无已配置预算提醒的证据；本轮未新建 |
| Lightsail | Sydney 创建表单可访问，显示带 IPv4 的 $12／2 GB／60 GB／1.5 TB 套餐；未出现 Upgrade 拦截 | 表单可见不等于提交一定成功或不会触发门槛。当前不以创建资源试探权限 |

Credits 的 `Amount remaining` 反映上个账期，`Estimated amount remaining` 反映当月估计并每日更新；本次页面也提示估计值约每 24 小时更新。不能把它写成实时余额。[Credits 字段说明](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/useconsolidatedbilling-credits.html)

用户以后可在 [Billing and Cost Management](https://console.aws.amazon.com/costmanagement/) 的 **Credits／Bills／Budgets** 复查同一组信息，无需再次提供账户类型或本轮已读到的数据。[查看账单](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/getting-viewing-bill.html)、[查看预算](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-view.html)

### 第二小步：现有学习资源只读盘点

用户已授权继续盘点，并确认**没有自己的域名、希望 2026-11-01 后继续展示**。以下为 2026-09-29 控制台当时的状态，范围仅限 **N. Virginia（`us-east-1`）**，不是整个账户所有区域／服务的资产清单。所有实例和卷列表均无搜索过滤；快照范围为 `Owned by me`。

| 资源 | 数量／状态 | 已核对的配置和关联 |
| --- | --- | --- |
| EC2 `learning-web-server` | 1 台，`Stopped`；运行中 0 台 | `t3.micro`，`us-east-1a`，Amazon Linux 2023 x86_64 镜像，CPU credit 模式 `unlimited`；停止原因显示用户发起。不是前述 Ubuntu 新建候选的已部署版本 |
| EBS 系统卷（未命名） | 1 块，8 GiB gp3，`In-use` | 附着上述实例的 `/dev/xvda`，未加密；`Delete on termination = Yes` |
| EBS `learning-restored-volume` | 1 块，1 GiB gp3，`In-use` | 附着同一实例的 `/dev/sdf`，已加密；源快照与 `learning-data-snapshot` 匹配；`Delete on termination = No` |
| EBS `learning-data-volume` | 1 块，1 GiB gp3，`Available` | 当前没有附着资源，已加密；名称与学习备份描述关联，盘内内容未读取 |
| EBS 快照 | 3 个，均为 `Standard`、`Completed`、100% | 一个是 `learning-data-snapshot`；另两个描述分别为创建 AMI 产生的快照、`DemoSnapshot`。详情见下文 |
| Elastic IP `learning-eip` | 1 个，仍有关联 | 关联上述停止的实例及其私有地址；并非当前未关联的地址。保留地址仍会消耗额度 |

磁盘合计 **10 GiB**，三块均显示 3,000 IOPS、125 MiB/s。两个 `In-use` 只说明仍附着实例，不表示实例正在运行。`Available` 也不等于盘内没有数据。若以后终止该实例，当前设置会删除其系统盘，而附加数据卷不会随实例自动删除；本轮没有执行任何此类动作。

三个快照的 `Volume size / Full snapshot size` 分别为：创建 AMI 的快照 **8 GiB / 1.66 GiB**；学习数据快照 **1 GiB / 68.5 MiB**；`DemoSnapshot` **2 GiB / 0 B**。这些字段不能直接相加充当按月计费的快照存储量。学习快照描述为数据卷挂载测试后的备份；AMI 快照的当前镜像依赖、各快照是否仍用于课程，以及恢复结果均未验证，不能依据大小或完成状态认定可删除。

本轮纠正了账单与实时状态之间的一个容易混淆点：九月账单中的 `Idle public IPv4` **不能解读为当前 EIP 未关联**；实时列表表明它仍关联停止的实例。AWS 对在用和空闲公网 IPv4 都按每地址 `$0.005/小时`计价，保留一个地址按 730 小时估计消耗 **$3.65/月**，另有磁盘／快照等费用。这是额度抵扣前的资源消耗估计，不是当前 Free plan 的应付金额。[公网 IPv4 定价](https://aws.amazon.com/vpc/pricing/)

**已确认决定：**用户在第三步开始前明确要求全部保留学习资源。上述实例、磁盘、快照、EIP 均保持现状；旧方案拟使用独立新资源，但当前不部署、不创建。本次盘点不证明其他区域没有资源，也没有读取现有主机或磁盘内容。

**关于长期展示的已核对规则：**普通手动升级 Paid 后，未用完的 credits 可按适用规则继续抵扣到本账户显示的 2027-05-01；若提前耗尽则抵扣结束。保持 Free plan 则仍于 2026-11-01（或额度更早用尽时）结束，不能仅凭剩余额度继续运行。Paid 无法降回 Free，超额／不适用费用需自付。用户已决定当前不升级、不上线；这些规则仅供以后重新评估时参考。[Free Tier FAQ](https://aws.amazon.com/free/free-tier-faqs/)

第二步结束后的确认已收到：“全部保留学习资源，准备独立的长期展示方案”。对应交付见第 11 节；不再重复询问学习资源是否保留。此确认没有授权创建资源或升级账户。

## 8. 未来重新提出部署时的审批与验收参考（当前无待办）

用户当前保持 Free、暂不上线，以下步骤不自动启动；以后由用户重新提出需求，重新核实方案、价格及授权。

完成获批的只读盘点后，由本部署对话提交**确定配置与费用复核**，包含区域、实例规格、镜像、地址／HTTPS、预算提醒及确切操作范围。资源创建、安装／运行服务、DNS／HTTPS 公开发布各按实际范围分步确认；本方案不是一次性放行所有操作。

费用邮件提醒已获批，执行结果见第 13 节。后续仍需分步批准：创建一台实例及静态 IP／必要防火墙；在主机安装 Node/Caddy 并配置 systemd；部署指定 SHA；修改本项目 DNS 并开放 HTTPS；完成重启／回退检查。若域名购买、权限调整或额外收费资源变得必要，先说明具体差异。远程 Git 推送始终由用户处理。

线上发布后必须由 **“LocalTrip｜PM 与整体验收”** 打开真实 HTTPS 网站检查首页、海岸图／图片优化、AI 图片标注、完整演示声明、桌面／手机布局、键盘和控制台；确认外部 `/api/health` 的 200、响应内容与 `no-store`。另从手机网络验证可达性。平台显示运行成功、CI 通过或本机 curl 成功都不能替代 PM 线上视觉验收。

随后由 PM 将真实 URL、SHA、费用方案和实测结果记入 PROGRESS／README；本部署对话按获批写入边界补充运行说明。此后仍保持 M0，未授权 M1。

已只读确认 PM 将 AGENTS、PROGRESS 与 deployment 的账户假设同步为 Free account plan 与 Free Tier credits，并保留两种到期日的区别。第二小步新增的资源盘点、没有域名和长期展示需求记录于本文件，供 PM 后续同步；因写入边界，本对话没有修改这些共享文件，也未主动发送跨对话消息。

## 9. 第一步实际结果（既有记录）

- 已只读检查 Git 状态和候选 SHA，阅读 AGENTS、project-plan、codex_localtrip_start_here、PROGRESS、deployment、package.json，以及 Node 配置／健康接口／测试／锁文件的相关部分。
- 已核对上述 AWS 官方资料和 Next.js／Caddy 官方技术说明，并完成第 7 节的账户只读观察。运行规格及操作顺序均为方案；创建权限、精确 EC2 报价、实际运行效果和 HTTPS 尚未验证。
- 本步只新增本文件，未修改应用、依赖、锁文件、CI 或其他文档。未运行 `npm ci`、lint、typecheck、unit、build，也未重复页面验收：本轮没有应用变更。
- 实际执行 `git diff --check`：退出码 0，无空白错误。新文件未跟踪，另执行 `git diff --no-index --check /dev/null docs/aws-deployment.md`：无空白错误输出，退出码 1 表示存在新增差异。未执行的云端安装、证书签发、重启、回退或清理不计为成功。
- 第一步结束时等待用户确认只读盘点、域名和演示期限；用户随后已回复，第二步结果如下。本地 `http://127.0.0.1:3000/` 仍归 PM 管理，无须启动第二个服务。

## 10. 第二步实际结果（既有记录）

- 已只读核对 N. Virginia 的实例列表、实例 Details／Storage、全部卷、自有快照及 Elastic IPs，获得第 7 节的数量、状态与关联关系；没有资源变更，没有连接实例或读取磁盘文件。
- 已记录用户没有域名、希望 2026-11-01 后继续展示；复核官方 Free Tier FAQ 与 IPv4 定价。Paid 升级、确切月费、地址／HTTPS 方案、资源复用和云端运行仍未批准或验证。
- 本轮仅更新 `docs/aws-deployment.md`，保留 AGENTS、README、PROGRESS、deployment 的其他既有改动；未执行 npm 安装／应用检查，应用代码与依赖未变。
- 本轮实际执行 `git diff --check`：退出码 0，无空白错误。对未跟踪的本文件执行 `git diff --no-index --check /dev/null docs/aws-deployment.md`：无空白错误输出，退出码 1 表示新增差异。临时 EC2 标签页已关闭，原有 Credits 标签页保留。
- 第二步结束时等待学习资源保留需求及下一步方案准备确认；该确认随后已收到。没有创建、清理资源或进入 M1；本地服务继续由 PM 管理。

## 11. 第三步：独立长期展示旧方案（当前搁置）

### 推荐配置与资源边界

此前推荐 **Lightsail Sydney 单机 + 免费 DuckDNS 子域名 + Caddy HTTPS**，以低成本、少量组件、连续展示为优先。它仍是 AWS 上的 Linux 主机，能练习 SSH、进程、日志、网络入口与部署；若以后学习重点是直接管理 EC2／VPC／EBS，可重新评估第 3 节 EC2 方案。当前整个部署方案搁置，不创建任何一套。

| 配置项 | 拟定值 |
| --- | --- |
| 区域／数量 | `ap-southeast-2`（Sydney），单可用区、1 台；不承诺高可用 |
| 实例名称 | `localtrip-m0-web`；名称占用情况留待创建前核对 |
| 镜像 | Linux/Unix → OS only → Ubuntu 24 LTS；确认 x86_64，不选择应用蓝图或 Ubuntu Pro |
| 套餐 | 带公网 IPv4 的 **$12/月、2 GB、2 vCPU、60 GB SSD**；Sydney 流量额度 1.5 TB/月 |
| 固定地址 | 新建 `localtrip-m0-ip`，立即附着新主机；不使用或移动 `learning-eip` |
| 标记 | `Project=LocalTrip`、`Environment=demo`、`Milestone=M0`，用于识别；不假设标签预算已激活 |
| 运行 | 锁定项目的 Node `24.11.1`／npm `11.7.0`，原生 `next start`；Caddy 同机代理，systemd 管理两个服务 |
| 入站 | IPv4 TCP 80/443 为网站入口；22 仅允许用户管理来源及必要的 Lightsail browser SSH。首轮不发布 AAAA，IPv6 入站不得遗留全网 SSH |
| 其他 AWS 组件 | 首轮不新增数据库、额外卷、快照计划、负载均衡器、CDN、NAT、Route 53 托管区或 VPC peering |

Ubuntu 24 是 Lightsail 官方提供的 OS blueprint；创建时仍需核对实际选项及架构。仅新项目的配置会进入后续操作范围，学习资源全部保留。这里的“独立”是独立主机、磁盘、地址和入口，**仍在同一 AWS 账户内，共享额度、账单与账户计划**。[Lightsail 镜像列表](https://docs.aws.amazon.com/lightsail/latest/userguide/compare-options-choose-lightsail-instance-image.html)、[防火墙规则](https://docs.aws.amazon.com/lightsail/latest/userguide/amazon-lightsail-firewall-rules-reference.html)

2 GB 是待验证的起始规格，不是已测得的容量结论。首次 Linux 构建失败或内存不足时，保留日志并停在该步骤；不自动升级到 $24 套餐。发布、回退、日志限额与健康验收沿用第 4–5 节。M0 没有业务数据，首轮依靠 Git 源码及有记录的配置重建；同机旧版本只用于回退，不承担主机损坏后的备份职责。需要数据库或更强恢复能力时另行设计与报价。

### 没有现成域名时的地址选择

**用户已选择免费子域名路线：**由用户持有 DuckDNS 账户，取得一个项目名称子域名，格式为 `https://<所选前缀>.duckdns.org`。前缀未确定，也未查询可用性或注册；不使用真实人名作为前缀。DuckDNS 提供免费子域名到指定 IP 的解析，但不承诺不中断或永久保留，因此它是可接受的低成本作品集起点，不是自己注册并可迁移的独立域名。[DuckDNS 服务说明](https://www.duckdns.org/about.jsp)、[使用条款](https://www.duckdns.org/tac.jsp)

后续获批后，用户在 DuckDNS 页面将新名字指向新 Lightsail 静态 IPv4。固定地址无需 DDNS 定时更新脚本；Caddy 使用默认 HTTP-01／TLS-ALPN 验证，不需要 DuckDNS token 或 DNS 插件。确认 80/443 可达、域名解析正确、Caddy 证书目录持久可写后，由 Caddy 申请并自动续期可信证书。私钥保留在主机，DuckDNS token 留在用户账户内，不进入应用或 Git。[Caddy 自动 HTTPS](https://caddyserver.com/docs/automatic-https)

**自有域名备选：**若要长期印在简历上，可以选择一个非 premium `.com` 并使用注册商 DNS。Porkbun 官方当前注册及续费表均为 **$11.08/年**；公告称 **2026-11-01 04:00 UTC 起预计约 $11.81**，购买和续费前需重新核价。这笔费用由用户向注册商支付，不能使用 AWS credits；税费、汇率和具体名字可用性另核。自有域名可随服务器迁移保留同一网址，但必须持续续费。本步不购买。[域名价格表](https://porkbun.com/products/domains)、[价格调整公告](https://kb.porkbun.com/article/201-why-did-com-prices-go-up-and-how-high-will-they-go)

HTTPS 并非必须购买域名：Let's Encrypt 已支持 IP 证书，但其有效期为 160 小时，需特定 ACME profile 和可靠续期配置。本方案选择常规子域名，避免把裸 IP 和短期证书作为默认长期地址；不能把 Caddy 对 IP 的默认本地证书误当公网可信证书。[Let's Encrypt IP 证书公告](https://letsencrypt.org/2026/01/15/6day-and-ip-general-availability)、[Caddy 默认行为](https://caddyserver.com/docs/automatic-https)

### 持续费用与额度消耗

以下均为 **USD、税前、credits 抵扣前的估算**。保留学习实例停止状态；每月按 730 小时计算旧 EIP，不代表每个自然月都有 730 小时。`S` 表示旧快照当月的实际费用，不能直接由控制台 `Full snapshot size` 相加取得。

| 费用 | Lightsail 推荐 | EC2 Sydney 备选 |
| --- | ---: | ---: |
| LocalTrip 新增基础主机资源 | $12.00/月 | $24.842/月 |
| 保留的学习 EBS：10 GiB × $0.08 | $0.80/月 | $0.80/月 |
| 保留的学习 EIP：730 × $0.005 | $3.65/月 | $3.65/月 |
| 保留的学习快照 | `S`，美东 Standard 单价 $0.05/GB-Mo | 同左 |
| **已盘点资源＋新项目合计** | **$16.45 + S/月** | **$29.292 + S/月** |

Lightsail 新项目基础主机费用全年约 **$144**；连同已盘点学习资源的基础项全年约 **$197.40 + 各月 S 合计**。这不是整个账户费用封顶：其他课程实验、未盘点区域、流量超额、可选快照、税费等另计。Sydney Lightsail 的 1.5 TB 额度由入站与出站共同消耗，超过额度的出站为 `$0.17/GB`；附着静态 IP 不额外收费，闲置超过一小时的静态 IP 另计。停止 Lightsail 主机也继续计费，停用时需另行批准删除本项目资源。[Lightsail 定价](https://aws.amazon.com/lightsail/pricing/)、[流量规则](https://docs.aws.amazon.com/lightsail/latest/userguide/amazon-lightsail-faq-data-transfer-allowance.html)、[计费 FAQ](https://docs.aws.amazon.com/lightsail/latest/userguide/amazon-lightsail-frequently-asked-questions-faq-billing-and-account-management.html)

**仅在普通 Paid 升级后**，抵扣时长可估算为 `当天剩余可用额度 B ÷ 账户每月总消耗`，还受 **2027-05-01 到期日**限制。若保持 Free plan，仍于 2026-11-01 或额度先耗尽时结束。第三步方案准备没有重新读取余额，第四步的 Credits 复核见第 13 节；估计余额并非实时值，也不能把全部额度只除以新主机的 $12。创建前复核 Credits／Bills。Paid 下额度耗尽或到期以后若继续展示，需承担上述实际费用；没有“升级后仍保证不扣款”的安排。

### 账户和预算准备（预算已创建，升级不执行）

旧方案若要在 2026-11-01 后持续使用当前 AWS 账户，需要普通 Paid 升级。升级是**账户级**操作，学习资源同样失去 Free plan 的免费保护；Paid 不能降回 Free。采用正常 Upgrade Plan 路径可保留未到期额度，不通过加入 Organizations／Control Tower 等方式升级。**用户当前明确选择保持 Free，因此不执行这条升级路径。** 服务创建权限也未验证。[Free Tier FAQ](https://aws.amazon.com/free/free-tier-faqs/)

已按以下方案配置两个普通费用预算，均覆盖全账户、所有区域和服务，通知仅发用户明确指定的邮箱；邮箱不写入项目文档：

| 预算 | 拟定规则 | 用途 |
| --- | --- | --- |
| `account-gross-monthly` | Monthly、Recurring、Fixed **$20**；Unblended costs，排除 credits／refunds，包含正常费用及税；Actual 50%／80%／100% | 在额度抵扣掩盖净账单之前看到资源消耗；$20 是告警阈值，不是自付授权或收费上限 |
| `account-net-monthly` | Monthly、Recurring、Fixed **$1**；Unblended costs，包含 Credit 和 Refund，不设服务／区域／费用类型过滤；Actual 100% | 提示开始出现净费用；不保证先收到通知才扣款 |

UI 路径为 **Billing and Cost Management → Budgets → Create budget → Customize (advanced) → Cost budget**。采用普通邮件告警，不加预算动作、SNS 或定期报告。设置时核对成本预览及通知保存结果；收到邮件与预算是否存在要分别验证。当前实际 UI 将费用类型移到 **Filter specific AWS cost dimensions → Charge type → Excludes → Credit、Refund**；这不限制服务／区域。net 预算不排除这两项。用户已明确指定收件邮箱，保存结果见第 13 节。[创建费用预算](https://docs.aws.amazon.com/cost-management/latest/userguide/create-cost-budget.html)、[Credits 计入口径](https://docs.aws.amazon.com/aws-cost-management/latest/APIReference/API_budgets_CostTypes.html)

预算存在入账和通知延迟，不会阻止流量或费用增长。建议用户每月人工查看 Credits／Bills，以及主机磁盘、日志、系统更新与证书续期情况；余额接近一个月预计用量或到期前一个月时，决定继续自付还是迁移／停用。这里是维护建议，本步未创建定期维护提醒或运行监控；费用预算通知见第 13 节。

### 旧方案执行顺序与成功信号（仅供未来重新授权时参考）

| 后续小步骤 | 谁操作／范围 | 成功信号 |
| --- | --- | --- |
| 1. 选择方案 | 用户在「LocalTrip｜AWS 部署」确认 Lightsail／EC2、免费子域名／自有域名、预算候选 | 形成明确的主机、地址和费用决定；此时没有云资源变更 |
| 2. 预算与账户准备 | 获该步批准后设置邮件预算；用户审阅 AWS 升级说明并自行完成普通 Paid 升级 | 预算规则已保存；Account plan 显示 Paid；两笔未到期额度仍可见；无新增主机 |
| 3. 地址与主机准备 | 用户取得所选域名控制权；另行批准创建唯一的新主机和附着静态 IP，收紧管理入口 | 规格、区域、固定地址和访问范围吻合，学习资源原状保留 |
| 4. 安装与发布 | 单独批准 Linux 安装及指定 SHA 的构建；完成 systemd、DNS／HTTPS 公布 | 生产构建成功，HTTPS 可信，外部健康检查和图片可用；失败保留日志，不自动升级 |
| 5. 线上验收 | PM 在真实 HTTPS 网站验收，用户用手机网络访问 | 第 8 节验收通过，URL／SHA／费用与实测结果由 PM 同步共享文档；仍停在 M0 |

此前用户选择“采用 Lightsail＋免费子域名，进入预算与账户准备”，已据此完成两个预算。**用户最新决定保持 Free、暂不上线，故第 2 项中的升级及第 3–5 项全部搁置；无需用户继续完成上述步骤。** 未来有需求时由用户重新提出。

## 12. 第三步实际结果（既有记录）

- 已核对 Git 状态、项目约定和部署记录，确认应用仍处于 M0；只更新本文件，没有改共享文档或应用。
- 已查验 AWS 官方区域价目版本、Lightsail 套餐／流量／镜像／预算规则，以及 DuckDNS、Caddy、Let's Encrypt、域名注册商官方资料；没有调用需凭据的云 API，也没有操作账户控制台。
- 用户要求“全部保留学习资源”已落实为方案边界；独立方案、两种主机的实际基础费用、地址选择、账户升级影响、预算口径及验收顺序均已记录。
- 名字可用性、创建权限、Linux 构建、实际内存／性能、证书签发及续期、公开网址和账户升级均未实测。应用代码未变，未重跑 npm 安装、lint、typecheck、unit 或 build；不沿用既有 CI 结果声称云端成功。
- 实际执行 `git diff --check`：退出码 0，无空白错误；对未跟踪文件执行 `git diff --no-index --check /dev/null docs/aws-deployment.md`：无空白错误输出，退出码 1 表示新增差异。独立只读复核已检查费用计算与新旧方案的一致性。
- 本地 `http://127.0.0.1:3000/` 继续归 PM 管理，本步不启动重复服务。交付后等待用户选择方案，不自动执行下一步。

## 13. 第四步结果：预算已配置，保持 Free，升级与部署搁置

- 已重新读取 Credits 页面，当时两笔额度均显示 Active、到期日 2027-05-01。随后 Free Tier 摘要显示的剩余额度高于此前 Credits 快照；该变化尚未逐笔核对，不把旧估计余额视为实时值。未将账户、额度 ID、邮箱或账单截图写入仓库。
- 用户明确提供费用告警收件地址，授权用于以下四条告警；没有从浏览器资料、邮件内容或账户名推断收件人。
- 已创建并从保存后的详情复核 `account-gross-monthly`：Monthly、Recurring、Fixed USD 20、2026-09-01 开始、无结束日期、Unblended costs；唯一筛选为 Charge type 排除 Credit／Refund，无服务或区域限制。三条 Actual 告警为 50%／80%／100%，即实际费用分别**大于** USD 10／16／20 时触发。
- 已创建并从保存后的详情复核 `account-net-monthly`：Monthly、Recurring、Fixed USD 1、2026-09-01 开始、无结束日期、Unblended costs；保留 All AWS services，不排除 Credit／Refund 或其他费用类型。唯一告警为 Actual 100%，即净费用**大于** USD 1 时触发。
- Budgets 列表实际显示 **2** 项预算；gross／net 的 Alerts 分别显示 **3／1** 条。已逐条打开四条保存后的 Alert details／Email recipients，确认都是用户指定的同一地址；Amazon SNS 未启用、Actions 为 0。未配置 Chatbot、Budget Actions 或 Budgets Reports。
- 初次邮箱输入未通过 AWS 表单验证，已重新以实际键盘输入并通过校验；两个预算随后保存成功。**保存与收件人核对已完成，邮件实际投递尚未验证**；未发送测试消息、未降低阈值或制造费用来触发告警。
- 曾打开普通 **Upgrade to paid plan** 审阅页，但未点击最终升级按钮。用户决定保持 Free 后，已通过 **Go to Console home** 退出升级页；首页再次显示 **Free**，免费期结束字段为 **Nov 01, 2026**。原升级交接及“升级后复核”的待办均撤回，不要求用户继续升级。
- 本轮仅更新本文件，保留其他共享文件的既有改动；没有应用或依赖变更，未重跑 npm 检查。学习资源没有启停、删除或修改；没有新建云主机、DNS、角色或密钥，没有公开部署或 Git 推送。本地 `http://127.0.0.1:3000/` 继续归 PM 管理。
- 用户询问“能不能没有额度了就停止”后，已重新核对官方规则：Free plan 在免费期结束或额度耗尽时自动关闭整个账户；Paid 不在额度耗尽时自动关闭，预算有入账／通知延迟。Lightsail Stop 仍收实例费用。没有配置或承诺 Paid 计划下“额度归零立即停费”的硬上限，也没有清理任何学习资源。
- **最终决定已收到：**“那就先 free plan 吧……目前就先 free 的”。本小步按新范围收尾：两个预算及四条告警保留；账户仍为 Free；项目暂不部署；全部学习资源保持原状。保留当前资源不代表 Free 到期后能永久保留或访问。以后有上线需求时由用户在本对话重新提出，不自动创建新任务、提醒或云资源。
- 收尾检查：`git diff --check` 退出码 0；`git diff --no-index --check /dev/null docs/aws-deployment.md` 无空白错误输出，退出码 1 表示新增文件差异。已关闭本次临时预算／升级标签页，保留用户原 Credits 标签页。用户当前无需操作 AWS 或返回额外结果；后续在原项目任务继续本地学习即可，有部署需求时再回到本对话。应用检查未重跑，邮件投递仍未验证；本地服务仍由 PM 管理，无需重复启动。
