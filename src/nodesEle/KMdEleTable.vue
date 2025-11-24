<template>
    <table>
        <thead v-if="(node.content[0] as KMarkdownTableRowNode)?.args?.isHeader">
            <k-md-node v-for="row in (node.content as KMarkdownTableRowNode[]).filter(r => r?.args?.isHeader)"
                :node="row as KMarkdownTableRowNode" />
        </thead>
        <tbody>
            <k-md-node v-for="row in (node.content as KMarkdownTableRowNode[]).filter(r => !r?.args?.isHeader)"
                :node="row as KMarkdownTableRowNode" />
        </tbody>
    </table>
</template>
<script setup lang="ts">
import type { KMarkdownTableNode, KMarkdownTableRowNode } from '@kuankuan/k-markdown-parser/nodes/core';
import KMdNode from '../KMdNode.vue';
defineProps<{
    node: KMarkdownTableNode
}>()
</script>
<style scoped lang="scss"></style>