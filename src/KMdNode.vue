<template>
  <component :is="is as any" :class="[`k-md-node-${nodeId}`]" :node="node">
    <k-md-content :content="(node as KMarkdownNode).content" />
  </component>
</template>
<script setup lang="ts">
import { KMarkdownNode } from '@kuankuan/k-markdown-parser';
import { optionSymbol } from './symbols';
import getComponent, { getNodeId } from './nodesEle/index';
import KMdContent from './KMdContent.vue';
import { computed, inject } from 'vue';

const props = defineProps<{
  node: KMarkdownNode | string;
}>();
const options = inject(optionSymbol);

const is = computed(() => getComponent(props.node, options!.value.components));
const nodeId = computed(() => getNodeId(props.node));
</script>
<style scoped lang="scss"></style>
