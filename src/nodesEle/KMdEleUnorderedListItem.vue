<template>
    <li class="k-md-ele-unordered-list-item">
        <slot />
    </li>
</template>
<script setup lang="ts">
import type { KMarkdownUnorderedListItemNode } from '@kuankuan/k-markdown-parser/nodes/core';

defineProps<{
    node: KMarkdownUnorderedListItemNode;
}>();

</script>
<style scoped lang="scss"></style>