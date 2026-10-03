# AIHub 项目交接文档

> 交接时间：2026-10-03
> 交接人：Claude（上一轮工作于 2026-08-26 ~ 08-31 完成）
> 接手：Gemini
> 站点：https://zorixdev.xyz/

---

## 0. 一句话说明

**AIHub** 是一个中文的 **AI 工具索引站**：把 AI 模型、API 中转站、编程/图像/视频工具整理成一本可以"翻阅"的编辑式目录。纯静态单页，面向中文开发者与 AI 从业者。

---

## 1. 关键路径（先记这个）

| 项 | 值 |
|---|---|
| **项目根目录** | `C:\Users\16534\Desktop\Mine\claude\aihub-tools-index` |
| **旧路径**（已迁移，勿用） | `C:\Users\16534\aihub-tools-index` |
| **GitHub 仓库** | `git@github.com:Zorix666/zorixdev.xyz.git`（SSH，main 分支） |
| **旧仓库**（已废弃） | `https://github.com/aj5364351-spec/aihub-tools-index.git` |
| **线上域名** | https://zorixdev.xyz/ |
| **托管** | Cloudflare Pages，项目名 `aihub` |
| **Cloudflare 账号** | aj5364351@gmail.com |
| **GSC / Bing 账号** | zorix.314@gmail.com |

> ⚠️ **注意**：仓库在 8/31 之后被迁移过 —— 换了 GitHub 账号（→ Zorix666）、换了协议（HTTPS → SSH）、且**git 历史被重置为单个 commit**（`840e18f feat: initial commit for zorixdev.xyz`）。因此**旧的 commit hash 全部失效**，不要再引用。

---

## 2. 部署架构（最容易搞错的地方，务必先读）

### 2.1 两层结构

```
docs/          ← 源文件层（放"源头" HTML）
  ├─ index-anthropic-refined.html   ← **主页的源文件**
  ├─ index.html / index-v2.html / index-anthropic.html  ← 3 个历史版本（已加 canonical，非主页）
  ├─ shared/data.js                 ← **数据源**（所有工具条目都在这）
  ├─ sitemap.xml
  ├─ robots.txt
  └─ f5cc4e95498cfeef935a8ea09f169e38.txt   ← IndexNow key

dist/          ← **部署层**（Cloudflare Pages 实际发布的目录）
  ├─ index.html                     ← = docs/index-anthropic-refined.html 的镜像
  ├─ shared/data.js
  ├─ sitemap.xml
  ├─ robots.txt
  └─ f5cc4e95498cfeef935a8ea09f169e38.txt
```

### 2.2 三条铁律

1. **Cloudflare Pages 的输出目录是 `dist/`。** 改 `docs/` 不会自动上线，必须同步到 `dist/`。

2. **`dist/index.html` 必须与 `docs/index-anthropic-refined.html` 逐字符一致。** 这俩是镜像关系，历史上一旦漂移就会出问题。改完务必验证：
   ```bash
   diff -q dist/index.html docs/index-anthropic-refined.html && echo "IDENTICAL ✓"
   ```

3. **站是 SPA fallback 行为** —— 任何未匹配的路径都返回 `index.html`。所以 `sitemap.xml`、`robots.txt`、IndexNow key **必须是真实存在的文件**放在 `dist/` 里，否则会被 fallback 成 HTML（这个坑踩过：sitemap 曾返回主页 HTML）。

### 2.3 部署方式

- Cloudflare Pages 连接 GitHub 仓库，**推送到 main 自动构建部署**（用户已授权此连接）。
- ⚠️ **待核实**：仓库迁移到 `Zorix666/zorixdev.xyz` 之后，Cloudflare Pages 的 Git 连接**是否已重新指向新仓库**？如果没重连，推代码不会触发部署。**接手第一件事请先确认这个**（Cloudflare Pages → aihub → Settings → Builds & deployments → Git repository）。

### 2.4 本地构建

`package.json` 里是个 React/Vite 脚手架（`npm run build` = `tsc -b && vite build`），**但真正部署的不是它** —— 真正上线的是 `dist/` 里的纯静态 HTML。别被这个 package.json 误导，**不要试图构建 Vite 项目来部署**。

---

## 3. 数据源

**唯一数据源**：`docs/shared/data.js`（也需同步到 `dist/shared/data.js`）

结构：
```js
window.AIHUB_DATA = {
  meta: { totalCategories: 5, updated: "2026-06-27" },
  categories: [
    { id, index, name, en, kicker, desc, items: [ { name, url, note, tier } ] },
    ...
  ]
}
```

**当前实际数据**：**81 个条目 / 5 个分类**

| # | 分类 | id | 条目数 |
|---|---|---|---|
| 01 | API 中转站 | relay | 27 |
| 02 | 官方模型平台 | official | 18 |
| 03 | AI 编程 | code | 17 |
| 04 | 图像生成 | image | 15 |
| 05 | 视频生成 | video | 4 |

> ⚠️ 文件顶部注释写着"来自 aihub-stations-urls.txt，**350+ 条目收敛**"—— 那指的是**原始清单规模**，不是页面收录数。**页面实况是 81 条**。这个数字口径曾经出过大问题，见第 5 节。

---

## 4. 已完成的工作（截至 2026-10-03）

### 4.1 设计与排版
- ✅ 中文字体修复：原始版本中文回落到 SimSun/宋体（丑）。已改为 `Source Serif 4` + `Noto Sans SC` / `Noto Serif SC` 字体栈
- ✅ 卡片字体加大、描述颜色加深（`#3d3d3a`）
- ✅ 卡片 i18n 补完（中英切换完整）

### 4.2 功能
- ✅ 筛选功能（位于分类栏下方、API 中转站右侧）：价格/类型 + 模型 + 目录，三组筛选 chips
- ✅ 中英文切换（`document.documentElement.lang` 跟随切换）
- ✅ 搜索框（带 Enter 提示）

### 4.3 数据
- ✅ 新增 11 个工具 + `video`（视频生成）分类
- ✅ 删除 4 个死链：Leits API、DuckCoding、AnyRouter、七牛云 AI
- ✅ `88code` 链接修正 → `https://88code.ai`

### 4.4 SEO（都已上线验证）
- ✅ `<html lang="zh-CN">`
- ✅ `<link rel="canonical" href="https://zorixdev.xyz/" />`
- ✅ JSON-LD 结构化数据（`@type: WebSite`，`inLanguage: zh-CN`）
- ✅ title：`AIHub — AI 工具索引 | 80+ 精选模型与 API 导航`
- ✅ meta description
- ✅ `sitemap.xml`（真实文件，仅含主页）+ `robots.txt`（Allow all + Sitemap 指令 + AI 爬虫友好）
- ✅ 3 个历史版本页面也都加了 canonical 指向主页

### 4.5 收录推广
- ✅ **Google Search Console**：DNS 方式验证域名所有权（通过 Cloudflare DNS）、提交 sitemap、**已请求主页重新索引**
- ✅ **Bing Webmaster Tools**：从 GSC 导入、sitemap 已提交
- ✅ **IndexNow**：key = `f5cc4e95498cfeef935a8ea09f169e38`，key 文件已上线（返回 `text/plain`），已向 `api.indexnow.org` 提交主页 + sitemap（HTTP 200）

### 4.6 口径修复（重要）
- ✅ **标题/描述/JSON-LD 从 "350+" 改为 "80+ 精选"**（之前夸大 4 倍，与页面实况 81 条矛盾）
- ✅ hero 副标题 `fourteen categories` → `five categories`（中英两版）

### 4.7 动画
- ✅ 搜索框展开动画**恢复原版 2000ms 手感**（之前误改成 600ms，用户要求改回）
- ✅ 触发延迟 `650ms → 150ms`（让它更快**出现**，但保留展开的流畅感）
- ✅ filter-bar 规则线/分隔线/背景色动画全部恢复原版（2000ms / 2300ms）

---

## 5. ⚠️ 踩过的坑（接手必读）

### 5.1 数字口径不一致（最严重的一次）
- **现象**：SEO head 写"350+"，页面实际渲染只有 81 条。用户差点拿着"350+"去发社交平台，点进去只有 81 个会当场翻车。
- **根因**：`data.js` 注释里说"350+ 条目收敛"，被误当成页面收录数写进了 title/description/JSON-LD。
- **已修复**，但**教训**：页面上任何数字都必须与 `data.js` 实算结果一致。页面统计栏是运行时 `cats.reduce(...)` 算出来的，会显示 `81+`。

### 5.2 SPA fallback 吃掉静态文件
- **现象**：`sitemap.xml` 返回的是主页 HTML。
- **根因**：站是 SPA fallback，未匹配路径返回 `index.html`；当时 `dist/` 里没有真实 sitemap 文件。
- **已修复**：真实文件放入 `dist/`。

### 5.3 GitHub 直连间歇性超时
- **现象**：`git push` 报 `Empty reply from server` / `Failed to connect to github.com port 443`，但 `api.github.com` 通。
- **当时处理**：反复重试（通常是间歇性的，重试几次能成）。
- **现状**：仓库已换成 **SSH**（`git@github.com:...`），可能已缓解，但若再遇超时按此思路排查。

### 5.4 `dist/` 与 `docs/` 漂移
- 两个文件是镜像，改一个必须同步另一个，否则线上线下不一致。

### 5.5 代码编辑工具会覆盖改动
- 历史上另一个 AI 工具（codex）曾把字体修复覆盖回去过。**改完记得 `git diff` 确认没被覆盖**。

### 5.6 中文 i18n 运行时替换的坑（来自全局经验库）
- 运行时遍历 DOM 做多语言替换时，精确匹配字典覆盖不到模板字符串，动态视图必须显式处理。

---

## 6. 待办事项（接手后请优先处理）

### 6.1 🔴 高优先级

1. **核实 Cloudflare Pages 是否已重连到新仓库**
   - 仓库已从 `aj5364351-spec/aihub-tools-index` 换成 `Zorix666/zorixdev.xyz`
   - 若 Cloudflare 还连着旧仓库，**推送不会触发部署**，等于白改
   - 路径：Cloudflare Pages → aihub → Settings → Builds & deployments → Git repository
   - 确认：输出目录应为 `dist`

2. **4 篇宣传文案需要改口径**
   - 已写好的 4 篇引流文案（V2EX / LinuxDO / 小红书 / 知乎）**目前全是"350+"**，必须改成"**80+ 精选**"
   - 卖点也建议改为"精挑 80+ 个真正好用的"（诚实反而更可信）
   - **文案尚未落盘成文件**，需要重写或从上轮会话恢复

3. **查网站流量**
   - 数据源：Cloudflare Web Analytics
   - ⚠️ 需要登录 Cloudflare（账号 aj5364351@gmail.com）
   - ⚠️ **登录动作须用户本人完成** —— 自动化工具在真实账号上做登录/账号选择会被安全策略拦截
   - 历史参考：曾查到 30 天独立访客 1,540，但**绝大多数是爬虫**，真实浏览器访客接近 0

### 6.2 🟡 中优先级

4. **确认 Google / Bing 抓取到新版**
   - 两个搜索引擎都已收录主页，但**缓存的是旧的 "350+" 标题**
   - Google 已提交"请求重新索引"，Bing 已通过 IndexNow 通知
   - 需**过几小时~几天**后复查：`site:zorixdev.xyz` 看标题是否变成 "80+ 精选"

5. **Google Search Console 数据仍在处理中**
   - `Page indexing` 报告曾显示 "Processing data, please check again in a day or so"
   - 过几天复查收录页数

6. **`docs/PRODUCT.md` 里还写着 "350+"**
   - 这是设计文档，不影响线上，但口径应统一

### 6.3 🟢 低优先级 / 长期

7. **内容扩充**：把 `PRODUCT.md` 提到的原始 350+ 条目清单逐步整理进 `data.js`（每条约需补一句点评 + tier）
8. **流量激活**：目前 Google 搜索点击为 0（站太新），需要靠社交平台引流起量
9. **发帖引流**：实际发帖须由用户本人在自己的账号操作（新号 + 突然发推广链接易触发风控）

---

## 7. 当前线上状态（2026-10-03 实测）

```
<html lang="zh-CN">
<title>AIHub — AI 工具索引 | 80+ 精选模型与 API 导航</title>
```

| 项 | 状态 |
|---|---|
| 线上 title | `80+ 精选模型与 API 导航` ✓ |
| 线上 lang | `zh-CN` ✓ |
| 页面实际条数 | 81（运行时从 data.js 算出，显示 `81+`） |
| 分类数 | 5 |
| `dist` vs `docs` 一致性 | IDENTICAL ✓ |
| "350+" 残留 | 0 处 ✓ |
| 搜索触发延迟 | 150ms ✓ |

**收录状态**：

| 搜索引擎 | 收录 | 备注 |
|---|---|---|
| Google | ✅ 已收录 | 缓存旧 "350+" 标题，已请求重新索引 |
| Bing | ✅ 已收录 | 已通过 IndexNow 通知重抓 |
| Google 搜索点击 | 0 | 站太新，尚无关键词权重 |

---

## 8. 常用命令

```bash
# 进入项目
cd "/c/Users/16534/Desktop/Mine/claude/aihub-tools-index"

# 验证双文件一致（每次改完必跑）
diff -q dist/index.html docs/index-anthropic-refined.html && echo "IDENTICAL ✓"

# 检查口径残留
grep -c "350+" dist/index.html          # 应为 0
grep -c "url:" docs/shared/data.js      # 条目数

# 查看线上
curl -sL "https://zorixdev.xyz/" | grep -oE '<html lang="[^"]*"|<title>[^<]*</title>'

# 检查部署状态
curl -sL "https://zorixdev.xyz/sitemap.xml" | head -5      # 应是 XML，不是 HTML
curl -sIL "https://zorixdev.xyz/f5cc4e95498cfeef935a8ea09f169e38.txt"   # 应 200 + text/plain

# 提交推送
git add -A && git commit -m "..." && git push
```

---

## 9. 设计规范参考

完整的品牌与设计说明见 `docs/PRODUCT.md`，核心要点：

- **定位**：Editorial（编辑感）目录，**不是**卡片墙
- **配色**：暖纸底 `#faf9f5` + 陶土点缀 `#c2683f`（用量 ≤10%）+ 暖近黑正文。策略是 **Committed-restrained**：遵循 Anthropic 真实品牌身份，**主动舍弃了 palette 脚本建议的靛紫种子**（与用户硬性约束冲突）。暖纸底是**用户的硬性要求**（非纯白）。
- **字体**：标题 Source Serif 4 / Literata，正文 Noto Sans SC
- **原则**：用发丝线代替投影（无 box-shadow）；一屏只说一两件事；暖意来自纸色与衬线，不靠渐变发光
- **Anthropic 风格**：符合其真实品牌身份

> 另有用户提供的 **Meridian 设计系统**（Cormorant Garamond + DM Sans + 靛蓝 #4338CA + 冷石底 #F2F3F7）参考。**结论：不建议套用到本项目** —— 它是文档/展示型定位，而 AIHub 是信息密度高的目录型；且 Cormorant Garamond 纯英文，中文会掉到系统字体。可借鉴的只有通用习惯（单强调色克制、×4 间距体系、边框分层替代投影）。

---

## 10. 给接手者的提醒

1. **先看第 2 节部署架构**，这是最容易踩雷的地方。
2. **先核实 Cloudflare Pages 的 Git 连接**，否则改了不生效。
3. **任何改动后跑 `diff` 验证双文件一致**。
4. **数字口径必须与 `data.js` 实算一致**，别再出现夸大。
5. **涉及登录用户账号的操作**（Cloudflare / Google / Bing），请让用户本人完成登录，不要尝试自动化。
6. 用户是高中生（zorix），沟通用中文，说明要清楚具体。
