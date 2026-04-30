<template>
  <div class="k-md-node-xml-warn" v-if="options === 'warn'">&lt;XML is not allowed&gt;</div>
  <component v-else-if="options === 'preserve'" :is="node.args.name" v-bind="node.args.attributes">
    <slot />
  </component>
  <component v-else-if="typeof options === 'function'" :is="options(node) || 'div'" />
</template>
<script setup lang="ts">
import type { XMLOptions } from '../options';
import type { KMarkdownXMLNode } from '@kuankuan/k-markdown-parser/nodes/core';

defineProps<{
  node: KMarkdownXMLNode;
  options: XMLOptions;
}>();
</script>
<style scoped lang="scss"></style>
