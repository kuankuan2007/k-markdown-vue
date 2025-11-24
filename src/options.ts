import type { Option as KMarkdownParserOptions } from '@kuankuan/k-markdown-parser';
import type { KMarkdownXMLNode } from '@kuankuan/k-markdown-parser/nodes/core';
import type { VNode } from 'vue';
export type KMarkdownVueOptions = {
  parserOptions?: KMarkdownParserOptions;
  xml?: 'ignore' | 'warn' | 'preserve' | ((node:KMarkdownXMLNode)=>VNode|void);
};