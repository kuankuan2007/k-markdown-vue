<template>
  <component :is="tagName">
    <slot />
  </component>
</template>
<script setup lang="ts">
import { KMarkdownTitleNode } from '@kuankuan/k-markdown-parser/nodes/core';
import { computed, inject } from 'vue';
import { optionSymbol } from '../symbols';

const props = defineProps<{
  node: KMarkdownTitleNode;
}>();

const options = inject(optionSymbol);

const tagName = computed(() => {
  const levelOffset = (options?.value.titleLevelStart ?? 1) - 1;
  const level = (props.node.args.level || 1) + levelOffset;
  const clampedLevel = Math.min(Math.max(level, 1), 6);
  return `h${clampedLevel}`;
});
</script>
<style scoped lang="scss"></style>
