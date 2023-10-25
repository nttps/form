<template>
    <div class="block font-medium text-gray-700 dark:text-gray-200">รูปภาพ</div>
    
    <div class="block font-medium text-gray-700 dark:text-gray-200">เวลาร่วมโหวต</div>
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