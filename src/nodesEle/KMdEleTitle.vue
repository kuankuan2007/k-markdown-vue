<template>
    <component :is="tagName">
        <slot />
    </component>
</template>
<script setup lang="ts">
import { KMarkdownTitleNode } from '@kuankuan/k-markdown-parser/nodes/core';
import { computed } from 'vue';

const props = defineProps<{
    node: KMarkdownTitleNode
}>()

const tagName = computed(() => {
    const level = props.node.args.level || 1;
    const clampedLevel = Math.min(Math.max(level, 1), 6);
    return `h${clampedLevel}`;
})
</script>
<style scoped lang="scss"></style>