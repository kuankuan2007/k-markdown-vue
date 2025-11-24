<template>
    <sup>
        <slot />
    </sup>
</template>
<script setup lang="ts">
import type { KMarkdownSuperscriptNode } from '@kuankuan/k-markdown-parser/nodes/core';


defineProps<{
    node: KMarkdownSuperscriptNode
}>()

</script>
<style scoped lang="scss"></style>