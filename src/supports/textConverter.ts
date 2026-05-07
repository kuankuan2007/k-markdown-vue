import type { KMarkdownParser } from "@kuankuan/k-markdown-parser";

export function toPlant(text: string, parser?: KMarkdownParser) {
    return parser?.inner2Plant?.(text) || text;
}
