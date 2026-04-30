import type { Option as KMarkdownParserOptions, KMarkdownNode } from '@kuankuan/k-markdown-parser';
import type { KMarkdownXMLNode } from '@kuankuan/k-markdown-parser/nodes/core';
import type { KatexOptions } from 'katex';
import type { Component, VNode } from 'vue';
import { defaultSymbol, stringSymbol } from './symbols';
import type { HighlightInterface } from './supports/highlight';
export type ComponentsList = Record<
  string | typeof defaultSymbol | typeof stringSymbol,
  Component<{ node: KMarkdownNode | string }>
>;

export type XMLOptions =
  | 'ignore'
  | 'warn'
  | 'preserve'
  | ((node: KMarkdownXMLNode) => VNode | void);

export type HighlightOptions = boolean | HighlightInterface;

export type KMarkdownVueOptions = {
  parserOptions?: KMarkdownParserOptions;
  xml?: XMLOptions;
  latex?: 'ignore' | 'warn' | 'default' | KatexOptions;
  components?: ComponentsList;
  highlight?: HighlightOptions;
};
export type KMarkdownVueParsedOptions = {
  parserOptions?: KMarkdownParserOptions;
  xml?: XMLOptions;
  latex?: 'ignore' | 'warn' | 'default' | KatexOptions;
  components: ComponentsList;
  highlight?: KMarkdownVueOptions['highlight'];
};
