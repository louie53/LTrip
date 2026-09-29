# M0：从 React 前端走到全栈项目

本轮先理解一个页面如何由 Next.js 提供，以及怎样证明它可运行。登录、数据库和预订事务留到后续阶段。

## 从这些文件开始读

| 文件 | 负责什么 | 阅读时关注 |
|---|---|---|
| `src/app/layout.tsx` | 所有页面共享的 HTML 外壳与页面元信息 | `children` 是页面内容；根布局提供语言和共享样式 |
| `src/app/page.tsx` | `/` 首页 | 文案、语义结构和样式；演示信息必须清楚 |
| `src/app/globals.css` | Tailwind 入口和全局样式 | 字体、颜色、基础间距与窄屏表现 |
| `public/images/coast-concept.png` | 首页本地海岸概念图 | 由 `next/image` 静态导入；页面明确标注 AI 生成 |
| `src/app/api/health/route.ts` | `/api/health` 的 HTTP 响应 | 一个 GET 请求怎样返回状态码、响应头和 JSON |
| `package.json` | 依赖与可运行命令 | 每个脚本检查的对象不同 |
| `package-lock.json` | 精确的依赖解析结果 | 与源码一起保留，使其他机器可重复安装 |
| `.github/workflows/ci.yml` | 提交后自动检查的配置 | 远程执行与本地执行是两条各需证据的记录 |

## 需要掌握的核心概念

**App Router 按文件组织路由。** `app/page.tsx` 对应首页，`app/api/health/route.ts` 对应健康检查 API。`layout.tsx` 为子页面提供共享结构；不用自己创建一个集中列出全部 URL 的路由表。

**React 组件不一定只在浏览器运行。** App Router 的页面和布局默认是 Server Components，可以在构建时或服务器渲染时执行。需要 `useState`、点击事件或浏览器 API 的交互部分才使用 `"use client"`。当前纯展示首页不需要为了熟悉的 React 写法而把整页变成 Client Component。未来服务器可访问私有配置和数据库，但任何传给浏览器的内容仍需自己控制，Server Component 不是自动授权。[Next.js 组件边界](https://nextjs.org/docs/app/getting-started/server-and-client-components)

**设计稿需要接入应用，才能成为网站页面。** 本次将 `docs/design/v1/home.html` 的暖白、深绿和海岸大图接入首页，保留 Georgia 标题与 Arial 正文字体栈，不需要下载外部字体。海岸图通过 `next/image` 静态导入本地文件；`sizes` 描述不同视口下图片的显示宽度，帮助浏览器选择合适资源，`preload` 让首屏主图提前加载。实际裁剪和排版由 CSS 控制，仍需浏览器验收。图片旁的 AI 标注说明素材性质；页面链接只是同页锚点，不会发起预约。

**页面和 API 是不同的输出。** 页面输出用户可浏览的界面；Route Handler 处理 HTTP 请求并返回数据。`GET /api/health` 成功只能说明这条应用请求能得到响应，不能证明尚未实现的认证、数据库或预订功能正确。

**TypeScript 不会替你检查外部输入。** 类型检查在运行前发现代码中的类型矛盾；用户提交的 JSON 仍可能无效。后续预约 API 必须在运行时验证人数、价格意图和权限，即便前端也使用 TypeScript。

**锁文件解决“装到什么”，CI 解决“每次如何检查”。** `package.json` 表达直接依赖和脚本，锁文件记录完整依赖解析；`npm ci` 按锁文件安装。GitHub Actions 将相同检查放到新的机器执行。写好 workflow 不等于它已在 GitHub 运行。

**开发服务、检查和构建各有分工。** `npm run dev` 便于改代码后立即看到更新；lint 找代码规则问题，typecheck 查静态类型，unit test 检查具体行为，build 生成生产产物。`npm run start` 使用已生成的产物。开发模式能打开，不代表生产构建一定成功；这些步骤都需要实际记录结果。

## 手动验收步骤

先按 README 安装并启动开发服务。默认地址是 `http://localhost:3000`；如果终端提示使用了其他端口，以终端为准。

1. 打开首页，确认标题、LocalTrip 名称、演示声明和 `AI-generated concept image` 标注可见；没有声称可以完成真实预约或付款。
2. 将窗口缩小到约 375px，再扩大到桌面宽度；文字不溢出、内容不被遮挡、无意外横向滚动，海岸图片正常加载且裁剪适合当前宽度。
3. 用 `Tab` 浏览可交互元素；焦点应清楚可见。检查跳过导航、品牌和介绍链接分别到达本页主内容、顶部和 About 区域，不应跳到不存在的预订页面。
4. 直接打开 `/api/health`，在浏览器网络面板确认 HTTP 200 及 JSON 响应；不能含环境变量、连接串或其他秘密。
5. 打开浏览器控制台，检查是否存在应用错误；刷新首页应正常显示。
6. 停止开发服务，执行 `npm run build`，再执行 `npm run start -- --hostname 127.0.0.1`，重复首页与健康检查。这一步验证生产启动路径。

以上为人工检查方法，完成后才把结果写入 [PROGRESS.md](./PROGRESS.md)。没有执行的步骤应标注“未运行”，不能默认通过。

## 能自己讲清楚就足够

读完代码后，尝试解释：访问 `/` 与 `/api/health` 分别运行哪个文件？为什么首页目前不用 `"use client"`？为什么 build 成功不等于预约功能正确？为什么 `.env.example` 能进入仓库，而真实密钥不行？下一阶段才开始回答数据库、认证和权限问题。
