<template>
    <div class="k-md-node-default">
        <slot />
    </div>
</template>
<script setup lang="ts">
import type { KMarkdownNode } from '@kuankuan/k-markdown-parser';

defineProps<{
    node: KMarkdownNode
}>()
</script>
<style scoped lang="scss"></style>