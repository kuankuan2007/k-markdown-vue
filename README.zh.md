# @kuankuan2007/k-markdown-vue

一个用于渲染 Markdown 内容的 Vue 3 组件库，支持 LaTeX 数学表达式、语法高亮和自定义渲染。

## 特性

- 🚀 **Vue 3 支持**: 使用 Vue 3 和 TypeScript 构建，适用于现代 Vue 应用
- 📝 **Markdown 解析**: 由 [@kuankuan/k-markdown-parser](https://github.com/kuankuan2007/k-markdown-parser) 驱动
- 🔢 **LaTeX 数学公式**: 使用 KaTeX 内置支持数学表达式
- 💻 **语法高亮**: 使用 highlight.js 进行代码语法高亮
- 🎨 **可自定义**: 灵活的解析和渲染选项
- 📦 **轻量级**: 最小依赖，性能优化

## 安装

```bash
npm install @kuankuan/k-markdown-vue
```

或使用 yarn:

```bash
yarn add @kuankuan/k-markdown-vue
```

或使用 pnpm:

```bash
pnpm add @kuankuan/k-markdown-vue
```

## 使用方法

### 基础用法

```vue
<template>
  <k-markdown-vue :value="markdownContent" />
</template>

<script setup lang="ts">
import { KMarkdownVue } from '@kuankuan/k-markdown-vue/src';
import markdownContent from './markdown-content.md?raw';
</script>
```

### 带选项配置

```vue
<template>
  <KMarkdownVue :value="markdownContent" :options="options" />
</template>

<script setup lang="ts">
import { KMarkdownVue } from '@kuankuan/k-markdown-vue';
import type { KMarkdownVueOptions } from '@kuankuan/k-markdown-vue';

const options: KMarkdownVueOptions = {
  parserOptions: {
    // 解析器配置选项
  },
  latex: {
    // KaTeX 选项
    throwOnError: false,
    displayMode: false,
  },
  xml: 'preserve', // 'ignore' | 'warn' | 'preserve' | 自定义函数
};

const markdownContent = '# 你的 markdown 内容';
</script>
```

## 配置选项

### KMarkdownVueOptions

| 选项 | 类型 | 默认值 | 描述 |
|--------|------|---------|-------------|
| `parserOptions` | `KMarkdownParserOptions` | `undefined` | Markdown 解析器的配置选项 |
| `latex` | `'ignore' \| 'warn' \| 'default' \| KatexOptions` | `'default'` | LaTeX 渲染行为和 KaTeX 配置 |
| `xml` | `'ignore' \| 'warn' \| 'preserve' \| Function` | `'preserve'` | XML 节点处理策略 |

### LaTeX 选项

- **`'ignore'`**: 跳过 LaTeX 渲染
- **`'warn'`**: 为 LaTeX 表达式记录警告
- **`'default'`**: 使用默认 KaTeX 渲染
- **`KatexOptions`**: 自定义 KaTeX 配置对象

### XML 选项

- **`'ignore'`**: 忽略 XML 节点
- **`'warn'`**: 为 XML 节点记录警告
- **`'preserve'`**: 按原样渲染 XML 节点
- **`Function`**: XML 节点的自定义渲染函数

## 开发

### 设置

```bash
# 安装依赖
npm install

# 运行开发服务器
npm run dev

# 构建库
npm run build

# 类型检查
npm run type-check

# 代码检查
npm run lint

# 格式化代码
npm run format
```

### 项目结构

```plaintext
src/
├── KMarkdownVue.vue        # 主组件
├── KMdContent.vue          # 内容包装器
├── KMdNode.vue             # 节点渲染器
├── options.ts              # 类型定义
├── symbols.ts              # Vue provide/inject 符号
├── components/             # 共享组件
│   ├── KMdCode.vue         # 代码高亮
│   └── KMdLatex.vue        # LaTeX 渲染
└── nodesEle/               # 特定元素组件
    ├── index.ts
    ├── KMdEleBold.vue
    ├── KMdEleCodeBlock.vue
    ├── KMdEleLatexBlock.vue
    └── ...                 # 其他元素组件
```

## 依赖项

- **Vue 3**: 核心框架
- **[@kuankuan/k-markdown-parser](https://github.com/kuankuan2007/k-markdown-parser)**: Markdown 解析引擎
- **KaTeX**: LaTeX 数学公式渲染
- **highlight.js**: 代码块语法高亮

## 许可证

本项目基于木兰宽松许可证，第2版（MulanPSL-2.0）授权。

详情请参阅 [LICENSE](./LICENSE)。
