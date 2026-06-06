# @kuankuan/k-markdown-vue

[![npm version](https://img.shields.io/npm/v/@kuankuan/k-markdown-vue)](https://www.npmjs.com/package/@kuankuan/k-markdown-vue)
[![license](https://img.shields.io/badge/license-MulanPSL--2.0-blue)](./LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-black?logo=github)](https://github.com/kuankuan2007/k-markdown-vue)

A Vue 3 Markdown renderer built on top of `@kuankuan/k-markdown-parser`.

## Features

- Vue 3 + TypeScript
- AST-based rendering instead of raw HTML string concatenation
- Custom renderers per node id
- Optional LaTeX, XML and code highlighting strategies

## Installation

```bash
npm i @kuankuan/k-markdown-vue
```

Install `highlight.js` as well if you want to use the default highlighter:

```bash
npm i highlight.js
```

## Quick Start

```vue
<template>
  <KMarkdownVue :value="md" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KMarkdownVue from '@kuankuan/k-markdown-vue';

import '@kuankuan/k-markdown-vue/dist/index.css';
import 'highlight.js/styles/monokai-sublime.css';

const md = ref(`# Hello\n\n$a^2+b^2=c^2$\n\n\`\`\`ts\nconst answer = 42;\n\`\`\``);

const options = {
  latex: 'show',
  xml: 'warn',
  highlight: true,
};
</script>
```

## Component API

Default export: `KMarkdownVue`

Props:

- `value: string`
- `options?: KMarkdownVueOptions`

## `KMarkdownVueOptions`

| Option | Type | Default | Notes |
| --- | --- | --- | --- |
| `parserOptions` | parser `Option` | `undefined` | Passed to `new KMarkdownParser(parserOptions)` |
| `xml` | `'ignore' \| 'warn' \| 'show' \| ((node) => VNode \| void)` | `'warn'` | Controls XML nodes |
| `latex` | `'ignore' \| 'warn' \| 'show' \| KatexOptions` | `'warn'` | Controls LaTeX nodes |
| `components` | custom renderer map | built-in defaults | Overrides renderers by node id |
| `highlight` | `boolean \| HighlightInterface` | `true` | Controls code highlighting |
| `titleLevelStart` | `number` | `1` | Offsets heading levels before clamping to `h1`-`h6` |

## Notes

- `highlight: true` dynamically loads `highlight.js` on demand.
- `xml: 'show'` should only be used for trusted content.
- `latex: 'show'` renders with KaTeX using `{ throwOnError: false }`.

## Development

```bash
pnpm install
pnpm build
pnpm type-check
pnpm lint
```

## License

MulanPSL-2.0. See [LICENSE](./LICENSE).
