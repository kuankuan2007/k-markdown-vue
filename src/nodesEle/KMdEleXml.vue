<template>
    <div class="k-md-node-xml-warn" v-if="xmlOptions === 'warn'">&lt;XML is not allowed&gt;</div>
    <component v-else-if="xmlOptions === 'preserve'" :is="node.args.name" v-bind="node.args.attributes" >
        <slot />
    </component>
    <component v-else-if="typeof xmlOptions === 'function'" :is="xmlOptions(node) || 'div'" />
</template>
<script setup lang="ts">
import type { KMarkdownXMLNode } from '@kuankuan/k-markdown-parser/nodes/core';
import { optionSymbol } from '../symbles';
import { inject } from 'vue';

defineProps<{
    node: KMarkdownXMLNode
}>()
const xmlOptions = inject(optionSymbol)?.xml || 'warn';
</script>
<style scoped lang="scss">
.k-md-node-xml-warn {
    opacity: 0.5;
}
</style>
