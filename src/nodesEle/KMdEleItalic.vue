<template>
    <em><slot /></em>
</template>
<script setup lang="ts">
import type { KMarkdownItalicNode } from '@kuankuan/k-markdown-parser/nodes/core';


defineProps<{
    node: KMarkdownItalicNode
}>()

</script>
<style scoped lang="scss">

</style>