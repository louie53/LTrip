# Figma 交付状态

文件：https://www.figma.com/design/aQDty1cdlzrc8bZuhajz9f

2026-09-24：已形成可审阅的 M0 首页可编辑 Figma 文件。用户已确认视觉方向与概念风景图；具体页面规格仍可细化，不代表应用实现或 M0 验收完成。

## 已确认的设计方向

用户接受「暖白＋深绿＋海岸大图」，喜欢简洁风格，要求后续沿用这一方向，并同意保留现有概念风景图。后续以留白、清晰层级及必要内容为主，保留图片的 **AI-generated concept image** 标注。此确认仅覆盖视觉方向与图片，不将未完成的原型、组件接入或应用实现记为已验收。

本次只同步本地设计记录；Figma 画布内的旧评审状态尚未更新，以本记录为最新依据。

## 已保存并检查

- `01 · Homepage`：1440px 桌面画板（2:2）、390px 手机画板（13:2）及封面说明。文字、图片填充和布局为原生可编辑图层；根画板具有 Auto Layout。临时空画板及重复导入已清理。
- `02 · Styles & components`：64 个变量、18 个文字样式、基础样式说明（8:2）；Header / Desktop 主组件、Demo notice 的 Desktop / Mobile 两个 Device 变体、Preview status 主组件。
- `03 · Handoff`：可编辑文字与 Auto Layout 容器，说明范围、响应式尺寸、字体、真实锚点、编辑方式和验收要求。
- 在普通 Figma 编辑器完成桌面、手机、声明组件和交接页的视觉检查；手机声明完整换行，状态提示和图片说明保留。默认画面隐藏 Skip to content，网页实现仍要求键盘聚焦时显示。
- 五处导入后显示为彩色 emoji 的箭头由 `↘` 统一替换为 `↓`，仅修改 Figma 文件。

## 明确限制

当前是可编辑视觉稿，尚无 Figma 点击原型连线；网页中的同页锚点不会自动成为 Figma 原型。页面图层尚未替换成库中组件的实例，也没有完整的 Hover / Focus 组件状态集。不得称为完整交互原型或已贯通的组件系统。

Starter 计划触发 Figma MCP 工具调用上限后，改用正常 Figma 编辑界面完成手机导入、字体替换、基础组件、画板整理与交接页；没有升级或支付。

字体差异：原静态稿为 Georgia / Arial，Figma 工具环境无法加载；已告知用户 Figma 版采用 Lora / Arimo。原网页未修改。

记录差异：state.json 与各 *-result.json / foundations-success.json 记录工具执行阶段；components.js 未执行成功。随后正常 UI 创建的组件以实际画布为准，不得盲目重跑脚本或重复创建文件。

Figma 交付阶段只修改 docs/design/ 内交付资料及上述 Figma 文件。未运行应用 lint、typecheck、unit、build 或 /api/health 检查；这些不是设计文件编辑的验证结果。原网页的静态检查记录见 ../v1/design-notes.md。当前已记录用户的方向确认；后续待明确分配下一小步，不自动开始应用实现或后续里程碑。
