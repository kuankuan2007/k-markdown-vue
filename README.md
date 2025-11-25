# @kuankuan2007/k-markdown-vue

A Vue 3 component library for rendering Markdown content with support for LaTeX math expressions, syntax highlighting, and customizable rendering.

## Features

- 🚀 **Vue 3 Support**: Built with Vue 3 and TypeScript for modern Vue applications
- 📝 **Markdown Parsing**: Powered by [@kuankuan/k-markdown-parser](https://github.com/kuankuan2007/k-markdown-parser)
- 🔢 **LaTeX Math**: Built-in support for mathematical expressions using KaTeX
- 💻 **Syntax Highlighting**: Code syntax highlighting with highlight.js
- 🎨 **Customizable**: Flexible options for parsing and rendering
- 📦 **Lightweight**: Minimal dependencies, optimized for performance

## Installation

```bash
npm install @kuankuan/k-markdown-vue
```

Or using yarn:

```bash
yarn add @kuankuan/k-markdown-vue
```

Or using pnpm:

```bash
pnpm add @kuankuan/k-markdown-vue
```

## Usage

### Basic Usage

```vue
<template>
  <k-markdown-vue :value="markdownContent" />
</template>

<script setup lang="ts">
import { KMarkdownVue } from '@kuankuan/k-markdown-vue/src';
import markdownContent from './markdown-content.md?raw';
</script>
```

### With Options

```vue
<template>
  <KMarkdownVue :value="markdownContent" :options="options" />
</template>

<script setup lang="ts">
import { KMarkdownVue } from '@kuankuan/k-markdown-vue';
import type { KMarkdownVueOptions } from '@kuankuan/k-markdown-vue';

const options: KMarkdownVueOptions = {
  parserOptions: {
    // Parser configuration options
  },
  latex: {
    // KaTeX options
    throwOnError: false,
    displayMode: false,
  },
  xml: 'preserve', // 'ignore' | 'warn' | 'preserve' | custom function
};

const markdownContent = '# Your markdown content here';
</script>
```

## Options

### KMarkdownVueOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `parserOptions` | `KMarkdownParserOptions` | `undefined` | Configuration options for the markdown parser |
| `latex` | `'ignore' \| 'warn' \| 'default' \| KatexOptions` | `'default'` | LaTeX rendering behavior and KaTeX configuration |
| `xml` | `'ignore' \| 'warn' \| 'preserve' \| Function` | `'preserve'` | XML node handling strategy |

### LaTeX Options

- **`'ignore'`**: Skip LaTeX rendering
- **`'warn'`**: Log warnings for LaTeX expressions
- **`'default'`**: Use default KaTeX rendering
- **`KatexOptions`**: Custom KaTeX configuration object

### XML Options

- **`'ignore'`**: Ignore XML nodes
- **`'warn'`**: Log warnings for XML nodes
- **`'preserve'`**: Render XML nodes as-is
- **`Function`**: Custom render function for XML nodes

## Development

### Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build library
npm run build

# Type check
npm run type-check

# Lint
npm run lint

# Format code
npm run format
```

### Project Structure

```plaintext
src/
├── KMarkdownVue.vue        # Main component
├── KMdContent.vue          # Content wrapper
├── KMdNode.vue             # Node renderer
├── options.ts              # Type definitions
├── symbles.ts              # Vue provide/inject symbols
├── components/             # Shared components
│   ├── KMdCode.vue         # Code highlighting
│   └── KMdLatex.vue        # LaTeX rendering
└── nodesEle/               # Element-specific components
    ├── index.ts
    ├── KMdEleBold.vue
    ├── KMdEleCodeBlock.vue
    ├── KMdEleLatexBlock.vue
    └── ...                 # Other element components
```

## Dependencies

- **Vue 3**: Core framework
- **[@kuankuan/k-markdown-parser](https://github.com/kuankuan2007/k-markdown-parser)**: Markdown parsing engine
- **KaTeX**: LaTeX math rendering
- **highlight.js**: Syntax highlighting for code blocks

## License

This project is licensed under the Mulan Permissive Software License, Version 2 (MulanPSL-2.0).

See [LICENSE](./LICENSE) for details.
