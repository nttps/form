<template>
  <el-tiptap
    :content="props.modelValue"
    :extensions="extensions"
    :enable-char-count="false"
    lang="en"
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
  Heading,
  Bold,
  Underline,
  Italic,
  TextAlign,
  FontSize,

  Strike,
  BulletList,
  OrderedList,
  Link,
  Indent,
  FormatClear,
  Color,
  Image,
  Highlight,
  SelectAll,
} from "element-tiptap-vue3-fixed";


const props = defineProps(['modelValue', 'height'])

console.log(props);
const emit = defineEmits(['update:modelValue'])

const onEditorUpdate = (val) => {
  emit('update:modelValue', val)
}

const extensions = [
    Doc,
    Text,
    Paragraph,
    Bold,
    Underline,
    Italic,
    FontSize,
    Heading,
    Color,
    Highlight,
    TextAlign,
    Strike,
    BulletList,
    OrderedList,
    Image.configure({
      draggable: true
    }),
    Link.configure({ bubble: true }),
    Indent,
    FormatClear,
    SelectAll,
]

</script>

<style lang="scss">
/* Basic editor styles */

.el-tiptap-editor__content {
  padding: 1rem 2rem !important;
  font-family: 'Kanit', sans-serif;
}

h1 {
  @apply text-3xl leading-8
}
h2 {
  @apply text-2xl
}
h3 {
  @apply text-xl
}
h4 {
  @apply text-lg
}
h5 {
  @apply text-base
}
h6 {
  @apply text-sm
}

</style>
