<template>
    <a :href="node.args.href" target="_blank" :title="node.args.alt">
        <slot />
    </a>
</template>
<script setup lang="ts">
import { KMarkdownLinkNode } from '@kuankuan/k-markdown-parser/nodes/core';

defineProps<{
    node: KMarkdownLinkNode
}>()


</script>
<style scoped lang="scss"></style>