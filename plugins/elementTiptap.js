import ElementTiptapPlugin from "element-tiptap-vue3-fixed";
import "element-tiptap-vue3-fixed/lib/style.css";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(ElementTiptapPlugin);
});
