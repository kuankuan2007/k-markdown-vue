import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: 'KMarkdownVue',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rolldownOptions: {
      external: ['vue', 'katex', 'highlight.js', '@kuankuan/k-markdown-parser'],
    },
  },
});
