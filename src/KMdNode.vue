<template>
    <component :is="is as any"
        :class="[`k-md-node-${nodeId}`]" :node="node">
        <k-md-content :content="(node as KMarkdownNode).content" />
    </component>
</template>
<script setup lang="ts">
import { KMarkdownNode } from '@kuankuan/k-markdown-parser'
import getComponentByType, { getNodeId } from './nodesEle/index.ts';
import KMdContent from './KMdContent.vue';
import { computed } from 'vue';

const props = defineProps<{
    node: KMarkdownNode | string
}>()


const is = computed(() => getComponentByType(props.node));
const nodeId = computed(() => getNodeId(props.node));


</script>
<style scoped lang="scss"></style>