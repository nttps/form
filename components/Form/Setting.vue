<template>
    
    <div class="block font-medium text-gray-700 dark:text-gray-200">รูปภาพ <span class="text-red-500 text-sm">*ขนาดรูปภาพ 320*200 pixel</span></div>
    <div class="text-center">
        <img :src="(props.form.photo_cover || props.form.cover_path) ? props.form.photo_cover_url : `/images/no-cover.jpg`" class="w-full h-[200px] object-contain" alt="">
        <label class="inline-block mt-2 rounded-full mr-4 py-2 px-4 bg-amber-50 text-amber-500 cursor-pointer text-sm" for="coverImage">
            {{ (props.form.photo_cover || props.form.cover_path) ? `เปลี่ยน` : `เลือก` }}รูปภาพหน้าปก
            <input type="file" id="coverImage" class="hidden" @change="pickImage"/>
        </label>
    </div>
    
    <div class="block font-medium text-gray-700 dark:text-gray-200">สถานะ</div>
    <UToggle
        on-icon="i-heroicons-check-20-solid"
        off-icon="i-heroicons-x-mark-20-solid"
        v-model="status"
        color="green"
        class="mb-4"
    />
    <UFormGroup label="วันที่เริ่มการโหวต" name="survey_date_from" size="xl" class="mb-2">
        <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton icon="i-heroicons-calendar-days-20-solid" class="md:w-4/5" size="md" :label="surveyDateFrom" />
            <template #panel="{ close }">
                <FormDatePicker v-model="props.form.survey_date_from" @close="close" />
            </template>
        </UPopover>
    </UFormGroup>
    <UFormGroup label="วันที่สิ้นสุดการโหวต" name="survey_date_to" size="xl" class="mb-2">
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


const types = []

const pickImage = (e) => {
    let file = e.target.files
    props.form.cover_path = file[0]
    if (file && file[0]) {
        let reader = new FileReader
        reader.onload = e => {
            props.form.photo_cover_url = e.target.result
        }
        reader.readAsDataURL(file[0])
    }
}

</script>

<style lang="scss" scoped>

</style>