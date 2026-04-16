<template>
  <div class="k-md-ele-code-block">
    <pre><code v-html="res.value"></code></pre>
    <slot name="assistant" :lang="lang" :code="content" :node="props.node"
      ><div class="lang">{{ lang }}</div></slot
    >
  </div>
</template>
<script setup lang="ts">
import type { KMarkdownCodeBlockNode } from '@kuankuan/k-markdown-parser/nodes/core';
import hljs from 'highlight.js';
import { computed } from 'vue';

const props = defineProps<{
  node: KMarkdownCodeBlockNode;
}>();
const content = computed(() => props.node.content.join('\n'));
const res = computed(() => {
  return props.node.args.language
    ? hljs.highlight(content.value, { language: props.node.args.language, ignoreIllegals: true })
    : hljs.highlightAuto(content.value);
});
const lang = computed(() => {
  return props.node.args.language || res.value.language;
});
</script>
<style scoped lang="scss"></style>
