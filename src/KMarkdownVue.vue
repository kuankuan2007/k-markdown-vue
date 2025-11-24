<template>
    <k-md-node :node="obj"></k-md-node>
</template>
<script setup lang="ts">
import KMarkdownParser from '@kuankuan/k-markdown-parser'
import KMdNode from './KMdNode.vue'
import { optionSymbol, parserSymbol } from './symbles'
import type { KMarkdownVueOptions } from './options';
import { computed, provide } from 'vue';

const { value, options={} } = defineProps<{ value: string, options?: KMarkdownVueOptions }>()


const parser = new KMarkdownParser(options?.parserOptions)

provide(parserSymbol, parser)
provide(optionSymbol, options)
const obj = computed(() => parser.parse(value))
</script>
<style scoped lang="scss"></style>
