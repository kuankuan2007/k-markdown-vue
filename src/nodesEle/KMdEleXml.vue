<template>
  <k-md-support-xml :node="node" :options="xmlOptions"></k-md-support-xml>
</template>
<script setup lang="ts">
import type { KMarkdownXMLNode } from '@kuankuan/k-markdown-parser/nodes/core';
import { optionSymbol } from '../symbols';
import { computed, inject } from 'vue';
import KMdSupportXml from '../supports/KMdSupportXml.vue';
defineProps<{
  node: KMarkdownXMLNode;
}>();
const xmlOptions = computed(() => inject(optionSymbol)?.value.xml || 'warn');
</script>
<style scoped lang="scss">
.k-md-node-xml-warn {
  opacity: 0.5;
}
</style>
