<template>
    <div class="k-md-cmp-code">
        <pre v-if="!props.inline"><code v-html="res.value"></code></pre>
        <code v-else v-html="res.value"></code>
        <div class="lang">{{ lang }}</div>
    </div>
</template>
<script setup lang="ts">
import hljs from 'highlight.js';
import { computed } from 'vue';

const props = defineProps<{
    content: string,
    language?: string,
    inline: boolean,
}>()
const res = computed(() => {
    return (props.language ? hljs.highlight(props.content, { language: props.language, ignoreIllegals: true }) : hljs.highlightAuto(props.content))
})
const lang = computed(() => {
    return props.language || res.value.language
})
</script>
<style scoped lang="scss"></style>