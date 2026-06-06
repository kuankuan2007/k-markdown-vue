# @kuankuan/k-markdown-vue

[![npm version](https://img.shields.io/npm/v/@kuankuan/k-markdown-vue)](https://www.npmjs.com/package/@kuankuan/k-markdown-vue)
[![license](https://img.shields.io/badge/license-MulanPSL--2.0-blue)](./LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-black?logo=github)](https://github.com/kuankuan2007/k-markdown-vue)

一个基于 `@kuankuan/k-markdown-parser` 的 Vue 3 Markdown 渲染组件。

## 特性

- Vue 3 + TypeScript
- 基于 AST 的节点渲染
- 支持按节点 id 覆盖渲染组件
- 支持 LaTeX、XML 与代码高亮策略配置

## 安装

```bash
npm i @kuankuan/k-markdown-vue
```

如果要使用默认代码高亮，请额外安装：

```bash
npm i highlight.js
```

## 快速开始

```vue
<template>
  <KMarkdownVue :value="md" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KMarkdownVue from '@kuankuan/k-markdown-vue';

import '@kuankuan/k-markdown-vue/dist/index.css';
import 'highlight.js/styles/monokai-sublime.css';

const md = ref(`# 你好\n\n$a^2+b^2=c^2$\n\n\`\`\`ts\nconst answer = 42;\n\`\`\``);

const options = {
  latex: 'show',
  xml: 'warn',
  highlight: true,
};
</script>
```

## 组件 API

默认导出：`KMarkdownVue`

Props：

- `value: string`
- `options?: KMarkdownVueOptions`

## `KMarkdownVueOptions`

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `parserOptions` | 解析器 `Option` | `undefined` | 直接传给 `new KMarkdownParser(parserOptions)` |
| `xml` | `'ignore' \| 'warn' \| 'show' \| ((node) => VNode \| void)` | `'warn'` | 控制 XML 节点 |
| `latex` | `'ignore' \| 'warn' \| 'show' \| KatexOptions` | `'warn'` | 控制 LaTeX 节点 |
| `components` | 自定义组件映射 | 内置默认值 | 按节点 id 覆盖组件 |
| `highlight` | `boolean \| HighlightInterface` | `true` | 控制代码高亮 |
| `titleLevelStart` | `number` | `1` | 标题级别整体偏移 |

## 说明

- `highlight: true` 会按需动态加载 `highlight.js`。
- `xml: 'show'` 只适合可信内容。
- `latex: 'show'` 会用 KaTeX 渲染，默认 `throwOnError: false`。

## 开发

```bash
pnpm install
pnpm build
pnpm type-check
pnpm lint
```

## 许可证

木兰宽松许可证第 2 版（MulanPSL-2.0）。详见 [LICENSE](./LICENSE)。
