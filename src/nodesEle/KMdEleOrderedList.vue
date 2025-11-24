<template>
    <ol>
        <slot />
    </ol>
</template>
<script setup lang="ts">
import type { KMarkdownOrderedListNode } from '@kuankuan/k-markdown-parser/nodes/core';

defineProps<{
    node: KMarkdownOrderedListNode
}>()
</script>
<style scoped lang="scss"></style>