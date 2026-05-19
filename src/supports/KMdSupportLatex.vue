<template>
  <div class="k-markdown-cmp-latex">
    <div
      class="content"
      v-if="typeof options === 'object' || options === 'show'"
      ref="contentDom"
    ></div>
    <div class="warn" v-else-if="options === 'warn'">&lt;LaTeX is not allowed&gt;</div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, useTemplateRef, watch } from 'vue';
import { type LatexOptions } from '../options';
import katex, { type KatexOptions } from 'katex';
import 'katex/dist/katex.css';

const props = defineProps<{
  content: string;
  inline: boolean;
  options: LatexOptions;
}>();
const contentDom = useTemplateRef('contentDom');
onMounted(() => {
  watch(
    () => [props, contentDom.value] as const,
    ([props, dom]) => {
      if (props.options === 'ignore' || props.options === 'warn') return;
      if (!dom) return;
      render(props.content, props.options, props.inline, dom);
    },
    { immediate: true, deep: true }
  );
});

function render(
  content: string,
  options: 'show' | KatexOptions,
  inline: boolean = false,
  dom: HTMLElement
) {
  katex.render(content, dom, {
    displayMode: !inline,
    ...(typeof options === 'object' ? options : ({ throwOnError: false } as KatexOptions)),
  });
}
</script>
<style scoped>
.k-markdown-cmp-latex .warn {
  opacity: 0.5;
}
</style>
