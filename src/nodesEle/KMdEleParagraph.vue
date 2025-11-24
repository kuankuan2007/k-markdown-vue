<template>
    <p class="k-md-node-pargraph">
        <slot />
    </p>
</template>
<script setup lang="ts">
import type { KMarkdownParagraphNode } from '@kuankuan/k-markdown-parser/nodes/core';


defineProps<{
    node: KMarkdownParagraphNode
}>()

</script>
<style scoped lang="scss">
.k-md-node-pargraph {
    * {
        display: inline;
    }
}
</style>