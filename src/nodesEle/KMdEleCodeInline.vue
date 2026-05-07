<template>
  <code>{{ showValue }}</code>
</template>
<script setup lang="ts">
import type { KMarkdownCodeInlineNode } from "@kuankuan/k-markdown-parser/nodes/core";
import { computed, inject } from "vue";
import { parserSymbol } from "../symbols";
import { toPlant } from "../supports/textConverter";

const props = defineProps<{
  node: KMarkdownCodeInlineNode;
}>();

const parser = inject(parserSymbol);
const showValue = computed(() => toPlant(props.node.content.join(" "), parser?.value));
</script>
<style scoped lang="scss"></style>
