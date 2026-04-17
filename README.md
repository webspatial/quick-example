# Playground 1: Waterfall Gallery (瀑布流图片墙)

## 中文

这是一个「图片瀑布流 + 左侧分类导航 + 点赞交互」的基础项目，重点用来练习：
- 常见业务页面结构（Nav + Masonry + Card）
- 在 DOM 元素上做 WebSpatial 的空间化（`enable-xr` + CSS 变量）

### 运行

- `pnpm install`
- `pnpm dev`
- (Optional) `pnpm dev:webspatial`

### 入口位置

- Main page: `src/pages/main/App.tsx`
- Nav component: `src/pages/main/component/Nav.tsx`
- Image card: `src/pages/main/component/ImageCard.tsx`
- Styles: `src/pages/main/**/*.css`

### 新手任务（WebSpatial）

#### 任务 1：让一个卡片空间化

- 找到卡片节点（例如 `.tile` 或你自己的卡片容器）
- 给它加上 `enable-xr`
- 逐步调大深度距离（与父级的 back offset）：
  - 例如给样式加 `style={{ '--xr-back': 60 }}`
  - 或者在 CSS 里设置 `--xr-back: 60;`

#### 任务 2：尝试改背景材质（页面整体 vs 单个卡片）

- 给页面根容器或某个空间化元素尝试设置：
  - `--xr-background-material: translucent`
  - `--xr-background-material: transparent`

#### 任务 3：做一个小改造

- 把点赞按钮做成「空间按钮」：给按钮加 `enable-xr` 并设置一个较小的 `--xr-back`（例如 10~30）
- 或者让左侧导航整体空间化，并给它更大的圆角（`borderRadius`）

## English

This playground is a basic gallery page with a category sidebar, a waterfall (masonry-like) layout, and a like button. It is designed to practice:
- Typical app layout (Nav + Masonry + Card)
- Spatialized DOM in WebSpatial (`enable-xr` + CSS variables)

### Run

- `pnpm install`
- `pnpm dev`
- (Optional) `pnpm dev:webspatial`

### Where to Look

- Main page: `src/pages/main/App.tsx`
- Nav component: `src/pages/main/component/Nav.tsx`
- Image card: `src/pages/main/component/ImageCard.tsx`
- Styles: `src/pages/main/**/*.css`

### Beginner Tasks (WebSpatial)

#### Task 1: Spatialize a card

- Pick a card node (e.g. `.tile` or your card wrapper)
- Add `enable-xr`
- Gradually increase the back offset (depth distance from its parent):
  - e.g. `style={{ '--xr-back': 60 }}`
  - or set `--xr-back: 60;` in CSS

#### Task 2: Try materials (page-level vs element-level)

- Try setting on the page root or a spatialized element:
  - `--xr-background-material: translucent`
  - `--xr-background-material: transparent`

#### Task 3: Small refactor

- Make the like button a spatial button: add `enable-xr` and a small `--xr-back` (e.g. 10–30)
- Or spatialize the whole sidebar and increase its `borderRadius`


# Playground 2: Reaction Game (反应力小游戏)

## 中文

这是一个 60 秒的反应力小游戏。基础的倒计时/计分/开始停止逻辑已经具备，核心练习方向是：
- 把 DOM 版本升级为 WebSpatial 的 `Reality` + `Entity` 组件形态
- 在 3D 场景中尝试更多不同类型的 entity，并绑定空间交互事件

### 运行

- `pnpm install`
- `pnpm dev`
- (Optional) `pnpm dev:webspatial`

### 入口位置

- 入口：`src/pages/game/index.tsx`
- 游戏 UI/逻辑：`src/pages/game/game.tsx`
- 方块随机布局：`src/pages/game/component/blocks.ts`

### 规则

- 60 秒倒计时
- 3 个方块：2 红 (bad) + 1 绿 (good)
- 每秒自动随机一次
- 点击任意方块会立刻随机
- 绿：+3 分，红：-1 分

### 新手任务（WebSpatial）

- 任务 1：调参做“难度曲线”（方块数量/尺寸/移动频率/得分）
- 任务 2：把 DOM 场景替换为 `Reality`（`SceneGraph` + `BoxEntity` + 空间交互事件替换 click）
- 任务 3：尝试多种 entity 类型（例如文字、面板、模型等）并绑定 hover/tap，观察命中与事件分发

## English

This is a 60-second reaction game. The basic timer/scoring/start-stop flow is already implemented. The main practice goals are:
- Upgrade the DOM version into a WebSpatial `Reality` + `Entity` component architecture
- Experiment with more entity types in a 3D scene and bind spatial input events

### Run

- `pnpm install`
- `pnpm dev`
- (Optional) `pnpm dev:webspatial`

### Where to Look

- Entry: `src/pages/game/index.tsx`
- Game UI/logic: `src/pages/game/game.tsx`
- Random layout: `src/pages/game/component/blocks.ts`

### Rules

- 60-second countdown
- 3 blocks: 2 red (bad) + 1 green (good)
- Blocks reposition every second
- Clicking any block repositions immediately
- Green: +3 points, Red: -1 point

### Beginner Tasks (WebSpatial)

- Task 1: Create a difficulty curve (count/size/move interval/scoring)
- Task 2: Upgrade to `Reality` (`SceneGraph` + `BoxEntity` + replace clicks with spatial input)
- Task 3: Try more entity types (text, panels, models, etc.) and bind hover/tap to observe hit-testing and event behavior
