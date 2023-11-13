<template>
    
    <div class="block font-medium text-gray-700 dark:text-gray-200">รูปภาพ <span class="text-red-500 text-sm">*ขนาดรูปภาพ 320*200 pixel</span></div>
    <div class="text-center">
        <img :src="(props.form.photo_cover || props.form.cover_path) ? props.form.photo_cover_url : `/images/no-cover.jpg`" class="w-full h-[200px] object-contain" alt="">
        <label class="inline-block mt-2 rounded-full mr-4 py-2 px-4 bg-amber-50 text-amber-500 cursor-pointer text-sm" for="coverImage">
            {{ (props.form.photo_cover || props.form.cover_path) ? `เปลี่ยน` : `เลือก` }}รูปภาพหน้าปก
            <input type="file" id="coverImage" class="hidden" @change="pickImage"/>
        </label>
    </div>
    
    <div class="block font-medium text-gray-700 dark:text-gray-200">แสดงแบบฟอร์ม</div>
    <UToggle
        on-icon="i-heroicons-check-20-solid"
        off-icon="i-heroicons-x-mark-20-solid"
        v-model="status"
        color="green"
        class="mb-4"
        :disabled="props.form.status === 'เปิด'"
        @update:model-value="updatePublic"
    />
    <div class="block font-medium text-gray-700 dark:text-gray-200">จำเป็นต้อง Login</div>
    <UToggle
        on-icon="i-heroicons-check-20-solid"
        off-icon="i-heroicons-x-mark-20-solid"
        v-model="needLogin"
        color="green"
        :disabled="props.form.status === 'เปิด'"
        class="mb-4"
    />
    <UFormGroup :label="labelStartDate" name="survey_date_from" size="xl" class="mb-2">
        <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton icon="i-heroicons-calendar-days-20-solid" class="md:w-4/5" size="md" :label="surveyDateFrom" :disabled="props.form.status === 'เปิด'" />
            <template #panel="{ close }">
                <FormDatePicker v-model="props.form.survey_date_from" @close="close"  @update:model-value="validateStartDate" />
            </template>
        </UPopover>
    </UFormGroup>
    <UFormGroup :label="labelEndDate" name="survey_date_to" size="xl" class="mb-2">
        <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton icon="i-heroicons-calendar-days-20-solid" class="md:w-4/5" size="md" :label="surveyDateTo" :disabled="props.form.status === 'เปิด'"/>
            <template #panel="{ close }">
                <FormDatePicker v-model="props.form.survey_date_to"  @close="close" @update:model-value="validateEndDate" />
            </template>
        </UPopover>
    </UFormGroup>
    <UModal v-model="alertDateModal">
        <div class="text-xl text-center py-4 font-bold text-red-600">
            {{ messageAlert }}
        </div>
    </UModal>

    <ModalSuccess v-model="alertPublicModal" title="แจ้งเตือน">
        <div class="text-2xl text-center font-bold pb-2">เมื่อเปิดการแสดงแบบฟอร์ม จะไม่สามารถแก้ไขข้อมูลได้ <br /> ยืนยันการเปิดแบบฟอร์มใช่หรือไม่</div>
        <div class="flex justify-center space-x-3">
            <button type="button" class="px-4 py-2 bg-green-600 text-base rounded-[5px] text-white" @click="props.form.status = 'เปิด';alertPublicModal = false">ยืนยัน</button>
            <button type="button" class="px-4 py-2 bg-red-600 text-base rounded-[5px] text-white" @click="props.form.status = 'ปิด';alertPublicModal = false">ไม่ยืนยัน</button>
        </div>
    </ModalSuccess>
   
</template>

<script setup>
import moment from 'moment';
moment.locale('th')


const props = defineProps(['form'])
const alertDateModal = ref(false)
const messageAlert = ref('')
const alertPublicModal = ref(false)
 
const surveyDateFrom = computed(() => props.form.survey_date_from ? moment(props.form.survey_date_from).format('DD/MM/yyyy') : ``)
const surveyDateTo = computed(() => props.form.survey_date_to ? moment(props.form.survey_date_to).format('DD/MM/yyyy')  : ``) 
const status = computed({
  get: () => props.form.status === 'เปิด',
  set: (value) => {
    props.form.status = value ? 'เปิด' : 'ปิด' ;
  }
})

const labelStartDate = computed(() => {
    if(props.form.survey_type === 'ระบบโหวต') {
        return 'วันที่เริ่มการโหวต'
    }else if (props.form.survey_type === 'แบบสอบถาม') {
        return 'วันที่เริ่มตอบแบบสอบถาม'
    }else if (props.form.survey_type === 'ฟอร์มสมัคร') {
        return 'วันที่เริ่มต้นสมัคร'
    }
})

const labelEndDate = computed(() => {
    if(props.form.survey_type === 'ระบบโหวต') {
        return 'วันที่สิ้นสุดการโหวต'
    }else if (props.form.survey_type === 'แบบสอบถาม') {
        return 'วันที่สิ้นสุดตอบแบบสอบถาม'
    }else if (props.form.survey_type === 'ฟอร์มสมัคร') {
        return 'วันที่สิ้นสุดการสมัคร'
    }
})
const needLogin = computed({
  get: () => props.form.is_require_login,
  set: (value) => {
    props.form.is_require_login = value;
  }
})

const validateEndDate = (value) => {
  

    const end = moment(value, 'YYYY-MM-DDT00:00:00')
    const start = moment(props.form.survey_date_from, 'YYYY-MM-DDT00:00:00')

    if(end.isBefore(start)){
        props.form.survey_date_to = props.form.survey_date_from

        alertDateModal.value = true
        messageAlert.value = 'กรุณาเลือกวันที่ให้ถูกต้อง วันที่สิ้นสุดไม่ควรน้อยกว่าวันที่เริ่ม'
    }
}

const validateStartDate = (value) => {
  

    const start = moment(value, 'YYYY-MM-DDT00:00:00')
    const end = moment(props.form.survey_date_to, 'YYYY-MM-DDT00:00:00')

    if(end.isBefore(start)){
        props.form.survey_date_from = props.form.survey_date_to

        alertDateModal.value = true
        messageAlert.value = 'กรุณาเลือกวันที่ให้ถูกต้อง วันที่เริ่มไม่ควรมากกว่าวันที่สิ้นสุด'
    }
}

const updatePublic = (value) => {

    if(value) {
        alertPublicModal.value = true
    }
}

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