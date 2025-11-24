import KMdEleDefault from './KMdEleDefault.vue';
import KMdEleTitle from './KMdEleTitle.vue';
import KMdEleParagraph from './KMdEleParagraph.vue';
import KMdEleBold from './KMdEleBold.vue';
import KMdEleLink from './KMdEleLink.vue';
import KMdEleString from './KMdEleString.vue';
import type { KMarkdownNode } from '@kuankuan/k-markdown-parser';
import { defaultSymbol, stringSymbol } from '../symbles';
import KMdEleCodeInline from './KMdEleCodeInline.vue';
import KMdEleCodeBlock from './KMdEleCodeBlock.vue';
import KMdEleQuoteBlock from './KMdEleQuoteBlock.vue';
import KMdEleUnorderedListItem from './KMdEleUnorderedListItem.vue';
import KMdEleUnorderedList from './KMdEleUnorderedList.vue';
import KMdEleOrderedList from './KMdEleOrderedList.vue';
import KMdEleOrderedListItem from './KMdEleOrderedListItem.vue';
import KMdEleLineBetween from './KMdEleLineBetween.vue';
import KMdEleItalic from './KMdEleItalic.vue';
import KMdEleEmail from './KMdEleEmail.vue';
import KMdEleDeleteLine from './KMdEleDeleteLine.vue';
import KMdEleSubscript from './KMdEleSubscript.vue';
import KMdEleSuperscript from './KMdEleSuperscript.vue';
import KMdEleTable from './KMdEleTable.vue';
import KMdEleTableRow from './KMdEleTableRow.vue';
import KMdEleXml from './KMdEleXml.vue';

export const components = {
  [defaultSymbol]: KMdEleDefault,
  [stringSymbol]: KMdEleString,
  paragraph: KMdEleParagraph,
  title: KMdEleTitle,
  bold: KMdEleBold,
  italic: KMdEleItalic,
  link: KMdEleLink,
  email: KMdEleEmail,
  'code-inline': KMdEleCodeInline,
  'code-block': KMdEleCodeBlock,
  'quote-block': KMdEleQuoteBlock,
  'unordered-list-item': KMdEleUnorderedListItem,
  'unordered-list': KMdEleUnorderedList,
  'ordered-list-item': KMdEleOrderedListItem,
  'ordered-list': KMdEleOrderedList,
  'line-between': KMdEleLineBetween,
  'delete-line': KMdEleDeleteLine,
  subscript: KMdEleSubscript,
  superscript: KMdEleSuperscript,
  table: KMdEleTable,
  'table-row': KMdEleTableRow,
  'xml': KMdEleXml
};

export default function getComponent(node: string | KMarkdownNode) {
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
