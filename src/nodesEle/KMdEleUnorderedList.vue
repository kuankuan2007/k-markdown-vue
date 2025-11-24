<template>
    <ul class="k-md-ele-unordered-list">
        <slot />
    </ul>
</template>
<script setup lang="ts">
import type { KMarkdownUnorderedListNode } from '@kuankuan/k-markdown-parser/nodes/core';

defineProps<{
    node: KMarkdownUnorderedListNode
}>()
</script>
<style scoped lang="scss"></style>