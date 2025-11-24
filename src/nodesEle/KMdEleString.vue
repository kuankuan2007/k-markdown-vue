<template>
    <div class="k-md-ele-string">{{ showValue }}</div>
</template>
<script setup lang="ts">
import { computed, inject } from 'vue';
import { parserSymbol } from '../symbles'

const props = defineProps<{
    node: string
}>()

const parser = inject(parserSymbol);


const showValue = computed(() => parser?.inner2Plant ? parser.inner2Plant(props.node) : props.node)

</script>
<style scoped lang="scss">
.k-md-ele-string {
    display: inline;
    white-space: pre-wrap;
}
</style>