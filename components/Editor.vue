<template>
  <el-tiptap
    :content="props.modelValue"
    :extensions="extensions"
    :enable-char-count="false"
    lang="en"
    placeholder=""
    :height="props.height ?? `200px`"
    @onUpdate="onEditorUpdate"
  />
</template>

<script setup>

// load all highlight.js languages
import {
  // necessary extensions
  Doc,
  Text,
  Paragraph,
  //_______________________
  Bold,
  Underline,
  Italic,
  TextAlign,
  FontSize,
  Strike,
  BulletList,
  OrderedList,
  Table,
  Link,
  Blockquote,
  Indent,
  FormatClear,
  Color,
  Highlight,
  SelectAll,
  FontFamily,
} from "element-tiptap-vue3-fixed";


const props = defineProps(['modelValue', 'height'])
const emit = defineEmits(['update:modelValue'])

const onEditorUpdate = (val) => {
  emit('update:modelValue', val)
}

const extensions = [
    Doc,
    Text,
    Paragraph,
    Bold.configure({ bubble: true }),
    Underline.configure({ bubble: true }),
    Italic.configure({ bubble: true }),
    FontSize,
    FontFamily,
    Color,
    Highlight,
    TextAlign,
    Strike,
    BulletList,
    OrderedList,
    Table.configure({ resizable: true }),
    Link.configure({ bubble: true }),
    Blockquote,
    Indent,
    FormatClear,
    SelectAll,
]

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  pre {
    background: #0d0d0d;
    border-radius: 0.5rem;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }
}
</style>
