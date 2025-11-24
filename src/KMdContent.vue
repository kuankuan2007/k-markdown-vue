<template>
    <template v-for="item in content">
        <k-md-node :node="item" />
    </template>
</template>
<script setup lang="ts">
import { KMarkdownNode } from '@kuankuan/k-markdown-parser'
import KMdNode from './KMdNode.vue';
defineProps<{
    content: (KMarkdownNode | string)[]
}>()
</script>
<style scoped lang="scss">
.str-node {
    display: inline;
}
</style>