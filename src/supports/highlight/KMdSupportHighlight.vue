<template>
  <pre><code v-if="options === false">{{ contentShow }}</code
    ><template v-else-if="options === true"
      ><code v-if="!defaultHighlighter">{{ contentShow }}</code
      ><k-md-support-highlight-interface
        v-else
        :content="contentShow"
        :hilightInterface="defaultHighlighter"
        :lang="node.args.language"
        @resolve-info="handleResolveInfo"
      ></k-md-support-highlight-interface
    ></template
    ><k-md-support-highlight-interface
      v-else
      :content="contentShow"
      :hilightInterface="options"
      :lang="node.args.language"
      @resolve-info="handleResolveInfo"></k-md-support-highlight-interface
  ></pre>
</template>
<script setup lang="ts">
import type { HighlightOptions } from '../../options';
import type { KMarkdownCodeBlockNode } from '@kuankuan/k-markdown-parser/nodes/core';
import { computed, inject, shallowRef, watchEffect } from 'vue';
import KMdSupportHighlightInterface from './KMdSupportHighlightInterface.vue';
import { getDefaultHighlighter, type HighlighterInfo, type HighlightInterface } from '.';
import { parserSymbol } from '../../symbols';
import { toPlant } from '../textConverter';

const props = defineProps<{
  node: KMarkdownCodeBlockNode;
  options: HighlightOptions;
}>();
const emits = defineEmits<{
  (e: 'resolve-info', info: HighlighterInfo): void;
}>();

const parser = inject(parserSymbol);
const contentShow = computed(() => toPlant(props.node.content.join("\n"), parser?.value));

const defaultHighlighter = shallowRef<HighlightInterface | null>(null);

function handleResolveInfo(info: HighlighterInfo) {
  emits('resolve-info', info);
}

watchEffect(() => {
  if (props.options === true && !defaultHighlighter.value) {
    getDefaultHighlighter().then((h) => {
      defaultHighlighter.value = h;
    });
  }
});
</script>
<style scoped lang="scss"></style>
