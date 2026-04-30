import type { KMarkdownParser } from '@kuankuan/k-markdown-parser';
import type { KMarkdownVueOptions } from './options';
import type { ComputedRef, InjectionKey } from 'vue';

export const defaultSymbol = Symbol.for('@kuankuan/k-markdown-vue#defaultSymbol');
export const stringSymbol = Symbol.for('@kuankuan/k-markdown-vue#stringSymbol');

export const parserSymbol = Symbol.for('@kuankuan/k-markdown-vue#parserSymbol') as InjectionKey<
  ComputedRef<KMarkdownParser>
>;
export const optionSymbol = Symbol.for('@kuankuan/k-markdown-vue#optionSymbol') as InjectionKey<
  ComputedRef<KMarkdownVueOptions>
>;
