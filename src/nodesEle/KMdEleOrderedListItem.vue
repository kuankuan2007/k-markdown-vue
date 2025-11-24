<template>
    <li :value="node.args.indexInWriting">
        <slot />
    </li>
</template>
<script setup lang="ts">
import type { KMarkdownOrderedListItemNode } from '@kuankuan/k-markdown-parser/nodes/core';

defineProps<{
    node: KMarkdownOrderedListItemNode;
}>();

</script>
<style scoped lang="scss"></style>