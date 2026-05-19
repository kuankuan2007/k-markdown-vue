<template>
  <div class="k-md-ele-latex-block">
    <k-md-support-latex
      :content="showValue"
      :inline="true"
      :options="options?.latex ?? defaultLatexOptions"
    ></k-md-support-latex>
  </div>
</template>
<script setup lang="ts">
import type { KMarkdownLatexInlineNode } from "@kuankuan/k-markdown-parser/nodes/core";

import KMdSupportLatex from "../supports/KMdSupportLatex.vue";
import { computed, inject } from "vue";
import { optionSymbol, parserSymbol } from "../symbols";
import { defaultLatexOptions } from "../options";
import { toPlant } from "../supports/textConverter";

const options = inject(optionSymbol);

const props = defineProps<{
  node: KMarkdownLatexInlineNode;
}>();

const parser = inject(parserSymbol);
const showValue = computed(() => toPlant(props.node.content.join(" "), parser?.value));
</script>
<style scoped lang="scss"></style>
