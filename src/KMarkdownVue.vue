<template>
  <k-md-node :node="obj"></k-md-node>
</template>
<script setup lang="ts">
import { KMarkdownParser, type Option as parserOptions } from '@kuankuan/k-markdown-parser';
import KMdNode from './KMdNode.vue';
import { optionSymbol, parserSymbol } from './symbols';
import {
  computedParseOptions,
  type KMarkdownVueOptions,
  type KMarkdownVueParsedOptions,
} from './options';
import { computed, provide, readonly, type ComputedRef } from 'vue';

const props = defineProps<{ value: string; options?: KMarkdownVueOptions }>();

const options = computedParseOptions(props.options);
const parser = computed(() => new KMarkdownParser(options.value.parserOptions as parserOptions));

provide(parserSymbol, parser as ComputedRef<KMarkdownParser>);
provide(optionSymbol, readonly(options) as ComputedRef<KMarkdownVueParsedOptions>);

const obj = computed(() => parser.value.parse(props.value));
</script>
<style scoped lang="scss"></style>
