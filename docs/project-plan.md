# LocalTrip：旅游活动预订与商家运营系统

**项目计划版本：1.0｜制定日期：2026-09-24**  
**状态：待实施的产品与工程计划，不代表代码、测试或部署已经完成。**  
LocalTrip 仅为工作名称，不代表已注册品牌。本文的开发时长、测试规模、演示价格、取消期限和功能限制均为规划假设，不是实际业务成绩、行业标准或服务商报价。

## 0. 已确定的方向

先开发一家虚构的新西兰小型旅游活动运营商的响应式 Web 预订系统；游客可以浏览活动、选择场次并预约，工作人员可以管理活动、场次、容量及预订。第一版不涉及真实收款，不对接真实商家库存。

项目的近期目标是形成可运行、可测试、可部署、能清楚解释的个人全栈作品，用于 NZ Graduate / Junior Software Developer 求职。已有前端经验应更多投入交互质量，而新增学习重点是数据库、权限、事务、API、异常处理和部署。

后续构想保留，但不得自动变成第一版任务：

- 本地“找搭子”及活动组队，不局限于旅游，包括逛 PAK’nSAVE、踢球、吃日料、去海边、周末出游。
- 熟人邀请、陌生人申请、人数管理、成员确认和共同规划。
- 多人 AI 行程规划：收集时间、预算、兴趣和限制，推荐景点、美食、住宿，形成逐日行程及可交互的地图路线。
- 这些功能可成为同一产品的新模块，也可根据未来用户群和定位拆成另一应用；目前不决定、不重构、不预建全部数据表。

**当前唯一主线：商家发布场次 → 游客预约 → 可靠分配名额 → 双方查看 → 取消及释放名额。**

## 1. 产品范围与默认假设

| 项目 | 第一版决定 |
|---|---|
| 客户 | 一家虚构运营商，不是多商家市场 |
| 内容 | 3–5 种自编的演示活动；每种 5–10 个未来场次，seed 相对运行日生成日期 |
| 形态 | 响应式网站，手机浏览器及桌面都能使用；不是原生移动 App |
| 界面语言 | 英文优先；计划和学习说明可以用中文 |
| 币种 | NZD；使用整数最小货币单位记录价格 |
| 时区 | 业务显示 Pacific/Auckland；数据库保存绝对时间 |
| 票种 | 单一按人计价；没有儿童票、团体折扣和套餐 |
| 人数 | 单次 1–6 人作为演示限制；还需满足场次剩余容量 |
| 登录 | 浏览不需登录；预约及查看自己的订单需登录 |
| 确认 | 无支付条件下，事务成功即确认演示预约 |
| 联系信息 | 联系人姓名及邮箱；首版不收证件、住址或健康资料 |
| 商家管理 | 一个 STAFF 角色；不公开工作人员注册及角色升级 |
| 图片 | 自有或许可素材；首版从预置素材选择，不支持任意 URL 抓取 |

示例活动可以是城市步行体验、摄影散步和海湾体验；名称、价格、人数、图片授权和活动说明均清楚标记为演示，不冒充真实供应商。

首页、确认页和 README 都需要显示：**Portfolio demo — reservations are simulated. No payment is collected.**

### 第一版不做

多商家入驻、抽佣、找搭子、动态信息流、即时聊天、司机与乘客撮合、真实付款退款、酒店机票、复杂地图、供应商库存同步、原生 App、会员、优惠券、复杂推荐算法和自动下单 Agent。

有新想法时写入未来路线图，不改变当期验收范围。

## 2. 版本与交付边界

| 版本 | 目的 | 交付内容 | 开工条件 |
|---|---|---|---|
| V1 | 完整预订作品 | 活动、场次、预约、取消、权限、商家后台、测试、部署、README | 当前计划 |
| V1.1 | 展示后台任务与 AI 集成 | Redis/BullMQ 通知；可靠任务记录；有依据的活动问答；AI 用量控制 | V1 验收通过并发布 |
| V1.2（可选） | 展示支付工程 | Stripe 测试支付、待支付状态、占位到期、webhook 去重 | 单独审查范围后 |
| V2（未来） | 活动组队 | 邀请/申请、接受/退出、成员确认、简单协作、举报屏蔽 | 确認有试用人群及明确需求 |
| V3（未来） | 多人 AI 旅行规划 | 偏好协商、地点搜索、时间/预算校验、地图路线、人工确认 | 小规模路线原型可验证后 |

V1.2 不是开展组队或 AI 规划的强制前置。多人行程可以先服务三个已认识的朋友，不需要先把陌生人匹配平台运营起来。

支付增量必须重新设计“待支付占位—支付确认—到期释放”的状态流程，不是在原来的 CONFIRMED 预约上加一个付款按钮。使用测试环境；以服务端验证过签名的 webhook 及支付对象为依据，不信任返回成功页面；处理重复通知、乱序和付款迟于占位失效的情况。[S14]

## 3. 角色与用户故事

### 游客

能看活动列表、价格、时长、地点、包含内容、注意事项及可预订场次。只展示已发布活动。无可用场次时应显示明确状态，不显示假的库存。

### 已登录客户

能选择场次和人数、核对价格及取消条件、提交预约、查看自己的预约详情，在允许时间内取消。网络中断后再次提交同一次请求，不应生成重复预约。不能通过更改 ID 查看别人的预约。

### 工作人员

能创建、编辑、发布、归档活动；创建场次，调整允许修改的参数，关闭销售，查看参与名单及预约；取消单个预约或整个未来场次并记录原因。工作人员身份由后台安全配置，不能靠客户端传入 role=STAFF 获得。

### 权限原则

认证回答“你是谁”，授权回答“你能访问什么”。每个服务端入口都检查权限，不依赖按钮可见性或 URL 名字。对使用 cookie 的变更请求实施同源检查和适当 CSRF 防护；GET 不产生预约、取消等副作用。Next.js Route Handlers 是公开 HTTP 入口，因此需要自行实现认证及授权。[S01]

## 4. 页面及主要交互

| 路由 | 功能与关键状态 |
|---|---|
| `/` | 运营商介绍、精选活动、演示声明；不过度做营销页面 |
| `/activities` | 活动卡片、基础类别筛选；空列表/加载/失败 |
| `/activities/[slug]` | 描述、时长、地点、价格、FAQ；场次、人数选择；满员/停售/过期 |
| `/login`、`/signup`、`/reset-password` | 使用托管认证流程；无效信息、过期链接、登录失败 |
| `/book/[sessionId]` | 预约表单、最新报价、取消截止时间、明确确认按钮 |
| `/bookings` | 我的已确认、已取消及历史预约；不共享缓存 |
| `/bookings/[id]` | 预约编号、内容快照、状态、人数及取消操作 |
| `/admin` | 未来场次数、预约数量、已确认人数；不把演示金额称作真实收入 |
| `/admin/activities` | 活动列表、新增及编辑页；发布前校验 |
| `/admin/sessions` | 场次列表及容量、销售状态管理；优先普通表格，不开发拖拽日历 |
| `/admin/bookings` | 按场次/状态筛选；查看详情、参与名单及取消原因 |

预约成功后进入详情页。刷新该页不能重新发起 POST。页面必须处理过期价格、满员、未登录、网络失败，不用“按钮变灰”代替后端校验。

表单要有 label、键盘可达、明确错误提示；手机端先做好场次选择、人数及确认按钮。不要一开始定制复杂动画或设计系统。

## 5. 第一版业务规则

### 5.1 活动与场次分开

Activity 是长期存在的产品，例如“Harbour Photography Walk”。Session 是某一天某一时间的实际场次。用户预约 Session，而不是直接预约 Activity。

活动状态：`DRAFT → PUBLISHED → ARCHIVED`。为控制范围，归档后首版不恢复，确需重用可另行确认需求。

场次销售状态：`OPEN / CLOSED / CANCELLED`。`CLOSED` 只表示停止新预约，已有预约仍有效；未来且未取消的场次可以重新开放。过去/已结束是根据时间计算的展示状态，不依赖后台任务修改枚举。

预约状态：`CONFIRMED → CANCELLED`。已取消不能恢复，只能新建预约。第一版没有 PENDING_PAYMENT、PAID、REFUNDED。已发生的体验可显示 Past，不必新增 COMPLETED 状态。

### 5.2 容量与一致性

数据库约束：

- `capacity > 0`。
- `0 <= reserved_count <= capacity`。
- `reserved_count = SUM(quantity WHERE booking.status = CONFIRMED)`，作为需由业务事务维持并用测试/核对检查的跨表不变量，不冒称单个 CHECK 可以跨表保证。
- 只有已发布活动下、OPEN 且未到销售截止时间的场次可预约。
- 数量为整数，并满足 1–6 及剩余容量。

预订、取消、修改容量、取消整个场次都通过同一业务层。PostgreSQL 是库存的最终来源。V1 不用 Redis 缓存结果决定能否下单，不引入 Redis 分布式锁。

### 5.3 日期与截止时间

演示规则：开始前 2 小时关闭新预约；开始前 24 小时停止客户自助取消。它们是本项目的可配置规则，不是法律或行业默认值。

将开始、结束、销售截止时间保存为 `timestamptz`。将本次适用的取消截止时间保存在预约快照。比较以服务器/数据库时间为准。

采用明确边界：`now < booking_closes_at` 才能预约，`now < cancel_deadline_at` 才能客户自助取消；恰好到达截止时间即不允许。

在开场前 24 小时以内仍允许预约至销售截止，但确认页明确提示“不支持自助取消”。工作人员可按演示管理规则在开场前取消并填写原因；已开始后的更正不在首版范围。

PostgreSQL 会以统一时间保存带时区时间戳，并在输出时转换。业务需要单独保留 `Pacific/Auckland` 时区标识，不把新西兰时间硬编码为 UTC+12。[S04]

### 5.4 金额及历史快照

只做一种票价。NZ$89.00 在数据库存为 `8900`，总价由后端用场次单价乘人数计算。前端传入的金额不作为权威价格。

客户端可以传 `expectedUnitPriceMinor` 用于发现报价变化：和当前单价不同则返回 `PRICE_CHANGED`，要求用户确认新价格后再次提交，不偷偷接受新报价。

预约保存活动标题、场次开始结束时间、集合地点、时区、单价、总价、币种及取消期限快照。以后编辑活动标题或新价格，不得篡改旧预约凭证。

演示没有真实收款，因此后台显示“Confirmed reservation value (demo)”而不是收入或已收款；不生成假税务发票。

### 5.5 重复请求

创建预约要求 `Idempotency-Key`（建议 UUID）。数据库对 `(user_id, idempotency_key)` 加唯一约束；保存规范化业务请求的 hash。

同一用户、相同 key、相同请求：返回同一预约，不再次占位。相同 key 但不同场次/人数/联系人/报价：返回 `409 IDEMPOTENCY_KEY_REUSED`。

幂等键对应一次明确提交意图。超时重试保留同一个 key；用户修改人数或接受新报价时生成新 key。取消不依赖全新幂等表，而是锁定和检查当前状态，仅首次从 CONFIRMED 转换为 CANCELLED 时释放容量；再次取消返回既有状态。

成功预约的 key 随预约保留，第一版不做自动过期删除。若预约后来已取消，再重放旧创建请求返回该同一预约的当前 CANCELLED 状态，不生成新预约。

### 5.6 商家修改及取消

活动归档后禁止新预约，但保留客户已有预约和可用取消操作。存在任何预约历史的场次，不直接改开始时间、结束时间或集合地点；改期流程后续单独设计。

容量可以调整但不得小于 reserved_count。价格修改仅影响新预约；旧预约读取自身快照。场次取消由事务同时修改场次、取消相关有效预约及写审计记录。这里限定小型演示容量，不为大规模批处理提前增加复杂架构。

无论游客取消、工作人员取消还是全场取消，只能释放当前有效预约占用的容量一次。订单不做硬删除。

## 6. 推荐技术方案

| 层 | 选择 | 理由与边界 |
|---|---|---|
| Web | Next.js App Router + TypeScript | 页面和 API 放在一个项目；使用初始化时核验过的稳定版并锁定依赖 |
| UI | Tailwind CSS + shadcn/ui | 复用表单、表格、对话框；不先做自研组件库 |
| 输入校验 | Zod | 服务端严格校验，前端复用；类型不能代替运行时校验 |
| 数据库 | PostgreSQL | 关系模型、事务、约束、索引 |
| ORM | Prisma | 常规读写及迁移；锁和约束必要时使用参数化 SQL |
| 身份认证 | Supabase Auth | 托管密码和会话；自己的 app_users 表保存业务角色 |
| 开发/演示数据库 | Supabase 托管 PostgreSQL | 减少认证与数据库供应商数量；测试用隔离数据库 |
| V1.1 任务 | Redis + BullMQ + Node worker | 通知与重试；不替代数据库库存 |
| V1.1 AI | 服务端调用模型 API | 先一个只读活动问答入口；模型名由环境配置，不硬编码“最贵模型” |
| 测试 | Vitest + Playwright | 业务单元测试、真实 PostgreSQL 集成测试、浏览器端到端测试 |
| CI | GitHub Actions | lint、typecheck、测试、build；不在本计划中创建真实仓库 |

Supabase 提供 Next.js 服务端认证指引；身份应通过经过校验的 token 确定，不能直接信任客户端 cookie 中未经核验的 user 对象。[S02]

**访问边界决定：业务表由 Next.js 服务端通过 Prisma 访问，不让浏览器直接写预订表。** Supabase 的 Prisma 指引建议，在仅使用 Prisma、不使用 Data API 时关闭后者。[S03] 项目采用该简化方式；运行时与迁移权限尽量分开，服务端数据库凭据不可公开。使用数据库直连时，不假定 Supabase RLS 会自动拿到当前浏览器用户的身份。角色与所有权由已认证的业务服务明确检查。

不要同时实现 Prisma 数据路径和浏览器 Supabase Data API 两套业务写入路径。不要手写密码加密、会话刷新或重置密码体系。

### 6.1 单体架构

```text
浏览器（游客端 / 客户端 / 工作人员后台）
                    |
          Next.js 页面 / Route Handlers
                    |
       验证身份 → 校验输入 → 检查权限
                    |
        activities / sessions / bookings 服务
                    |
            Prisma + 参数化 SQL
                    |
               PostgreSQL

V1.1 增量：
预约事务同时写 outbox_events
                    |
        dispatcher → Redis/BullMQ → worker → 通知渠道

活动问答 API → 读取允许的活动资料 → 模型 API → 校验结果 → 页面
```

这里是一个代码仓库、模块化单体。业务规则集中在 service，API 处理 HTTP；Server Components 读取数据时可以直接调用允许的服务，不必绕一圈请求自己的 HTTP API。不要把完整业务逻辑复制到组件、Route Handler 和 worker 三个地方。

本项目不是静态导出站点：预订和权限需要服务端运行时。可按 Render 的 Next.js Node Web Service 指引部署；V1.1 的 worker 单独作为常驻进程部署。[S11][S12]

## 7. 数据库逻辑 schema

以下是待实现的逻辑模型，不是已经执行的迁移。具体 Prisma 语法、CHECK、索引及连接设置应在初始化时按使用的版本确认。

### 7.1 `app_users`

```text
id                    uuid PK              # 对应已验证的 Supabase Auth subject
email                 text NOT NULL
name                  text NULL
role                  enum CUSTOMER|STAFF   # 默认 CUSTOMER，服务端受控
created_at            timestamptz NOT NULL
updated_at            timestamptz NOT NULL
```

不保存 password。首次已验证登录后可创建业务资料，角色默认 CUSTOMER。业务用户邮箱保持和认证源同步；工作人员角色不能来自可编辑的 user_metadata。认证状态失效时不能继续授权。

### 7.2 `activities`

```text
id                    uuid PK
slug                  text UNIQUE NOT NULL
title                 text NOT NULL
summary               text NOT NULL
description           text NOT NULL
category              text NOT NULL
location_label        text NOT NULL
meeting_point         text NOT NULL
image_key             text NOT NULL        # 预置资产 key
inclusions            jsonb NOT NULL        # 字符串数组，入库前校验
preparation_notes     jsonb NOT NULL
faq                   jsonb NOT NULL        # {id, question, answer}[]
content_version       integer NOT NULL DEFAULT 1
status                enum DRAFT|PUBLISHED|ARCHIVED
created_at            timestamptz NOT NULL
updated_at            timestamptz NOT NULL
```

首版不需要独立分类表、图片库或向量数据库。字段更新时 content_version 增加，供后续 AI 引用版本及缓存失效使用。

### 7.3 `activity_sessions`

```text
id                    uuid PK
activity_id           uuid FK activities(id) ON DELETE RESTRICT
starts_at             timestamptz NOT NULL
ends_at               timestamptz NOT NULL
timezone              text NOT NULL DEFAULT 'Pacific/Auckland'
meeting_point         text NOT NULL        # 创建时复制活动默认值
capacity              integer NOT NULL
reserved_count        integer NOT NULL DEFAULT 0
unit_price_minor      integer NOT NULL
currency              text NOT NULL DEFAULT 'NZD'
booking_closes_at     timestamptz NOT NULL
cancel_before_hours   integer NOT NULL DEFAULT 24
status                enum OPEN|CLOSED|CANCELLED
cancelled_at          timestamptz NULL
cancel_reason         text NULL
created_at            timestamptz NOT NULL
updated_at            timestamptz NOT NULL
```

CHECK：结束晚于开始；销售截止早于开始；capacity 正数；reserved_count 非负且不大于 capacity；unit_price_minor 非负并在应用设定上限内；currency 只能 NZD；取消提前小时数非负。

索引：`(activity_id, starts_at)`、`(status, starts_at)`。同一活动是否允许同一时间两个场次，V1 默认不允许，设 `(activity_id, starts_at)` 唯一约束。存在预约历史时，服务端禁止修改时间、集合地点及取消提前期限。

### 7.4 `bookings`

```text
id                         uuid PK
reference                  text UNIQUE NOT NULL
user_id                    uuid FK app_users(id) ON DELETE RESTRICT
session_id                 uuid FK activity_sessions(id) ON DELETE RESTRICT
quantity                   integer NOT NULL
contact_name               text NOT NULL
contact_email              text NOT NULL
status                     enum CONFIRMED|CANCELLED
unit_price_minor_snapshot  integer NOT NULL
total_price_minor          integer NOT NULL
currency                   text NOT NULL
activity_title_snapshot    text NOT NULL
starts_at_snapshot         timestamptz NOT NULL
ends_at_snapshot           timestamptz NOT NULL
timezone_snapshot          text NOT NULL
meeting_point_snapshot     text NOT NULL
cancel_deadline_at          timestamptz NOT NULL
idempotency_key            uuid NOT NULL
request_hash               text NOT NULL
cancelled_at               timestamptz NULL
cancelled_by               uuid NULL FK app_users(id)
cancel_reason              text NULL
created_at                 timestamptz NOT NULL
updated_at                 timestamptz NOT NULL
```

UNIQUE：`(user_id, idempotency_key)`。CHECK：quantity 为 1–6；total_price_minor 等于 quantity × unit_price_minor_snapshot；价格非负；取消字段与状态一致。

索引：`(user_id, created_at)`、`(session_id, status)`、reference 唯一索引。姓名和邮箱不写进调试日志。首版不提供删除账户的自动工作流；未来公开运营前单独定义数据保留和删除处理。

### 7.5 `audit_events`

```text
id                    uuid PK
actor_user_id         uuid NULL FK app_users(id)
action                text NOT NULL
entity_type           text NOT NULL
entity_id             uuid NOT NULL
metadata              jsonb NOT NULL        # 白名单字段，不复制所有个人信息
created_at            timestamptz NOT NULL
```

记录预约创建/取消、场次取消、容量变化、活动发布归档。关键业务事件和变更在同一事务写入。首版不做复杂的日志检索界面，可以在预约/场次详情呈现关联事件。

### 7.6 V1.1 才增加

`outbox_events`：事件 ID、类型、聚合对象 ID、必要 payload、状态、尝试次数、下次尝试时间、创建及处理时间。

`notification_deliveries`：事件 ID、渠道、目标摘要、投递状态和 provider_message_id；唯一约束防止应用重复执行同一逻辑投递。

`ai_requests`：用户 ID、活动 ID、资料版本、模型标识、耗时、token 用量及结果类别。默认不永久记录完整对话和个人信息。

目前不创建 payments、trip_groups、trip_plans 等未来表。

## 8. 事务与并发设计

### 8.1 锁顺序

需要修改同一场次的操作统一先锁 session，再锁相关 booking；涉及多个预约时按稳定 ID 顺序处理，避免不同流程采用相反顺序。活动发布/归档状态也需要同步保护：预约在锁 session 前对 activity 取得共享行锁，归档对 activity 取得互斥行锁；任何同时触及两者的流程统一采用 activity → session → booking 顺序。只操作 session/booking 的取消不应在持有子对象锁后反向等待 activity 锁。数据库行锁只在短事务期间持有，事务里不发邮件、不调用模型、不调用支付服务。[S05]

### 8.2 创建预约（逻辑步骤）

1. 验证登录、请求格式、人数、幂等键；从 session 获取用户，不信任请求体里的 userId。
2. 规范化请求并计算 hash；查询该用户同一幂等键的既有预约，存在则核对 hash 并返回。
3. 开启数据库事务，先对所属 activity 取得共享行锁，再锁定目标 session 行。
4. 在锁内再次查幂等键，处理两个同时到来的相同请求。
5. 验证活动仍发布、场次 OPEN、时间未截止、报价匹配、容量足够。
6. 更新 reserved_count；插入带价格/时间/地点快照的 booking 及审计事件；统一提交。
7. 成功返回 201 和预约详情。若唯一约束冲突，必须让整个事务回滚，再到事务外读取已存在记录并核对 hash；不得在失败事务里吞掉错误继续提交。

同一幂等键但不同 session 的并发请求，最终由唯一约束排除重复；失败事务的容量更新必须回滚。不要只处理最常见的“同一个场次重复点击”。

### 8.3 取消预约

首先只读取足够信息定位 session 及检查可见性。进入事务后先锁 session，再锁 booking，重新验证所有权/角色及状态。若已取消，返回当前状态、不再次减容量。若可取消，将状态变更、reserved_count 减 quantity，并写事件，同一事务提交。

取消整个场次时同样先锁 session；仅处理当前 CONFIRMED 预约，更新状态与容量并写记录。并发的新预约因锁和状态检查被拒绝。不要在事务外分两步“先取消订单，再还库存”。

## 9. API 合同（V1）

认证使用托管 Auth SDK/回调流程；下面是自有业务 API。所有列表有分页/查询范围上限。个人信息响应设 private/no-store，错误不暴露 SQL、连接串或内部堆栈。

| 方法与路径 | 访问者 | 目的 |
|---|---|---|
| GET `/api/v1/activities` | 公开 | 已发布活动列表；有限 category / q / page 参数 |
| GET `/api/v1/activities/[id]` | 公开 | 已发布活动详情 |
| GET `/api/v1/activities/[id]/sessions` | 公开 | 指定时间窗口内的可展示场次及当前可用容量 |
| POST `/api/v1/bookings` | CUSTOMER/STAFF 作为客户本人 | 创建预约，要求 Idempotency-Key |
| GET `/api/v1/me/bookings` | 已登录 | 仅自己的预约 |
| GET `/api/v1/bookings/[id]` | 拥有者 | 预约详情；不对他人暴露是否存在 |
| POST `/api/v1/bookings/[id]/cancel` | 拥有者 | 按快照期限自助取消 |
| GET/POST `/api/v1/admin/activities` | STAFF | 管理列表/创建活动 |
| PATCH `/api/v1/admin/activities/[id]` | STAFF | 内容或状态更新，严格字段白名单 |
| GET/POST `/api/v1/admin/sessions` | STAFF | 场次列表/新建 |
| PATCH `/api/v1/admin/sessions/[id]` | STAFF | 修改允许的容量、价格及销售状态 |
| POST `/api/v1/admin/sessions/[id]/cancel` | STAFF | 带原因取消全场 |
| GET `/api/v1/admin/bookings` | STAFF | 按场次/状态筛选 |
| GET `/api/v1/admin/bookings/[id]` | STAFF | 详情及相关事件 |
| POST `/api/v1/admin/bookings/[id]/cancel` | STAFF | 管理取消，记录原因 |
| GET `/api/health` | 公开有限输出 | 只返回服务健康状态，不公开环境变量 |

**创建请求示例：**

```http
POST /api/v1/bookings
Content-Type: application/json
Idempotency-Key: <UUID-for-this-submit-intent>
```

```json
{
  "sessionId": "<session-uuid>",
  "quantity": 2,
  "contactName": "Demo Traveller",
  "contactEmail": "demo@example.com",
  "expectedUnitPriceMinor": 8900
}
```

上例价格是演示值。userId、status、实际总价和工作人员权限都由服务器决定。

**响应格式：**成功 `{ "data": ... }`；失败 `{ "error": { "code": "SOLD_OUT", "message": "...", "requestId": "..." } }`。

201 创建；200 查询/幂等重放/再次取消；400 输入错误；401 未登录；403 已登录但非工作人员；404 对象不存在或不应泄露的他人预约；409 SOLD_OUT / BOOKING_CLOSED / PRICE_CHANGED / CANCELLATION_CLOSED / IDEMPOTENCY_KEY_REUSED / CAPACITY_BELOW_RESERVED；429 限流；503 可恢复依赖故障。

### V1.1 AI 端点

POST `/api/v1/ai/activity-questions`，输入 `{activityId, question}`。服务端验证活动可公开、问题长度及额度后只传递该活动的可公开资料。输出结构 `{answer, sourceIds, needsHumanHelp}`，引用 ID 必须由后端对照实际资料白名单核验。不得接受任意 URL 去抓网页，也不得从请求参数获取其他客户的订单。

## 10. 文件夹结构

```text
localtrip/
├── src/
│   ├── app/
│   │   ├── (public)/              # 首页、活动列表及详情
│   │   ├── (auth)/                # 登录、注册、恢复密码
│   │   ├── (account)/             # 预约表单、我的预约
│   │   ├── admin/                 # 工作人员页面
│   │   └── api/v1/                # HTTP 入口，业务逻辑放服务层
│   ├── features/
│   │   ├── activities/            # components / schemas / service
│   │   ├── sessions/
│   │   ├── bookings/
│   │   ├── notifications/         # V1.1 创建
│   │   └── ai/                    # V1.1 创建
│   ├── components/ui/
│   ├── lib/
│   │   ├── auth/                  # verify identity / requireStaff
│   │   ├── db/                    # Prisma 与事务工具，server-only
│   │   ├── errors/
│   │   ├── money/
│   │   └── time/
│   └── proxy.ts                   # 按选定 Next.js/Auth 版本实现
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── workers/                       # V1.1 创建，不在每次 HTTP 请求启动
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
│   ├── project-plan.md
│   ├── api.md
│   ├── testing.md
│   ├── deployment.md
│   ├── roadmap.md
│   └── decisions/                 # 短 ADR：事务、Auth、范围等
├── .github/workflows/ci.yml
├── .env.example                   # 变量名与用途，无真实密钥
├── AGENTS.md
└── README.md
```

V1.1 文件夹在功能开始时才创建。不要先建立空的聊天、支付、社交和地图模块；不要先拆 monorepo、微服务或引入消息总线。

## 11. Redis / 后台任务增量

V1 可以先在网页展示确认结果，不承诺邮件已经发送。V1.1 增加通知时明确区分“预约成功”和“通知成功”。

在 booking 事务里同时写 outbox_events，记录“这个通知需要发送”。dispatcher 读取已提交事件并推送 BullMQ；worker 执行通知及记录投递结果。队列暂时不可用时，预约照常成功，待发送事件仍在数据库，后续恢复处理。

采用 at-least-once（至少一次）任务处理假设，使用事件 ID 去重并设计幂等业务；不承诺 exactly-once。外部邮件服务若不支持幂等键，发送成功但写回状态前崩溃的边界仍可能造成重复邮件，应记录此限制并做合理控制。[S06][S07]

通知重试不应再次创建预约。出发提醒发送前重新检查场次及预约是否仍有效，已取消则跳过。

worker 运行在适合常驻 Node 进程的环境中。不能把 BullMQ 消费循环塞进短生命周期 HTTP handler，或用每次请求启动 setInterval 来代替可靠任务服务。Render 提供独立 background worker 服务并列有 Node.js/BullMQ 用例。[S12]

本地可用 Redis 容器学习；部署时选择兼容 BullMQ 所需连接、命令与持久化方式的 Redis 服务。若用 Render Key Value，文档说明新实例是 Redis 协议兼容的 Valkey，应在 README 如实标注，不冒称其实现必定是 Redis。[S13]

Redis 不可用时，通知保持待处理；对收费 AI 接口的预算限流若无法可靠判定，关闭 AI 入口而不是无限放行。

## 12. V1.1 AI 功能：活动资料问答

范围只限当前运营商已发布活动的说明、包含项目、集合地点和 FAQ。资料量小，先按 activityId 精确读取结构化数据，无需向量数据库、LangChain 或多 Agent。

用户可以问“需要带什么”“集合在哪里”“这项体验包含哪些内容”。AI 返回资料依据；资料没有答案时明确提示联系运营商。系统不让 AI 编造价格、库存、订单状态或天气安全结论。

价格与名额由独立的实时业务卡片展示，AI 不计算或承诺。没有订单写权限，不调用取消或支付 API。用户输入或活动描述中的“忽略指令”不应改变权限。

结构化输出可以约束字段，但不保证内容正确，仍需核验引用、处理拒绝/超时/不完整输出，并保持 FAQ 的非 AI 备用路径。[S08]

建议准备 30 个手工标注评估问题，覆盖：有明确答案、资料缺失、诱导编造、越权访问、要求自动退款。30 是演示规模目标，不是既有测试成绩；报告应写实际通过数量和失败案例。[S09]

每用户每日请求上限、输入长度、输出 token 上限、超时和总预算均由应用配置；异常重试也计入预算。不要在无明确授权时自动开通付费服务。

ChatGPT Pro/Codex 辅助开发的订阅用量，与网站向 AI API 发出的请求是不同的账单。OpenAI 官方明确 ChatGPT 与 API 独立计费。[S10]

## 13. 测试与验收

### 单元测试

人数、金额、取消边界、时区转换、输入 schema、状态转换和价格快照。时间使用可注入 clock，不依赖运行当天。

### PostgreSQL 集成测试

不能只用 mock 或 SQLite 代替：容量竞争、行锁及回滚必须在隔离 PostgreSQL 数据库里验证。真实并发使用独立连接/事务，避免把请求串行执行却称“并发测试”。

| 场景 | 目标验收 |
|---|---|
| 5 个名额，20 个不同合法请求同时各预约 1 人 | 恰好 5 个确认；其余明确失败；数据库不超过容量 |
| 同一 key 同一请求并发重复 10 次 | 只有一个预约 ID，容量只扣一次 |
| 同一 key 不同 session 并发请求 | 只允许一份业务意图提交，另一份冲突，失败事务不占位 |
| 同一预约取消两次/并发取消 | 只释放一次名额，状态保持 CANCELLED |
| A 请求 B 的预约 | 返回不泄露信息的错误，不返回 B 的姓名/邮箱 |
| 普通用户请求 admin API | 403，客户端伪造角色无效 |
| 工作人员降低容量至已预订人数以下 | 拒绝，原值不变 |
| 创建订单阶段故障 | 事务回滚，不出现无订单占位 |
| 销售截止或取消截止的精确时刻 | 按 `now < deadline` 规则明确拒绝 |
| 活动归档 | 不允许新预约，既有预约仍可查看/按规则取消 |
| 工作人员取消场次与游客预约同时发生 | 不允许取消场次出现新有效预约 |
| 夏令时转换相关输入 | 解析和显示一致；不存在/歧义本地时间明确处理 |
| Redis / worker 暂时中断（V1.1） | 核心预约可用；通知保留可恢复 |
| AI 失败或超预算（V1.1） | 正常预约仍可用，提供静态资料路径 |

### 端到端测试

游客浏览 → 登录 → 预约 → 查看 → 取消。工作人员登录 → 建立活动和场次 → 发布 → 查看预约。测试手机及桌面主要路径、键盘操作、错误和空状态。

CI 先跑 lint / typecheck / unit / integration / build，再运行适合 CI 环境的 E2E。不要为了通过 CI 删除断言或关闭类型校验。

### V1 完成定义

核心业务流程全部可用；上述关键一致性和权限测试通过；没有已知可越权、重复占位或重复释放名额的问题；部署链接可访问；干净数据库可迁移与 seed；README 可指导别人启动；完成 3–5 分钟演示；依赖和密钥检查完成。

不以“写了多少行”“页面都能点”为完成标准。未完成 Redis/AI 时，简历不写它们已经实现。

## 14. 里程碑与工作量估计

以下为规划级估计，不是承诺。尚未确认每周可投入时间；首次小阶段完成后，用实际用时重新估算。学习、认证邮件配置、依赖兼容和部署故障可能使时长增加。

| 阶段 | 任务 | 验收 | 基础有效工时估计 |
|---|---|---|---|
| M0 | 范围冻结、页面草图、项目初始化、CI 骨架、最小部署 | 本地及测试地址可运行；计划和排除项入仓库 | 4–6h |
| M1 | 认证、角色、schema、迁移、seed、活动浏览 | 从数据库显示内容；身份及权限检查可验证 | 6–10h |
| M2 | 预约/取消服务、API、最小表单、事务及幂等测试 | 两名额场景和重复请求完整跑通 | 12–20h |
| M3 | 商家活动/场次/预订后台、客户详情页、状态体验 | 一次完整前后台演示可完成 | 12–18h |
| M4 | 边界测试、手机与可访问性、部署修复、README、演示录制 | V1 发布清单通过并打标签 | 14–22h |

基础合计 48–76h；加入约 25% 调试与学习缓冲，按 **60–100h** 安排 V1。每周 10h 是约 6–10 周，每周 20h 是约 3–5 周，这只是时间换算，不代表用户已经承诺该投入。

M2 是最早的可运行业务检查点，不必等完整后台。V1.1 Redis 与 AI 增量另外估计 20–40h，必要时分两次发布。付款和组队不在这个工期内。

每次只完成一段：定义验收 → 实现 → 测试 → 人工看页面及解释代码 → commit。UI 润色不能持续挤掉核心事务测试。

## 15. 部署、数据与费用

建议初版：Next.js Node Web Service + Supabase Auth/PostgreSQL；后续单独添加 worker 和 Redis。供应商可按预算调整，但应先选一个路径跑通，不同时维护多套部署。[S03][S11][S12]

开发、自动测试和线上演示使用隔离数据；不要用“reset database”修复线上演示。迁移需留记录，先在测试环境验证；建立一次导出及恢复演练。数据库连接数有上限，服务端使用合适的连接池与 ORM 客户端生命周期。

工作人员演示账号不公开写在 README。公开展示可提供脱敏只读截图或录屏；需要别人亲自操作时使用受控测试账号/隔离数据。不能把共享 STAFF 密码公开后称网站安全。

首版仅使用虚构客户和受邀试用，尽量不收真实个人信息。收集用途、保留及删除方式应在公开试用前说明。

成本项包括 Web 托管、数据库/Auth、worker、Redis、通知和模型 API；未来再加地图/地点 API。免费额度不作永久保证，本计划不提供未经核实的月费报价。

先让基础预订不依赖 AI 和地图；在应用里设置每日/总量限制、错误保护及可关闭开关。成本上限是用户决策，不能由代码代理擅自创建付费资源。

## 16. README 与面试交付

README 建议英文为主，包含：

1. 一句话问题及目标用户。
2. 演示链接、演示声明及截图。
3. 已实现功能；未来构想放单独 Roadmap，避免混写。
4. 架构与技术选择，特别解释单商家、无真实支付的范围决定。
5. 环境变量用途、依赖版本、安装、迁移、seed、启动步骤。
6. 测试命令、覆盖场景、真实执行结果和已知限制。
7. 权限、库存事务、幂等、取消与时区的关键设计。
8. 部署方式、成本控制及数据保护。
9. AI 辅助开发说明：工具做了什么、本人审查/实现/验证了什么。

计划提供的命令接口可包括 `pnpm dev`、`pnpm lint`、`pnpm typecheck`、`pnpm test:unit`、`pnpm test:integration`、`pnpm test:e2e`、`pnpm build`、`pnpm db:migrate`、`pnpm db:seed`。这些脚本需要真正实现后才能写成可运行说明；本文不声称当前已有这些脚本。

完成 V1 后才可采用的 CV 表述示例：

> Built a full-stack activity booking application with Next.js, TypeScript and PostgreSQL, featuring customer reservations and a staff operations dashboard.
>
> Implemented transactional capacity management, idempotent booking requests and role-based access control, verified with integration and end-to-end tests.

只有完成 V1.1 后再写 AI、Redis 相关成果。不编造真实客户数量、营收、性能提升百分比；负载数字必须附测试环境、请求方式及实际结果。

面试演示主线：创建场次 → 预订 → 取消 → 查看后台 → 演示满员/重复请求测试 → 解释为什么数据库是库存最终来源。优先准备“为什么不用 Redis 锁”“失败如何恢复”“UI 权限与服务端权限有什么不同”“怎么证明你理解 AI 生成的代码”。

## 17. 后续搭子模块：保留想法，不混入首版

### 17.1 产品范围

本地活动可以包括购物、足球、聚餐、海边、周末出行和多日旅游。普通人不需要买商家活动才能组队；商家活动是可选关联。

主线：发布活动 → 邀请朋友或接受申请 → 确认成员 → 协调时间地点 → 活动举行/取消。

先做熟人邀请或受邀试用，验证大家是否真的愿意用它组织活动；再决定是否开放附近陌生人发现。首版社交功能也必须包含基本举报、屏蔽和信息可见范围。

“找人一起购物”与“匹配司机带人购物”是不同业务范围。交通撮合、费用分摊、保险及当地上线要求需另作评估，不在当前承诺中。

### 17.2 和预约系统怎么连接

未来新增 `group_events`、`group_members`、`group_applications` 等独立模型，不把当前商品 Activity 改成包含所有社会活动的巨大通用表。

通过可选关联表将组队活动和商家场次/预约连接。加入组不等于获得商家名额；退组不自动取消付费订单。订单仍有独立权限及状态，不能因为“同一个小组”就把他人的联系方式或订单详细信息公开。

是否另起 App 的决定等到验证用户需求后：同一受众、同一路径时可在同一网站增加 `/groups`、`/trips`；若受众、运营方式和产品定位明显不同，再评估独立品牌/客户端。现在只保持模块边界，不承诺未来完全零重构。

## 18. 多人 AI 行程与地图：可行的后续实现

### 18.1 一个明确使用场景

三个已认识的人计划三天出行：一人喜欢摄影，一人关心餐饮，一人希望路程轻松。各自填写可用日期、出发/返回地点、预算、必去/不去项目和每日交通时间上限。

系统先识别共同条件与冲突。预算不一致时展示冲突和选项，不偷偷忽略某人的上限。不可协调的硬性条件需要人选择妥协，而不是生成一个声称全都满足的假计划。

### 18.2 四部分分工

| 部分 | 负责什么 | 不应做什么 |
|---|---|---|
| AI | 理解偏好、推荐组合、解释取舍、生成结构化草稿 | 编造经纬度、实时价格、空房或可靠性保证 |
| 地点/商家数据 | 找到真实景点、餐厅和住宿，读取允许的详情 | 把普通地点资料当可预订库存 |
| 规则与校验代码 | 检查时间冲突、预算、开放时间已知约束和每日交通上限 | 只因模型输出格式正确就直接发布 |
| 地图/路线服务 | 路段、距离、预计耗时、地图线路 | 把 AI 生图或直线连点当作可靠导航 |

Google Places API 可用于查找地点及请求地址、营业时间等详情；Routes API 可计算多地点行程的路段和交通时间；Maps JavaScript API 可在地图上绘制线段与路径。[S15][S16][S17]

这些能力支撑实现，不代表实时数据必然完整，也不保证某种交通模式在任何地区均可用。先只支持一个区域、驾驶、一至三天、小量停靠点。多日偏好规划不是一个路线 API 调用就能解决；程序还需要检查每日时间窗、停留时间和预算，产出可行方案而不声称全局最优。

### 18.3 数据流程

```text
成员分别填写偏好
       ↓
合并硬性条件 + 展示冲突
       ↓
查找有来源的景点、餐饮、住宿候选
       ↓
AI 生成逐日结构化草稿（使用候选 ID）
       ↓
路线 API 计算各路段 → 程序核对开放时间/时间预算/交通上限
       ↓
无法满足时修改候选或请求用户选择，不无限重试
       ↓
时间线 + 每日地图 + 费用说明 + 未知信息提示
       ↓
成员编辑、投票、确认某一版本
```

住宿先做候选推荐及外部查看入口，不承诺空房、真实总价或自动预订。要显示可购买报价，需要另接合规的供应商报价/库存接口并处理条款。餐厅推荐同样不等于已经订座。

页面显示数据来源、查询时间、哪些价格只是估算，以及哪些开放信息待确认。临近出行再核对天气、关闭/道路情况；不能把以前生成的路线当作当前安全保证。

### 18.4 地图和存储边界

真正路线图由路线数据和地图 SDK 展示，不用图片生成模型画一张看似路线的图。用户可查看每天停靠点、顺序、路段与预计交通时间；没有可用路段时明确提示，而不是用直线假冒道路。

Google Places 对内容存储/缓存和署名有要求，place ID 有特定存储例外；若采用该供应商，应按其政策实现，不默认把所有地点数据永久复制到自己的数据库，也不混用不符合条款的地图展示。[S18]

未来可保存用户偏好、行程版本、用户选定的停靠点 ID 和人工编辑记录；第三方内容的保留方式单独检查。密钥按用途和来源限制；生成次数及候选数量受预算限制。

### 18.5 最小实验

第一步仅让三个朋友输入偏好，生成一份可编辑的 1–3 天行程和地图。不要求陌生人匹配、不要求在线酒店预订、不做自动支付。确认这个实验真的可用之后，才设计更大平台。

## 19. Codex 执行规则

项目计划是约束，不是“请一次生成全部未来功能”。代码代理先检查仓库和现有版本，再提出本阶段改动，不覆盖用户已有文件。

每次只做一个里程碑。需要密钥时列出变量名及操作步骤，不让用户把密钥贴进仓库；不得擅自创建付费资源、执行生产数据库重置、删除已有数据、发送真实客户邮件或提交真实支付。

每个任务完成后报告：修改文件、关键设计、实际运行的命令、通过/失败结果、尚未验证的内容和下一步。测试没运行就明确说没运行，不能写“全部通过”。不能用大量 mock 绕过核心 PostgreSQL 测试。

使用者本人要检查并能解释：身份边界、预约事务、幂等、取消、价格和时区。AI 可以加速，但不能用生成代码代替对这些关键部分的理解。

**下一步仅做 M0：初始化、范围文件、CI 骨架和最小部署；不开始社交、地图或支付。**

## 20. 官方技术依据

以下为制定计划时核验的官方资料，访问日期 2026-09-24。链接支持技术能力及约束；具体产品范围、schema、时长和验收阈值是本计划的设计选择。

- [S01] Next.js Backend for Frontend：`https://nextjs.org/docs/app/guides/backend-for-frontend`
- [S02] Supabase Next.js SSR authentication：`https://supabase.com/docs/guides/auth/server-side/nextjs`
- [S03] Supabase + Prisma：`https://supabase.com/docs/guides/database/prisma`
- [S04] PostgreSQL Date/Time Types：`https://www.postgresql.org/docs/current/datatype-datetime.html`
- [S05] PostgreSQL Explicit Locking：`https://www.postgresql.org/docs/current/explicit-locking.html`
- [S06] BullMQ Idempotent Jobs：`https://docs.bullmq.io/patterns/idempotent-jobs`
- [S07] BullMQ Retrying Failing Jobs：`https://docs.bullmq.io/guide/retrying-failing-jobs`
- [S08] OpenAI Structured Outputs：`https://developers.openai.com/api/docs/guides/structured-outputs`
- [S09] OpenAI Evaluation Best Practices：`https://developers.openai.com/api/docs/guides/evaluation-best-practices`
- [S10] OpenAI ChatGPT/API billing：`https://help.openai.com/en/articles/9039756-managing-billing-for-chatgpt-and-the-api-platform`
- [S11] Render Next.js deployment：`https://render.com/docs/deploy-nextjs-app`
- [S12] Render Background Workers：`https://render.com/docs/background-workers`
- [S13] Render Key Value：`https://render.com/docs/key-value`
- [S14] Stripe Testing / Webhooks：`https://docs.stripe.com/testing`；`https://docs.stripe.com/webhooks`
- [S15] Google Places API overview：`https://developers.google.com/maps/documentation/places/web-service/overview`
- [S16] Google Routes API overview：`https://developers.google.com/maps/documentation/routes/compute-route-over`
- [S17] Google Maps JavaScript shapes/lines：`https://developers.google.com/maps/documentation/javascript/shapes`
- [S18] Google Places policies：`https://developers.google.com/maps/documentation/places/web-service/policies`
