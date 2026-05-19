import type { Option as KMarkdownParserOptions, KMarkdownNode } from '@kuankuan/k-markdown-parser';
import type { KMarkdownXMLNode } from '@kuankuan/k-markdown-parser/nodes/core';
import type { KatexOptions } from 'katex';
import { computed, markRaw, ref, watch, type Component, type Ref, type VNode } from 'vue';
import { defaultSymbol, stringSymbol } from './symbols';
import type { HighlightInterface } from './supports/highlight';
import { defaultComponents } from './nodesEle';
export type ComponentsList = Record<
  string | typeof defaultSymbol | typeof stringSymbol,
  Component<{ node: KMarkdownNode | string }>
>;

export type XMLOptions = 'ignore' | 'warn' | 'show' | ((node: KMarkdownXMLNode) => VNode | void);

export type LatexOptions = 'ignore' | 'warn' | 'show' | KatexOptions;

export type HighlightOptions = boolean | HighlightInterface;

export const defaultTitleLevelStart: number = 1;
export const defaultXMLOptions: XMLOptions = 'warn';
export const defaultLatexOptions: LatexOptions = 'warn';
export const defaultHighlightOptions: HighlightOptions = true;

export type KMarkdownVueOptions = {
  parserOptions?: KMarkdownParserOptions;
  xml?: XMLOptions;
  latex?: LatexOptions;
  components?: ComponentsList;
  highlight?: HighlightOptions;
  titleLevelStart?: number;
};
export type KMarkdownVueParsedOptions = {
  readonly parserOptions?: KMarkdownParserOptions;
  readonly xml: XMLOptions;
  readonly latex: LatexOptions;
  readonly components: Readonly<ComponentsList>;
  readonly highlight: HighlightOptions;
  readonly titleLevelStart: number;
};
export function compomentsOptionsMarkRaw(components: ComponentsList) {
  return Object.fromEntries(
    [...Object.getOwnPropertyNames(components), ...Object.getOwnPropertySymbols(components)].map(
      (k) => [k, markRaw(components[k as keyof typeof components])]
    )
  ) as typeof components;
}
export function parseOptions(options: KMarkdownVueOptions | undefined): KMarkdownVueParsedOptions {
  const merged = Object.assign(
    {},
    {
      components: defaultComponents,
      xml: defaultXMLOptions,
      latex: 'default',
      highlight: defaultHighlightOptions,
      titleLevelStart: defaultTitleLevelStart,
    },
    options ?? {}
  );
  if (merged.components) {
    merged.components = compomentsOptionsMarkRaw(merged.components);
  }
  return merged;
}
export function computedParseOptions(
  options: KMarkdownVueOptions | undefined
): Readonly<Ref<KMarkdownVueParsedOptions>> {
  const res = ref<KMarkdownVueParsedOptions>(parseOptions(options));
  watch(
    ref(options),
    (newOptions) => {
      res.value = parseOptions(newOptions);
    },
    { deep: true }
  );
  return computed(() => res.value);
}
