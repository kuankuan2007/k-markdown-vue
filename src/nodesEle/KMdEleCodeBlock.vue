<template>
  <div class="k-md-ele-code-block">
    <k-md-support-highlight
      :node="props.node"
      :options="highlightOptions"
      @resolve-info="handleResolveInfo"
    ></k-md-support-highlight>
    <slot name="assistant" :info="info" :code="content" :node="props.node"
      ><div class="lang">{{ lang }}</div></slot
    >
  </div>
</template>
<script setup lang="ts">
import type { HighlightOptions } from "../options";
import KMdSupportHighlight from "../supports/highlight/KMdSupportHighlight.vue";
import type { KMarkdownCodeBlockNode } from "@kuankuan/k-markdown-parser/nodes/core";
import { optionSymbol } from "../symbols";
import { computed, inject, ref } from "vue";
import type { HighlighterInfo } from "../supports/highlight";

const props = defineProps<{
  node: KMarkdownCodeBlockNode;
}>();
const options = inject(optionSymbol);
const info = ref<HighlighterInfo | undefined>(undefined);
function handleResolveInfo(newInfo: HighlighterInfo) {
  info.value = newInfo;
}

const resolvedLang = ref<string | undefined>(props.node.args.language);

const content = computed(() => props.node.content.join("\n"));

const highlightOptions = computed<HighlightOptions>(() => {
  return options?.value.highlight ?? true;
});

const lang = computed(() => {
  return resolvedLang.value;
});
</script>
<style scoped lang="scss"></style>
