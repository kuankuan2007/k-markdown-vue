<template>
    <tr>
        <component :is="node.args.isHeader ? 'th' : 'td'" v-for="cell in node.content">
            <k-md-node :node="cell as KMarkdownTableCellNode" />
        </component>
    </tr>
</template>
<script setup lang="ts">
import type { KMarkdownTableCellNode, KMarkdownTableRowNode } from '@kuankuan/k-markdown-parser/nodes/core';
import KMdNode from '../KMdNode.vue';

defineProps<{
    node: KMarkdownTableRowNode
}>()

</script>
<style scoped lang="scss"></style>