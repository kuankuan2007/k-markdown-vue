export abstract class HighlightInterface {
  abstract highlight(options: { code: string; lang?: string }): { html: string; lang?: string };
}

export class HighlightByHljs implements HighlightInterface {
  constructor(private hljs: typeof import('highlight.js').default) {}

  highlight({ code, lang }: { code: string; lang?: string }) {
    if (lang && this.hljs.getLanguage(lang)) {
      return {
        html: this.hljs.highlight(code, { language: lang, ignoreIllegals: true }).value,
        lang: lang,
      };
    }

    const result = this.hljs.highlightAuto(code);
    return { html: result.value, lang: result.language };
  }
}
