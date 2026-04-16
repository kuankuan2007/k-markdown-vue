<template>
  <k-md-node :node="obj"></k-md-node>
</template>
<script setup lang="ts">
import { KMarkdownParser ,type Option as parserOptions} from '@kuankuan/k-markdown-parser';
import KMdNode from './KMdNode.vue';
import { optionSymbol, parserSymbol } from './symbols';
import type { KMarkdownVueOptions, KMarkdownVueParsedOptions } from './options';
import { computed, markRaw, provide, readonly, type ComputedRef } from 'vue';
import defaultComponents from './nodesEle/default';

const props = defineProps<{ value: string; options?: KMarkdownVueOptions }>();

const options = computed<KMarkdownVueParsedOptions>(() => {
  const merged = Object.assign({}, { components: defaultComponents }, props.options);
  if (merged.components) {
    merged.components = Object.fromEntries(
      [...Object.getOwnPropertyNames(merged.components),...Object.getOwnPropertySymbols(merged.components)].map((k) => [k, markRaw(merged.components![k as keyof typeof merged.components])])
    ) as typeof merged.components;
  }
  return merged;
});

const parser = computed(() => new KMarkdownParser(options.value.parserOptions as parserOptions));

provide(parserSymbol, parser as ComputedRef<KMarkdownParser>);
provide(optionSymbol, readonly(options) as ComputedRef<KMarkdownVueParsedOptions>);

const obj = computed(() => parser.value.parse(props.value));
</script>
<style scoped lang="scss"></style>
