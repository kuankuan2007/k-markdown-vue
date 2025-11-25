<template>
    <k-md-node :node="obj"></k-md-node>
</template>
<script setup lang="ts">
import KMarkdownParser from '@kuankuan/k-markdown-parser'
import KMdNode from './KMdNode.vue'
import { optionSymbol, parserSymbol } from './symbles'
import type { KMarkdownVueOptions } from './options';
import { computed, provide, readonly, toRef } from 'vue';

const props = defineProps<{ value: string, options?: KMarkdownVueOptions }>()

const parser = computed(() => new KMarkdownParser(props.options?.parserOptions))

provide(parserSymbol, parser)
provide(optionSymbol, readonly(toRef(() => props.options || {})))

const obj = computed(() => parser.value.parse(props.value))
</script>
<style scoped lang="scss"></style>
