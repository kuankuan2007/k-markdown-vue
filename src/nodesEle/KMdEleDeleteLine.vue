<template>
    <del>
        <slot />
    </del>
</template>
<script setup lang="ts">
import type { KMarkdownDeleteLineNode } from '@kuankuan/k-markdown-parser/nodes/core';


defineProps<{
    node: KMarkdownDeleteLineNode
}>()

</script>
<style scoped lang="scss"></style>