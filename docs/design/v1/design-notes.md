# LocalTrip 首页设计第一稿

状态：**视觉方向与概念风景图已获用户确认**；具体页面规格仍可细化，不代表应用实现或 M0 验收完成。
日期：2026-09-24（Pacific/Auckland）。本轮只写 `docs/design/v1/`。

## 查看产物

- `overview.png`：桌面与手机并排总览。
- `desktop.png`：桌面完整图，1440px 浏览器视口。
- `mobile.png`：手机完整图，390px 浏览器视口。
- `home.html`：单份响应式静态设计稿；可以直接用浏览器打开，不依赖应用、数据库或 npm。
- `review.html`：固定尺寸双视图评审板。
- `assets/coast-concept.png`：本轮内置 imagegen 生成的概念海岸图。
- `image-prompt.txt`：生成时的完整提示词。
- `qa/`：窄屏、平板、键盘焦点截图与浏览器快照。

如需本地 HTTP 预览：

```sh
python3 -m http.server 4175 --bind 127.0.0.1 --directory /Users/louieliu/Desktop/LTrip/docs/design/v1
```

然后访问 http://127.0.0.1:4175/home.html 。这是设计文件的本地静态预览，不是 Next.js 应用启动或公开部署。

## 视觉方向

2026-09-24 用户确认：接受「暖白＋深绿＋海岸大图」，偏好简洁风格，后续设计沿用这一方向，并保留现有概念风景图。

后续设计约定：以留白、清晰层级和少量必要内容为主；延续暖白背景与深绿文字，用海岸图片提供氛围，保持装饰与动画克制。这是视觉方向确认，不扩展当前 M0 范围，也不自动授权下一步实现。

暖白纸色、深松绿色文字、单张自然海岸图，配衬线大标题与朴素的无衬线正文。页面希望传达“小运营商、轻松的一天、关注本地”的感觉。留白与图片承担视觉氛围，避免靠虚构库存、评价或大量模块充实页面。

风景是 AI 生成的概念素材，图片旁明确标注 **AI-generated concept image**；不声称对应某个真实目的地、路线或运营场次。图片不承载业务文案，所有英文均为可选择、可读的 HTML 文字。

## 页面层级

1. 顶部深色条：原样展示 **Portfolio demo — reservations are simulated. No payment is collected.**
2. 简洁页头：LocalTrip 品牌与 About LocalTrip 页面内链接。
3. 主视觉：Good days, close to home.；简短介绍；Meet LocalTrip 页面内链接。
4. 当前状态：Website preview；**Activities and reservations are not yet available.**
5. About：介绍虚构单运营商和作品项目性质，并声明不提供真实活动或服务。
6. 简短页脚：品牌、New Zealand、个人作品标识。

M0 没有活动卡片、价格、名额、评论、登录、工作人员入口或预约按钮。没有承诺发布日期。唯一交互是同页跳转。

## 为什么适合当前项目

- 最小首页可以介绍定位，同时准确表达当前进度。
- 不把后续 V1 的功能误画成已经可以使用。
- 桌面双列、手机单列，一份内容自然重排；实现成本集中在普通排版与一张图片。
- 原生链接即可完成交互，不需要前端状态、复杂动画或额外组件库。

## 交付给开发的设计参数（待批准）

| 项目 | 提案 |
| --- | --- |
| 页面背景 | #F8F7F1 |
| 主文字／演示条 | #173E35 |
| 次要文字 | #52635B |
| 状态底色 | #E9EDE3 |
| 分隔线 | #D6DCD1 |
| 键盘焦点 | #A24823，3px 实线，6px 外偏移 |
| 字体 | Georgia 标题；Arial / Helvetica 正文，不加载外部字体 |
| 桌面内容 | 最大 1200px，主视觉两列，72px 间距 |
| 手机内容 | 760px 及以下单列，主要左右留白 24px |
| 极窄屏 | 359px 及以下留白 20px、进一步收紧标题 |
| 正文 | 桌面主介绍 18px；手机 16px；说明段落 15–16px |
| 图片 | 桌面固定比例区域裁切；手机约 1.25:1，顶部左角弧线 |
| 导航与链接 | 至少 44px 高的点击区域；Tab 显示焦点 |
| 动画 | 无 |

设计稿用原始 PNG 便于评审。若用户批准进入实现，图片应转换为适当网页格式并验证加载尺寸；本轮没有进行应用集成或性能验收。

## 实际验证

环境：Playwright CLI 的 Chromium 桌面浏览器；手机图为响应式视口模拟，并非真机测试。

| 检查 | 实际结果 |
| --- | --- |
| 仓库检查 | 已读 AGENTS、PROGRESS、启动说明、701 行原计划；project-plan 与原计划 cmp 一致；既有文件保留 |
| 本地设计预览 | Python HTTP server，仅监听 127.0.0.1:4175；页面与本地图片均返回成功 |
| 可见排版 | 已打开并查看 1440px 桌面、390px 手机、320px 窄屏、768px 平板截图 |
| 溢出 | 320 / 390 / 760 / 768 / 1024 / 1440px 检查均无横向溢出 |
| 浏览器控制台 | 0 errors、0 warnings |
| 键盘 | Tab 显示 Skip to content；Enter 焦点移到 main；下一次 Tab 到 Meet LocalTrip；Enter 移到 about |
| 焦点样式 | 实测 3px #A24823 outline；已保存截图并目视确认 |
| 演示与状态文案 | 与要求一致；明确尚无活动或预约 |
| 对比度计算 | 主字／纸色 11.01:1；次字／纸色 5.94:1；次字／状态底色 5.37:1；焦点／纸色 5.61:1 |
| 独立只读审查 | 文案、范围和语义审查未发现阻塞问题 |
| 应用检查与 /api/health | 未运行，本轮未修改应用 |
| npm ci / lint / typecheck / test:unit / build | 未运行，本轮为独立设计产物 |
| 真机／跨浏览器／读屏器 | 未运行，不能将本轮结果称为完整无障碍认证 |
| 远程 CI／部署 | 未运行／未进行 |

执行的主要命令：

```sh
git status --short
cmp docs/project-plan.md docs/travel_booking_project_plan_v1.md
python3 -m http.server 4175 --bind 127.0.0.1 --directory /Users/louieliu/Desktop/LTrip/docs/design/v1
bash /Users/louieliu/.codex/skills/playwright/scripts/playwright_cli.sh -s=localtrip-design-v1 open http://127.0.0.1:4175/home.html --headed
# 同一会话继续使用 resize、snapshot、screenshot --full-page、press、eval、console、run-code。
```

验证过程中的已解决工具问题：首次 run-code 没有使用函数包装而报语法错误；修正后发现页面处于 about:blank，重新导航后完成六个宽度与键盘检查。这些失败没有通过修改页面断言或关闭校验来规避。浏览器在部分全页截图中不包含 15px 滚动条区域，因此导出图像宽度可能略小于指定视口宽度。

## 后续开发如何验收

用户批准设计后，由实现对话在另一个明确授权步骤中落实。验收应由 PM 打开真正运行的 Next.js 首页：

1. 在 1440px 和 390px 对照设计，核对层级、留白、图片裁切和换行；320px 下无横向滚动。
2. 原样显示演示声明；清楚显示活动与预约尚不可用；没有假库存或不能兑现的操作。
3. Tab 顺序合理、焦点可见、跳过导航可用；手机正文可读，链接容易点按。
4. 检查浏览器控制台和 /api/health；执行项目约定的 lint、typecheck、unit、build，并记录实际结果。
5. 静态设计图不能替代运行页面验收，用户未确认前不能视为设计已批准。

## 用户确认与下一步边界

- 已确认：暖白＋深绿＋海岸大图、简洁风格、保留现有 AI 概念风景图。
- 后续细化沿用这一视觉方向。用户尚未单独确认具体标题、字体替换和全部页面细节，不把方向认可扩大为整份规格或 M0 验收通过。
- 本次仅同步设计记录，不改应用、不自动开始下一实施步骤。完整交付现状与未完成项见 `../figma/STATUS.md`。

历史记录：最初静态首稿交付时仅写 `docs/design/v1/`，未创建 Figma 文件、提交、推送或公开发布；后续按用户要求创建了 Figma 文件。此次方向确认也未修改 src、依赖、AGENTS、README、PROGRESS 或源计划。文档检查采用 `git diff --check`；本次未运行应用检查。
