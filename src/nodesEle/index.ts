import type { ComponentsList } from "../options";
import { defaultSymbol, stringSymbol } from '../symbols';
import type { KMarkdownNode } from "@kuankuan/k-markdown-parser";

export default function getComponent(node: string | KMarkdownNode, components: ComponentsList) {
  if (typeof node === 'string') {
    return components[stringSymbol];
  } else {
    return components[node.id as keyof typeof components] || components[defaultSymbol];
  }
}
export function getNodeId(node: string | KMarkdownNode) {
  if (typeof node === 'string') {
    return 'string';
  } else {
    return node.id;
  }
}