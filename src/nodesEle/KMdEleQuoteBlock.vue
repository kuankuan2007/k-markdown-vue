<template>
    <blockquote>
        <slot />
    </blockquote>
</template>
<script setup lang="ts">
import type { KMarkdownQuoteBlockNode } from '@kuankuan/k-markdown-parser/nodes/core';

defineProps<{
    node: KMarkdownQuoteBlockNode
}>()
</script>
<style scoped lang="scss"></style>>