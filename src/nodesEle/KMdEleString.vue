<template>
  <div class="k-md-ele-string">{{ showValue }}</div>
</template>
<script setup lang="ts">
import { computed, inject } from "vue";
import { parserSymbol } from "../symbols";
import { toPlant } from "../supports/textConverter";

const props = defineProps<{
  node: string;
}>();

const parser = inject(parserSymbol);

const showValue = computed(() => toPlant(props.node, parser?.value));
</script>
<style scoped lang="scss">
.k-md-ele-string {
  display: inline;
  white-space: pre-wrap;
}
</style>
