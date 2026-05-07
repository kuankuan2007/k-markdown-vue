import type { KMarkdownParser } from "@kuankuan/k-markdown-parser";
import { computed, type Ref } from "vue";

export function toPlant(text: string, parser?: KMarkdownParser) {
    return parser?.inner2Plant?.(text) || text;
}
