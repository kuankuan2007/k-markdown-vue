<template>
  <pre><code v-if="options === false">{{ node.content.join('\n') }}</code
    ><template v-else-if="options === true"
      ><code v-if="!defaultHighlighter">{{ node.content.join('\n') }}</code
      ><k-md-support-highlight-interface
        v-else
        :content="node.content.join('\n')"
        :hilightInterface="defaultHighlighter"
        :lang="node.args.language"
        @resolved="handleResolved"
      ></k-md-support-highlight-interface
    ></template
    ><k-md-support-highlight-interface
      v-else
      :content="node.content.join('\n')"
      :hilightInterface="options"
      :lang="node.args.language"
      @resolved="handleResolved"></k-md-support-highlight-interface
  ></pre>
</template>
<script setup lang="ts">
import type { HighlightOptions } from '../../options';
import type { KMarkdownCodeBlockNode } from '@kuankuan/k-markdown-parser/nodes/core';
import { shallowRef, watchEffect } from 'vue';
import KMdSupportHighlightInterface from './KMdSupportHighlightInterface.vue';
import { getDefaultHighlighter, type HighlightInterface } from '.';

const props = defineProps<{
  node: KMarkdownCodeBlockNode;
  options: HighlightOptions;
}>();
const emits = defineEmits<{
  (e: 'resolved-lang', lang?: string): void;
}>();

const defaultHighlighter = shallowRef<HighlightInterface | null>(null);

function handleResolved(result: { html: string; lang?: string }) {
  emits('resolved-lang', result.lang || props.node.args.language);
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
