<template>
    <strong class="k-md-ele-bold"><slot /></strong>
</template>
<script setup lang="ts">
import type { KMarkdownBoldNode } from '@kuankuan/k-markdown-parser/nodes/core';


defineProps<{
    node: KMarkdownBoldNode
}>()

</script>
<style scoped lang="scss">
</style>