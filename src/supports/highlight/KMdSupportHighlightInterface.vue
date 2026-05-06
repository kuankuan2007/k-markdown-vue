<template>
  <code v-if="res" v-html="res.html"></code>
  <code v-else>{{ content }}</code>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import type { HighlighterInfo, HighlighterResult, HighlightInterface } from "./index";

const props = defineProps<{
  content: string;
  hilightInterface: HighlightInterface;
  lang?: string;
}>();

const emits = defineEmits<{
  (e: "resolve-info", info: HighlighterInfo): void;
}>();

const res = ref<HighlighterResult>();

watch(
  () => [props.content, props.lang, props.hilightInterface] as const,
  ([content, lang, hilightInterface]) => {
    const result = hilightInterface.highlight({ code: content, preferLang: lang });
    if ("then" in result && typeof result.then === "function") {
      Promise.resolve(result).then(
        (result) => {
          res.value = result;
        },
        (err) => {
          console.error(err);
        }
      );
    }
    return result;
  },
  { immediate: true, deep: true }
);

watch(
  res,
  (newVal) => {
    if (newVal) {
      emits("resolve-info", newVal.info);
    }
  },
  { immediate: true, deep: true }
);

defineExpose({
  res,
});
</script>
<style scoped lang="scss"></style>
