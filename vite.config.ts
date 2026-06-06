import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { globSync } from 'fs';
import dts from 'vite-plugin-dts';

const inputFiles = globSync('src/**/*.{ts,vue}').reduce((acc: Record<string, string>, file) => {
  const name = file.replace(/^src[\\/]/, '').replace(/\.(ts|vue)$/, '').replace(/\\/g, '/');
  acc[name] = file;
  return acc;
}, {});

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*.{ts,vue}'],
      tsconfigPath: './tsconfig.app.json',
      cleanVueFileName: true,
      insertTypesEntry: true,
      entryRoot: 'src',
    }),
    {
      name: 'rewrite-imports',
      generateBundle(options, bundle) {
        for (const [fileName, chunk] of Object.entries(bundle)) {
          void fileName;
          if (chunk.type === 'chunk') {
            if (options.format === 'es') {
              chunk.code = chunk.code.replace(/(from\s+['"]\.[^'"]+?)\.(vue|ts)(['"])/g, '$1.mjs$3');
            } else {
              chunk.code = chunk.code.replace(/(require\(.*?['"]\.[^'"]+?)\.(vue|ts)(['"]\))/g, '$1.js$3');
            }
          }
        }
      }
    }
  ],
  build: {
    lib: {
      entry: "src/KMarkdownVue.vue",
      name: 'KMarkdownVue',
    },
    rolldownOptions: {
      external: (id) => {
        if (['vue', 'katex', 'highlight.js', '@kuankuan/k-markdown-parser'].includes(id)) return true;
        // Make local files external so they aren't bundled together, ensuring 1:1 mapping
        if (id.startsWith('.') && (id.endsWith('.vue') || id.endsWith('.ts'))) {
          return true;
        }
        return false;
      },
      input: inputFiles,
      output: [
        {
          format: 'es',
          entryFileNames: '[name].mjs',
          chunkFileNames: '[name]-[hash].mjs'
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          chunkFileNames: '[name]-[hash].js'
        }
      ],
    },
  },
});
