<template>
    
    <div class="block font-medium text-gray-700 dark:text-gray-200">รูปภาพ <span class="text-red-500 text-sm">*ขนาดรูปภาพ 320*200 pixel</span></div>
    <div>
        <img :src="props.form.photo_cover ? props.form.photo_cover_url : `/images/no-cover.jpg`" class="w-full h-[200px] object-cover" alt="">
    </div>
    
    <div class="block font-medium text-gray-700 dark:text-gray-200">สถานะ</div>
    <UToggle
        on-icon="i-heroicons-check-20-solid"
        off-icon="i-heroicons-x-mark-20-solid"
        v-model="status"
        color="green"
        class="mb-4"
    />
    <UFormGroup label="วันที่เริ่มการโหวต" name="title" size="xl" class="mb-2">
        <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton icon="i-heroicons-calendar-days-20-solid" class="md:w-4/5" size="md" :label="surveyDateFrom" />
            <template #panel="{ close }">
                <FormDatePicker v-model="props.form.survey_date_from" @close="close" />
            </template>
        </UPopover>
    </UFormGroup>
    <UFormGroup label="วันที่สิ้นสุดการโหวต" name="title" size="xl" class="mb-2">
        <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton icon="i-heroicons-calendar-days-20-solid" class="md:w-4/5" size="md" :label="surveyDateTo" />
            <template #panel="{ close }">
                <FormDatePicker v-model="props.form.survey_date_to"  @close="close" />
            </template>
        </UPopover>
    </UFormGroup>
</template>

<script setup>
import moment from 'moment';
moment.locale('th')


const props = defineProps(['form'])

const surveyDateFrom = computed(() => props.form.survey_date_from ? moment(props.form.survey_date_from).format('DD/MM/yyyy') : ``)
const surveyDateTo = computed(() => props.form.survey_date_to ? moment(props.form.survey_date_to).format('DD/MM/yyyy')  : ``) 
const status = computed({
  get: () => props.form.status === 'เปิด',
  set: (value) => {
    props.form.status = value ? 'เปิด' : 'ปิด' ;
  }
})
const departments = [{
    name: 'ทั้งหมด',
    value: '',
}, {
    name: 'กก',
    value: 'กก',
}, {
    name: 'กจ',
    value: 'กจ'
}]

const types = []

</script>

<style lang="scss" scoped>

</style>