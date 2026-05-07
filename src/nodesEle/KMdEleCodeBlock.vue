<template>
  <div class="k-md-ele-code-block">
    <div class="k-md-ele-code-block-inner">
      <k-md-support-highlight
        :node="props.node"
        :options="highlightOptions"
        @resolve-info="handleResolveInfo"
      ></k-md-support-highlight>
    </div>
    <slot name="assistant" :info="info" :code="content" :node="props.node"
      ><div class="lang">{{ lang }}</div></slot
    >
  </div>
</template>
<script setup lang="ts">
import type { HighlightOptions } from "../options";
import KMdSupportHighlight from "../supports/highlight/KMdSupportHighlight.vue";
import type { KMarkdownCodeBlockNode } from "@kuankuan/k-markdown-parser/nodes/core";
import { optionSymbol, parserSymbol } from "../symbols";
import { computed, inject, ref } from "vue";
import type { HighlighterInfo } from "../supports/highlight";
import { toPlant } from "../supports/textConverter";

const props = defineProps<{
  node: KMarkdownCodeBlockNode;
}>();

const emits = defineEmits<{
  (e: "resolve-info", info: HighlighterInfo): void;
}>();

const options = inject(optionSymbol);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const info = ref<(HighlighterInfo & { [key: string]: any }) | undefined>(undefined);
function handleResolveInfo(newInfo: HighlighterInfo) {
  info.value = newInfo;
  emits("resolve-info", newInfo);
}

const resolvedLang = ref<string | undefined>(props.node.args.language);

const parser = inject(parserSymbol);
const content = computed(() => toPlant(props.node.content.join("\n"), parser?.value));

const highlightOptions = computed<HighlightOptions>(() => {
  return options?.value.highlight ?? true;
});

const lang = computed(() => {
  return resolvedLang.value;
});
</script>
<style scoped lang="scss"></style>
