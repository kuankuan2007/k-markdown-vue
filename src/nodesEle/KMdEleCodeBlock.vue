<template>
    <div>
        <pre><code v-html="res.value"></code></pre>
        <div class="lang">{{ lang }}</div>
    </div>
</template>
<script setup lang="ts">
import hljs from 'highlight.js';
import type { KMarkdownCodeBlockNode } from '@kuankuan/k-markdown-parser/nodes/core';
import { computed } from 'vue';

const props = defineProps<{
    node: KMarkdownCodeBlockNode
}>()
const res = computed(() => {
    return (props.node.args.language ? hljs.highlight(props.node.content.join('\n'), { language: props.node.args.language, ignoreIllegals: true }) : hljs.highlightAuto(props.node.content.join('\n')))
})
const lang = computed(() => {
    return props.node.args.language || res.value.language
})
</script>
<style scoped lang="scss"></style>