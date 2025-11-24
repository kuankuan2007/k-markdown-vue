<template>
    <sub>
        <slot />
    </sub>
</template>
<script setup lang="ts">
import type { KMarkdownSubscriptNode } from '@kuankuan/k-markdown-parser/nodes/core';


defineProps<{
    node: KMarkdownSubscriptNode
}>()

</script>
<style scoped lang="scss"></style>