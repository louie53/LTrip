# LocalTrip 首页 Figma 交接

日期：2026-09-24。依据 `../v1/home.html` 与 `../v1/design-notes.md`。桌面、手机画板已整理并视觉检查；Figma 内已有基础样式、页头组件、声明条设备变体、预览状态组件及交接页。页面尚未接入组件实例，交互原型未连线；变量绑定未逐节点审计。用户已确认视觉方向与概念风景图，具体页面规格仍可细化；不代表应用实现或 M0 验收完成。准确交付状态见 `STATUS.md`。

已确认的后续视觉约定：暖白背景、深绿文字、海岸大图，保持简洁，优先留白与清晰层级，保留现有概念风景图及其 AI 标注。后续设计沿用此方向；本次认可不自动授权应用实现或扩大 M0 范围。

本稿仅为 M0 最小首页：演示声明、品牌导航、主视觉、当前状态、About、页脚。保留虚构新西兰单运营商定位；不增加活动、库存、评价、价格、登录、预约或后台功能。唯一交互为同页锚点，不使用假按钮。

顶部必须原样显示：**Portfolio demo — reservations are simulated. No payment is collected.** 状态区域保留 **Website preview** 与 **Activities and reservations are not yet available.** About 明示不提供真实服务；海岸图片旁保留 **AI-generated concept image**，不暗示真实目的地或场次。

桌面画板宽 1440px，内容最大宽 1200px；主视觉双列、间距 72px。手机画板宽 390px，内容宽 342px、左右留白 24px。≤760px 改为单列，主视觉间距 32px；≤359px 留白 20px。页面高度随内容增长，声明允许换行；手机图片比例约 1.25:1。

背景 `#F8F7F1`，主字／演示条 `#173E35`，次字 `#52635B`，状态底色 `#E9EDE3`，分隔线 `#D6DCD1`。Figma 以 Lora 替代 Georgia 标题、Arimo 替代 Arial 正文；这是设计文件的字体适配，不自动改变应用字体方案。换字后需复核字宽、换行和行高。原稿 H1 桌面 80px、390px 手机约 50px；主介绍分别为 18px、16px。文字保持可编辑，图片单独保留。

About LocalTrip 与 Meet LocalTrip 指向 `#about`；品牌指向 `#top`；Skip to content 指向 `#main`。开发保留语义标题、图片替代文本及跳过导航。链接点击区域至少高 44px；键盘焦点为 3px `#A24823` 实线、外偏移 6px，无动画。

验收时检查 Figma 两个画板的完整内容、可编辑文字、图片裁切及字体替换结果。用户批准并进入实现后，PM 再打开真实 Next.js 首页，对照 1440／390px，确认 320px 无横向溢出、Tab 与锚点正常、焦点清楚、控制台无错误；核对 `/api/health` 并运行 lint、typecheck、unit、build。此前静态稿检查不能替代应用检查、真机测试或最终验收。
