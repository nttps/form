<script setup lang="ts">
import moment from 'moment';
import { DatePicker as VCalendarDatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'

const props = defineProps({
  modelValue: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['update:model-value', 'close'])
const date = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:model-value', moment(value).format('YYYY-MM-DDT00:00:00'))
    emit('close')
  }
})
const attrs = [{
    key: 'today',
    highlight: {
        color: 'orange',
        fillMode: 'outline',
        class: '!bg-gray-100 dark:!bg-gray-800'
    },
    masks: {
      input: 'DD/MM/YYYY',
    },
    dates: new Date()
}]
</script>
<template>
  <VCalendarDatePicker
    v-model="date"
    transparent
    borderless
    :attributes="attrs"
    title-position="left"
    color="orange"
    trim-weeks
    :first-day-of-week="2"
    :min-date="new Date()"
    hide-time-header
    locale="th"
  />
</template>