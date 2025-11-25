<template>
    <k-md-code :content="node.content.join(' ')" :inline="false" :language="node.args.language"></k-md-code>
</template>
<script setup lang="ts">
import type { KMarkdownCodeInlineNode } from '@kuankuan/k-markdown-parser/nodes/core';

import KMdCode from '../components/KMdCode.vue';
defineProps<{
    node: KMarkdownCodeInlineNode
}>()
</script>
<style scoped lang="scss"></style>