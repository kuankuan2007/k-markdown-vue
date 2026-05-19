<template>
  <k-md-support-xml
    :node="node"
    :options="options?.xml || defaultXMLOptions"
  ></k-md-support-xml>
</template>
<script setup lang="ts">
import type { KMarkdownXMLNode } from "@kuankuan/k-markdown-parser/nodes/core";
import { optionSymbol } from "../symbols";
import { inject } from "vue";
import KMdSupportXml from "../supports/KMdSupportXml.vue";
import { defaultXMLOptions } from "../options";
defineProps<{
  node: KMarkdownXMLNode;
}>();
const options = inject(optionSymbol);
</script>
<style scoped lang="scss">
.k-md-node-xml-warn {
  opacity: 0.5;
}
</style>
