<template>
  <code v-html="res.html"></code>
</template>
<script setup lang="ts">
import { computed, watchEffect } from "vue";
import type { HighlighterInfo, HighlightInterface } from "./index";

const props = defineProps<{
  content: string;
  hilightInterface: HighlightInterface;
  lang?: string;
}>();

const emits = defineEmits<{
  (e: "resolve-info", info: HighlighterInfo): void;
}>();

const res = computed(() =>
  props.hilightInterface.highlight({ code: props.content, preferLang: props.lang })
);

watchEffect(() => {
  emits("resolve-info", res.value.info);
});

defineExpose({
  res,
});
</script>
<style scoped lang="scss"></style>
