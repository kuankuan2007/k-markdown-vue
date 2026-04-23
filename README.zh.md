# @kuankuan/k-markdown-vue

[![npm version](https://img.shields.io/npm/v/@kuankuan/k-markdown-vue)](https://www.npmjs.com/package/@kuankuan/k-markdown-vue)
[![license](https://img.shields.io/badge/license-MulanPSL--2.0-blue)](./LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-black?logo=github)](https://github.com/kuankuan2007/k-markdown-vue)

一个用于渲染 Markdown 的 Vue 3 组件：底层使用
[@kuankuan/k-markdown-parser](https://github.com/kuankuan2007/k-markdown-parser) 将 Markdown 解析为 AST，
再按节点类型进行渲染，并内置 KaTeX（LaTeX）与 highlight.js（代码高亮）。

## 特性

- Vue 3 + TypeScript
- 使用 `@kuankuan/k-markdown-parser` 进行快速解析
- KaTeX 渲染 LaTeX（按需开启）
- highlight.js 代码高亮
- XML 默认安全策略（默认：`warn`）
- 支持按节点类型自定义渲染组件

## 安装

```bash
npm i @kuankuan/k-markdown-vue
```

## 快速开始

```vue
<template>
  <KMarkdownVue :value="md" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KMarkdownVue from '@kuankuan/k-markdown-vue';

// 组件库样式（包含从 KaTeX 提取出的 CSS）
import '@kuankuan/k-markdown-vue/dist/index.css';

// 从 highlight.js 选一个主题即可
import 'highlight.js/styles/monokai-sublime.css';

const md = ref(`# 你好\n\n行内公式：$a^2+b^2=c^2$\n\n\`\`\`ts\nconst x: number = 1\n\`\`\``);

const options = {
  latex: 'default',
  xml: 'warn',
};
</script>
```

可选（仓库内样式建议）：本仓库还提供了 `styles/suggestion.scss`，内含一个 highlight.js 主题与少量 Markdown
友好样式（需要你的构建环境支持 Sass）。

## API

### 组件

默认导出：`KMarkdownVue`。

Props：

- `value: string` — Markdown 源文本
- `options?: KMarkdownVueOptions` — 渲染/解析选项

### KMarkdownVueOptions

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `parserOptions` | `@kuankuan/k-markdown-parser` 的 `Option` | `undefined` | 直接传给 `new KMarkdownParser(parserOptions)` |
| `latex` | `'ignore' \| 'warn' \| 'default' \| KatexOptions` | `undefined` | `undefined` 等同“什么都不渲染”（仅对 LaTeX 节点） |
| `xml` | `'ignore' \| 'warn' \| 'preserve' \| (node) => VNode \| void` | `'warn'` | 默认值在 XML 渲染组件内部生效 |
| `components` | `Record<string \| symbol, Component>` | 内置默认值 | 按节点 id 覆盖渲染组件 |

仅类型/符号导入（当你安装的包中包含 `src/` 时可用）：

```ts
import type { KMarkdownVueOptions } from '@kuankuan/k-markdown-vue/src/options';
import { defaultSymbol, stringSymbol } from '@kuankuan/k-markdown-vue/src/symbols';
```

补充说明：

- **`latex`**
  - `'default'` 使用 KaTeX 渲染，默认 `{ throwOnError: false }`。
  - `KatexOptions` 可自定义 KaTeX 选项（会合并）。
  - `'warn'` 会显示 `"<LaTeX is not allowed>"`。
  - `'ignore'`（以及 `undefined`）会让 LaTeX 节点渲染为空。

- **`xml`**
  - `'warn'` 显示 `"<XML is not allowed>"`。
  - `'preserve'` 会按 `<node.args.name v-bind="node.args.attributes">...</node.args.name>` 方式保留渲染。
  - `function` 会收到 `KMarkdownXMLNode`，可返回一个 `VNode`（也可以不返回）。

安全提示：如果 Markdown 内容不可信，请避免使用 `xml: 'preserve'`。

## 节点渲染机制

本库渲染的是 `@kuankuan/k-markdown-parser` 生成的 AST 节点：

- `options.components` 里有对应 `node.id` 的组件时，优先使用它。
- 找不到对应组件时，会回退到一个默认包装组件（key 为 `defaultSymbol`）。
- AST 中的纯字符串片段会由 `stringSymbol` 对应的组件渲染。

内置的节点渲染器（默认提供）：

`title`, `paragraph`, `quote-block`, `code-block`, `code-inline`, `latex-block`, `latex-inline`,
`line-between`, `bold`, `italic`, `delete-line`, `subscript`, `superscript`, `image`, `link`,
`email`, `unordered-list`, `unordered-list-item`, `ordered-list`, `ordered-list-item`, `table`,
`table-row`, `xml`。

解析器本身还支持更多节点类型（如 `emoji`, `task-list`, `table-cell`）。如果你启用了这些语法，建议通过
`options.components` 补充对应组件以获得更语义化的渲染效果。

### 自定义组件

你可以通过节点 id 覆盖任意渲染器：

```ts
import type { Component } from 'vue';
import type { KMarkdownNode } from '@kuankuan/k-markdown-parser';

const MyCodeBlock: Component<{ node: KMarkdownNode }> = {
  /* ... */
};

const options = {
  components: {
    'code-block': MyCodeBlock,
  },
};
```

提示：`defaultSymbol` 与 `stringSymbol` 定义在本仓库的 `src/symbols.ts`，可以作为特殊 key，用来覆盖
“未知节点回退渲染器”与“纯文本渲染器”。

## 解析器选项（parserOptions）

`parserOptions` 与 `@kuankuan/k-markdown-parser` 完全一致，可自定义语法（`syntaxes`）、节点映射（`nodeMap`）等。
详见：<https://github.com/kuankuan2007/k-markdown-parser>

## 开发

```bash
npm i
npm run build
npm run type-check
npm run lint
npm run format
```

构建产物：

- `dist/index.mjs`（ESM）
- `dist/index.js`（CJS）
- `dist/index.css`

## 许可证

木兰宽松许可证，第 2 版（MulanPSL-2.0）。详见 [LICENSE](./LICENSE)。
