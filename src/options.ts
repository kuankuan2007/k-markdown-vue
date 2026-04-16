import type { Option as KMarkdownParserOptions, KMarkdownNode } from '@kuankuan/k-markdown-parser';
import type { KMarkdownXMLNode } from '@kuankuan/k-markdown-parser/nodes/core';
import type { KatexOptions } from 'katex';
import type { Component, VNode } from 'vue';
import { defaultSymbol, stringSymbol } from './symbols';
export type ComponentsList = Record<
  string | typeof defaultSymbol | typeof stringSymbol,
  Component<{ node: KMarkdownNode | string }>
>;

export type KMarkdownVueOptions = {
  parserOptions?: KMarkdownParserOptions;
  xml?: 'ignore' | 'warn' | 'preserve' | ((node: KMarkdownXMLNode) => VNode | void);
  latex?: 'ignore' | 'warn' | 'default' | KatexOptions;
  components?: ComponentsList;
};
export type KMarkdownVueParsedOptions = {
  parserOptions?: KMarkdownParserOptions;
  xml?: 'ignore' | 'warn' | 'preserve' | ((node: KMarkdownXMLNode) => VNode | void);
  latex?: 'ignore' | 'warn' | 'default' | KatexOptions;
  components: ComponentsList;
};
