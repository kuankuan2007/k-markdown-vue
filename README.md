# @kuankuan/k-markdown-vue

[![npm version](https://img.shields.io/npm/v/@kuankuan/k-markdown-vue)](https://www.npmjs.com/package/@kuankuan/k-markdown-vue)
[![license](https://img.shields.io/badge/license-MulanPSL--2.0-blue)](./LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-black?logo=github)](https://github.com/kuankuan2007/k-markdown-vue)

A Vue 3 component for rendering Markdown through an AST produced by
[@kuankuan/k-markdown-parser](https://github.com/kuankuan2007/k-markdown-parser), with built-in
KaTeX (LaTeX) and highlight.js (code highlighting).

## Features

- Vue 3 + TypeScript
- Fast Markdown parsing via `@kuankuan/k-markdown-parser`
- LaTeX rendering via KaTeX (opt-in)
- Code highlighting via highlight.js
- Safe-by-default XML handling (default: `warn`)
- Custom renderers per node type

## Installation

```bash
npm i @kuankuan/k-markdown-vue
```

## Quick Start

```vue
<template>
  <KMarkdownVue :value="md" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KMarkdownVue from '@kuankuan/k-markdown-vue';

// Library styles (contains KaTeX CSS extracted from the bundle)
import '@kuankuan/k-markdown-vue/dist/index.css';

// Pick ONE highlight.js theme you like
import 'highlight.js/styles/monokai-sublime.css';

const md = ref(`# Hello\n\nInline math: $a^2+b^2=c^2$\n\n\`\`\`ts\nconst x: number = 1\n\`\`\``);

const options = {
  latex: 'default',
  xml: 'warn',
};
</script>
```

Optional (repo style suggestion): this repo also contains `styles/suggestion.scss` which includes a
highlight.js theme + a few Markdown-friendly styles (requires Sass in your build).

## API

### Component

Default export: `KMarkdownVue`.

Props:

- `value: string` — Markdown source text
- `options?: KMarkdownVueOptions` — rendering / parsing options

### KMarkdownVueOptions

| Option | Type | Default | Notes |
| --- | --- | --- | --- |
| `parserOptions` | `@kuankuan/k-markdown-parser` `Option` | `undefined` | Passed to `new KMarkdownParser(parserOptions)` |
| `latex` | `'ignore' \| 'warn' \| 'default' \| KatexOptions` | `undefined` | `undefined` behaves like “render nothing” for LaTeX nodes |
| `xml` | `'ignore' \| 'warn' \| 'preserve' \| (node) => VNode \| void` | `'warn'` | Default is applied inside the XML renderer |
| `components` | `Record<string \| symbol, Component>` | built-in defaults | Override renderers by node id |

Type-only imports (when your package includes `src/`):

```ts
import type { KMarkdownVueOptions } from '@kuankuan/k-markdown-vue/src/options';
import { defaultSymbol, stringSymbol } from '@kuankuan/k-markdown-vue/src/symbols';
```

Notes:

- **`latex`**
  - `'default'` renders with KaTeX and default `{ throwOnError: false }`.
  - `KatexOptions` lets you pass KaTeX options (merged).
  - `'warn'` shows `"<LaTeX is not allowed>"`.
  - `'ignore'` (and `undefined`) renders nothing for LaTeX nodes.

- **`xml`**
  - `'warn'` shows `"<XML is not allowed>"`.
  - `'preserve'` renders as `<node.args.name v-bind="node.args.attributes">...</node.args.name>`.
  - `function` receives the `KMarkdownXMLNode` and can return a `VNode` (or return nothing).

Security: if your Markdown is untrusted, avoid `xml: 'preserve'`.

## Node Renderers

This library renders the AST nodes produced by `@kuankuan/k-markdown-parser`.

- If a node id has a matching renderer in `options.components`, that component is used.
- Otherwise it falls back to a default wrapper (keyed by `defaultSymbol`).
- Plain string segments are rendered by the renderer keyed by `stringSymbol`.

Built-in renderer ids (provided by default):

`title`, `paragraph`, `quote-block`, `code-block`, `code-inline`, `latex-block`, `latex-inline`,
`line-between`, `bold`, `italic`, `delete-line`, `subscript`, `superscript`, `image`, `link`,
`email`, `unordered-list`, `unordered-list-item`, `ordered-list`, `ordered-list-item`, `table`,
`table-row`, `xml`.

The parser also supports other node types (e.g. `emoji`, `task-list`, `table-cell`). If you enable
those syntaxes, consider providing corresponding components via `options.components`.

### Custom Components

You can override any node renderer by id:

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

Tip: `defaultSymbol` and `stringSymbol` live in `src/symbols.ts` in this repo and can be used as
special keys to override the fallback renderer and plain-text renderer.

## Parser Options

`parserOptions` is the same `Option` type accepted by `@kuankuan/k-markdown-parser`.
You can customize syntaxes (`syntaxes`), node mapping (`nodeMap`), and more. See the parser docs:
<https://github.com/kuankuan2007/k-markdown-parser>

## Development

```bash
npm i
npm run build
npm run type-check
npm run lint
npm run format
```

Build output:

- `dist/index.mjs` (ESM)
- `dist/index.js` (CJS)
- `dist/index.css`

## License

Mulan Permissive Software License, Version 2 (MulanPSL-2.0). See [LICENSE](./LICENSE).
