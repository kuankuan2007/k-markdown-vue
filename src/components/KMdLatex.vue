<template>
    <div class="k-markdown-cmp-latex">
        <div class="content" v-if="typeof options?.latex === 'object' || options?.latex === 'default'" ref="contentDom"></div>
        <div class="warn" v-else-if="options?.latex === 'warn'">&lt;LaTeX is not allowed&gt;</div>
    </div>
</template>
<script setup lang="ts">
import { inject, onMounted, useTemplateRef, watch } from 'vue';
import type { KMarkdownVueOptions } from '../options';
import katex, { type KatexOptions } from 'katex';
import 'katex/dist/katex.css';
import { optionSymbol } from '../symbles';

const props = defineProps<{
    content: string,

    inline: boolean,
}>()
const contentDom = useTemplateRef('contentDom');
onMounted(() => {
    watch(() => [props.content, options?.value.latex, props.inline, contentDom.value], () => {
        if (options?.value.latex === 'ignore' || options?.value.latex === 'warn') return;
        if (!contentDom.value) return;
        render(props.content, options?.value.latex, props.inline, contentDom.value);
    }, { immediate: true, deep: true })
});
const options = inject(optionSymbol);

function render(
    content: string,
    options: KMarkdownVueOptions['latex'],
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