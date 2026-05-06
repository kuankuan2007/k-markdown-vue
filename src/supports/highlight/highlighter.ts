export abstract class HighlightInterface<ResultInfo extends HighlighterInfo=HighlighterInfo> {
  abstract highlight(options: {
    code: string;
    preferLang?: string;
  }): HighlighterResult<ResultInfo> | Promise<HighlighterResult<ResultInfo>>;
}

export type HighlighterResult<Info extends HighlighterInfo = HighlighterInfo> = {
  html: string;
  info: Info;
};
export type HighlighterInfo = {
  langSupported: boolean;
  usingLang?: string;
  illegal?: boolean;
};

export class HighlightByHljs implements HighlightInterface {
  constructor(private hljs: typeof import('highlight.js').default) {}

  highlight({ code, preferLang }: { code: string; preferLang?: string }) {
    if (!preferLang || !this.hljs.getLanguage(preferLang)) {
      const result = this.hljs.highlightAuto(code);
      return {
        html: result.value,
        info: { langSupported: false, usingLang: result.language, illegal: result.illegal },
      };
    } else {
      const result = this.hljs.highlight(code, { language: preferLang, ignoreIllegals: true });
      return {
        html: result.value,
        info: { langSupported: true, usingLang: preferLang, illegal: result.illegal },
      };
    }
  }
}
