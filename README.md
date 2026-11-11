# manBocchi.github.io · 个人博客

用于生活随笔、摄影作品与学习笔记的简约个人网站。技术栈为 Astro、TypeScript、原生 CSS 和 Markdown，生成静态页面并通过 GitHub Pages 发布。

## 页面

- 首页：个人介绍、精选照片、最近随笔、摄影选集、最近笔记。
- `/essays/`：随笔列表，点击进入正文。
- `/photography/`：摄影展示，点击放大；支持上一张、下一张、方向键、Esc 关闭。
- `/notes/`：笔记列表与主题筛选；正文提供目录和代码复制。
- `/about/`：个人介绍。
- RSS、站点地图和 404 页面。

所有页面都支持手机浏览、键盘访问和减少动态效果设置。关闭 JavaScript 后，文章仍能完整阅读，摄影链接仍可打开原图。

## 本地运行

需要 Node.js 24 或更新的兼容 LTS 版本，以及 npm。

```bash
npm ci
npm run dev
```

开发服务器会输出本地预览地址。提交前运行：

```bash
npm run verify
```

该命令检查 Astro/TypeScript、生成静态站点，并验证站内链接、图片与文章目录锚点。构建产物位于 `dist/`，不需要提交到 Git。

## 第一次发布到 GitHub Pages

当前配置对应仓库 `mbc0426/manBocchi.github.io`。由于仓库名与账号名不同，它使用项目站点地址：

**https://mbc0426.github.io/manBocchi.github.io/**

1. 把项目源码（包括 `.github/`、`public/`、`src/`、`scripts/`、配置文件和 `package-lock.json`）推送到仓库的 `main` 分支。
2. 打开仓库 **Settings → Pages → Build and deployment**，把 **Source** 设置为 **GitHub Actions**。
3. 查看 **Actions → Build and deploy blog**；如第一次自动运行早于 Pages 设置，可以选择 **Run workflow** 再运行一次。
4. `build` 与 `deploy` 都通过后，从 Pages 设置页打开发布地址。

之后向 `main` 推送文章、照片或样式更新，会自动重新构建并发布。Pull Request 仅执行检查与构建，不部署。

仓库需要允许 GitHub Actions 运行；发布作业使用 GitHub 提供的临时凭据，无需把个人访问令牌或 SSH 私钥写入项目。

## 修改站名和个人信息

编辑 `src/config.ts`：站名、英文副标题、作者、简介、GitHub 链接与邮箱集中放在这里。邮箱留空时隐藏对应链接。

编辑 `src/pages/about/index.astro` 修改完整个人介绍。该页当前的文字明确标为介绍草稿。

颜色、字体与间距位于 `src/styles/global.css` 顶部。当前使用系统字体，无需向外部字体服务发出请求。

## 写随笔或笔记

在 `src/content/posts/` 新建 Markdown 文件。文件名会成为地址的一部分，推荐使用简短英文，如 `a-rainy-afternoon.md`。

```markdown
---
title: 一个下雨的下午
description: 写在文章列表中的一两句话摘要。
date: 2026-11-11
kind: essay
tags: [日常, 阅读]
draft: false
demo: false
---

这里开始写正文。正文从二级标题开始，不需要重复写文章标题。

## 一个小标题

写下你的记录。
```

- `kind: essay` 放入随笔，`kind: note` 放入学习笔记。
- `draft: true` 不会生成公开页面，也不会进入首页、RSS 和站点地图。
- `demo: true` 在页面上标记“示例”；自己的文章设为 `false` 或删掉该行。
- 日期按新到旧排序；同日文章按文件名稳定排序。
- 文件可以放入子目录，系统会保留对应的多层地址。
- 第一版保留了 6 篇示例文章；可直接删除或替换，不影响页面结构。

## 替换摄影作品

1. 把自己的照片放入 `public/images/`。推荐 WebP/JPEG，长边 1600–2400 像素，并在上传前压缩。
2. 编辑 `src/data/photos.ts`，修改标题、说明、替代文本、图片路径和真实宽高。请为每张照片保留唯一的 `id`。
3. 自己的作品将 `demo` 设为 `false`，填写自己的署名；不适用的来源链接可以留空。
4. 首页封面默认选第一张照片，摄影选集默认选第 2、4、5 张；照片少于 5 张时，首页会自动选择现有照片。
5. 所有照片都替换为自己的作品后，摄影页顶部的示例来源说明会自动隐藏。

基础版已经包含照片。普通缩略图为 `*-800.webp`，通过可选的 `thumbnail` 字段指定；大图预览使用 `src` 指定的完整图片。替换时可以使用单张文件并省略 `thumbnail`，页面会自动使用同一张作为回退。

### 图片与内容来源

仓库中的照片是用于版式演示的 Unsplash 示例图片，**不是博客作者拍摄的作品**。页面已标注示例；原始图片地址记录在 `src/data/photos.ts`。使用条件参见 [Unsplash License](https://unsplash.com/license)。

示例文章是用于展示版式的原创草稿，不代表作者真实经历。Astro 框架采用 [MIT 许可证](https://github.com/withastro/astro/blob/main/LICENSE)。个人文章与摄影作品的授权方式由各自作者决定。

## 仓库改名或自定义域名

`astro.config.mjs` 中的 `site` 与 `base` 决定公开地址。目前配置为：

```javascript
site: 'https://mbc0426.github.io',
base: '/manBocchi.github.io',
```

如果将仓库改名为 `mbc0426.github.io`，则将 `base` 改为 `/`。自定义域名时修改 `site`、将 `base` 设为 `/`，并在 Pages 设置中绑定域名。也可在构建环境设置 `SITE_URL` 和 `BASE_PATH` 覆盖默认值。

所有模板链接与资源均通过 `withBase()` 处理，避免项目站点子路径下出现 404。自己添加链接时也应使用该函数；发布前的链接检查会发现遗漏。

官方参考：[Astro 部署到 GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)。
