# Vue3 版的[Chat2DB](https://github.com/Chat2DB/Chat2DB) 前端实现

## 📝 项目介绍

本项目是 Vue3 的 [Chat2DB](https://github.com/Chat2DB/Chat2DB) 实现，并且融合了[GoView](https://github.com/Kate-liu/GoView) 项目，
使用者可以很方便通过自然语言生成可视化看板。

## 🚀 项目启动

```bash
# 克隆项目
git clone https://github.com/chat2charts/chat2charts.git

# 进入项目目录
cd chat2charts

# 安装依赖
pnpm install

# 启动项目
pnpm run dev
```

### 后端启动参见[Chat2DB](https://github.com/Chat2DB/Chat2DB)项目

## 📦 项目截图

#### 😶 **纯前端** 分支： **`master`**

## 📖 整体介绍

Chat2Charts 是一款 AI first 的数据管理、开发、分析工具，它的核心是 AIGC（Artificial Intelligence Generation Code）能力，它可以将自然语言转换为 SQL，也可以将 SQL 转换为自然语言，也可以自动生成报表，极大的提升人员的效率。通过一个产品可以实现数据管理、数据开发、数据分析的能力，即使不懂 SQL 的运营业务也可以使用快速查询业务数据、生成报表能力。

主要技术栈为：

| 名称                | 版本  | 名称        | 版本   |
| ------------------- | ----- | ----------- | ------ |
| Vue                 | 3.2.x | TypeScript4 | 4.6.x  |
| Vite                | 4.2.x | NaiveUI     | 2.34.x |
| ECharts             | 5.3.x | Pinia       | 2.0.x  |
| 详见 `package.json` | 😁    | 🥰          | 🤗     |

开发环境:

| 名称 | 版本    | 名称    | 版本  |
| ---- | ------- | ------- | ----- |
| node | 16.16.x | npm     | 8.5.x |
| pnpm | 7.1.x   | windows | 11    |

已完成图表：

| 分类   | 名称             | 名称       | 名称           | 名称                     |
| ------ | ---------------- | ---------- | -------------- | ------------------------ |
| 图表   | 柱状图           | 横向柱状图 | 折线图         | 单/多 折线面积图(渐变色) |
| \*     | 饼图             | 环形图     | 水球图         | 雷达图                   |
| \*     | NaiveUI 多种进度 | 散点图     | 对数回归散点图 | 热力图                   |
| \*     | 漏斗图           | 中国地图   | 高德地图       | 🦊                       |
| 信息   | 文字             | 渐变文字   | 词云           | 嵌套网页                 |
| \*     | 图片             | 视频       | 😺             | 🐯                       |
| 列表   | 滚动排名列表     | 滚动表格   | 🐮             | 🐐                       |
| 小组件 | 边框-01~13       | 装饰-01~05 | 数字翻牌       | 通用时间                 |
| \*     | 数字计数         | 倒计时     | 时钟           | 🦁                       |

### 浏览器支持

开发和测试平台均在 `Google` 和最新版 `EDGE` 上完成，暂未测试 `IE11` 等其它浏览器，如有需求请自行测试与兼容。

## ☎️ 加入我们

加群前请先 Star 和 Fork，谢谢~加入微信群一起讨论，并可以获取 Chat2Charts 最新动态和更新。
![](readm/personelwechat.jpg) 备注：chat2charts
