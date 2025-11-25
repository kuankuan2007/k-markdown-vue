<template>
    <div class="k-md-ele-latex-block">
        <k-md-latex :content="node.content.join(' ')" :inline="true"></k-md-latex>
    </div>
</template>
<script setup lang="ts">
import type { KMarkdownLatexBlockNode } from '@kuankuan/k-markdown-parser/nodes/core';

import KMdLatex from '../components/KMdLatex.vue';

defineProps<{
    node: KMarkdownLatexBlockNode
}>()

</script>
<style scoped lang="scss"></style>
