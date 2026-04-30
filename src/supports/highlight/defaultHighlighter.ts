import { HighlightByHljs, type HighlightInterface } from './highlighter';

/**
 * Module-level cache for the default highlighter Promise.
 *
 * # Lifecycle
 * - Initialized to `null`. On the first call to `getDefaultHighlighter()` when
 *   `highlight: true` (the default), an IIFE async function is invoked and its
 *   Promise is stored here.
 * - All subsequent calls — including concurrent ones from multiple `<KMdEleCodeBlock>`
 *   instances rendered at the same time — receive the **same Promise**, so
 *   `highlight.js` is dynamically imported at most once per application lifecycle.
 * - Reset to `null` on load failure, allowing a retry if the caller handles the
 *   error and the environment changes (e.g. during development hot-reload).
 */
let _defaultHighlighterPromise: Promise<HighlightInterface> | null = null;

/**
 * Returns a Promise that resolves to the default `HighlightInterface` implementation,
 * which is backed by `highlight.js`.
 *
 * # Dependency contract
 * `highlight.js` is declared as an **optional** peer dependency of this package
 * (`peerDependenciesMeta.highlight.js.optional = true`). This means:
 * - Package managers (npm / pnpm / yarn) will NOT install it automatically.
 * - The library build externalizes it (`rolldownOptions.external`), so the
 *   distributed output contains a bare `import('highlight.js')` expression rather
 *   than bundled hljs code.
 * - Downstream bundlers (Vite, webpack, Rollup ...) **will** analyze that expression
 *   and include `highlight.js` in the application bundle when it is installed --
 *   which is exactly the desired behavior for users who rely on the default configuration.
 * - Users who pass a custom `HighlightInterface` via `highlight: <instance>` never
 *   trigger this function, so `highlight.js` is not required in their project at all.
 *
 * # Error handling
 * If `highlight.js` is not installed, the dynamic import throws a module-not-found
 * error. This function catches it, resets the module-level cache, and re-throws a
 * descriptive error that guides the user toward the correct fix.
 */
export function getDefaultHighlighter(): Promise<HighlightInterface> {
  if (!_defaultHighlighterPromise) {
    _defaultHighlighterPromise = (async () => {
      let hljs: typeof import('highlight.js').default;
      try {
        hljs = (await import('highlight.js')).default;
      } catch {
        // Reset the cache so that if the user fixes the problem (e.g. installs the
        // package) and the module system allows a retry, the next call will try again
        // instead of returning a permanently rejected Promise.
        _defaultHighlighterPromise = null;
        throw new Error(
          '[k-markdown-vue] highlight.js is not installed, but the default code highlighting is enabled.\n\n' +
            'highlight.js is an optional peer dependency of @kuankuan/k-markdown-vue.\n' +
            'It must be installed manually when using the default highlight configuration (highlight: true).\n\n' +
            'To fix this, choose one of the following:\n' +
            '  1. Install highlight.js:          npm install highlight.js\n' +
            '  2. Disable highlighting:          <KMarkdownVue :options="{ highlight: false }" />\n' +
            '  3. Provide a custom highlighter:  <KMarkdownVue :options="{ highlight: myHighlighter }" />\n' +
            '     where myHighlighter implements the HighlightInterface exported by this package.\n'
        );
      }
      return new HighlightByHljs(hljs);
    })();
  }
  return _defaultHighlighterPromise;
}
