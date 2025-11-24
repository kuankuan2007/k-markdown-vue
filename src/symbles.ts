import type KMarkdownParser from "@kuankuan/k-markdown-parser";
import type { KMarkdownVueOptions } from "./options";
import type { InjectionKey } from "vue";

export const defaultSymbol = Symbol();
export const stringSymbol = Symbol();

export const parserSymbol = Symbol() as InjectionKey<KMarkdownParser>;
export const optionSymbol = Symbol() as InjectionKey<KMarkdownVueOptions>;
