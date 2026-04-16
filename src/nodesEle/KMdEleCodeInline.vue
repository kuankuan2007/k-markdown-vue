<template>
  <code>{{ node.content.join(' ') }}</code>
</template>
<script setup lang="ts">
import type { KMarkdownCodeInlineNode } from '@kuankuan/k-markdown-parser/nodes/core';

defineProps<{
  node: KMarkdownCodeInlineNode;
}>();
</script>
<style scoped lang="scss"></style>
