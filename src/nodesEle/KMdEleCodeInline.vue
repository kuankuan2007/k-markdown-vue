<template>
    <code v-html="res.value"></code>
</template>
<script setup lang="ts">
import type { KMarkdownCodeInlineNode } from '@kuankuan/k-markdown-parser/nodes/core';
import hljs from 'highlight.js';
import { computed } from 'vue';

const props = defineProps<{
    node: KMarkdownCodeInlineNode
}>()
const res = computed(() => {
    return hljs.highlightAuto(props.node.content.join(' '))
})
</script>
<style scoped lang="scss">

</style>