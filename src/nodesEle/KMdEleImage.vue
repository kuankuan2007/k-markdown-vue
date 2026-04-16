<template>
  <img :src="node.args.src" :alt="node.args.alt" />
</template>
<script setup lang="ts">
import { KMarkdownImageNode } from '@kuankuan/k-markdown-parser/nodes/core';

defineProps<{
  node: KMarkdownImageNode;
}>();
</script>
<style scoped lang="scss"></style>
