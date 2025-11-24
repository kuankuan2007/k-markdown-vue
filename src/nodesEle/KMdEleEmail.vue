<template>
    <a :href="`mailto:${node.args.email}`" target="_blank" :title="node.args.email">
        <slot />
    </a>
</template>
<script setup lang="ts">
import { KMarkdownEmailNode } from '@kuankuan/k-markdown-parser/nodes/core';

defineProps<{
    node: KMarkdownEmailNode
}>()


</script>
<style scoped lang="scss"></style>