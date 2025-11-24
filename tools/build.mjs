import esbuild from 'esbuild';
import vuePlugin from 'esbuild-plugin-vue3';

export async function build() {
    return esbuild.build({
        plugins: [vuePlugin()],
        entryPoints: ['src/KMarkdownVue.vue'],
        format: 'esm',
        platform: 'browser',
        outdir: 'dist',
        bundle: true,
        minify: false,
    })
}
build();