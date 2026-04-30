<template>
  <code v-html="res.html"></code>
</template>
<script setup lang="ts">
import { computed, watchEffect } from "vue";
import type { HighlightInterface } from "./index";

const props = defineProps<{
  content: string;
  hilightInterface: HighlightInterface;
  lang?: string;
}>();

const emits = defineEmits<{
  (e: "resolved", result: { html: string; lang?: string }): void;
}>();

const res = computed(() =>
  props.hilightInterface.highlight({ code: props.content, lang: props.lang })
);

watchEffect(() => {
  emits("resolved", res.value);
});

defineExpose({
  res,
});
</script>
<style scoped lang="scss"></style>
