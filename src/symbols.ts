import type { KMarkdownParser } from '@kuankuan/k-markdown-parser';
import type { KMarkdownVueParsedOptions } from './options';
import type { ComputedRef, InjectionKey } from 'vue';

export const defaultSymbol = Symbol();
export const stringSymbol = Symbol();

export const parserSymbol = Symbol() as InjectionKey<ComputedRef<KMarkdownParser>>;
export const optionSymbol = Symbol() as InjectionKey<
  Readonly<ComputedRef<KMarkdownVueParsedOptions>>
>;
