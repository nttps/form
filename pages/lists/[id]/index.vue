<template>
    <div>
        <PartialsTitle prefix="ผล" v-if="form" :title="type" icon="i-ri-chat-poll-fill" :export="exportUrl" back="/lists"/>
       
        <div class="px-8 mt-4 ">
            <div class="mb-4 flex space-x-4">
                <NuxtLink target="_blank" :to="downloadExcel" v-if="downloadExcel" class="text-xl font-bold rounded-lg px-4 py-2 bg-[#FFA133] flex space-x-2 items-center" download>
                    <span>ดาวน์โหลดคำตอบแบบสอบถาม</span>
                </NuxtLink>
            </div>
            <UCard class="mb-4" :ui="{ ring: 'ring-1 ring-[#FFA800] dark:ring-gray-800', header: { background: 'bg-[#FFA800]'}}" id="print-me">
                <template #header>
                    <h2 class="font-bold text-3xl leading-8" v-if="form">หัวข้อ {{ form.survey_name  }}</h2>
                </template>

                <SummaryRegistrants v-if="form && type === 'ฟอร์มสมัคร'" :data="registrants" />
                <SummaryQuestionnaire v-if="form && type === 'แบบสอบถาม'" :data="questionnaire" />
                <SummaryVote v-if="form && type === 'ระบบโหวต' && vote.length > 0 " :data="vote"/>
            </UCard>

            <UCard class="mb-4" :ui="{ ring: 'ring-1 ring-[#FFA800] dark:ring-gray-800', header: { background: 'bg-[#FFA800]'}}" id="print-me" v-if="form && type !== 'ฟอร์มสมัคร'">
                <template #header>
                    <h2 class="font-bold text-3xl leading-8" v-if="form">ข้อแสนอแนะ</h2>
                </template>

                <div class="flex border relative rounded-2xl border-[#FFA800] w-full">
                    <div class="w-full ">
                        <UTable 
                            :rows="comments" 
                            :columns="commentColumns"
                            :loading-state="{ label: 'กำลังโหลด ...' }" 
                            :empty-state="{ label: 'ไม่มีข้อเสนอแนะ' }"
                        />
                    </div>
                </div>
            </UCard>
        </div>
    </div>

    <UModal v-model="printRegister" fullscreen>
        <UCard :ui="{
            base: 'h-full flex flex-col',
            rounded: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
            body: {
                base: 'grow'
            }
            }">
            <template #header>
                <div class="flex items-center">
                    <h3 class="text-xl text-gray-900 dark:text-white">
                        รายงานผู้ทำรายการแบบสอบถาม
                    </h3>
                    <div class="ml-auto text-xl">
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="printRegister = false" />
                    </div>
                </div>
            </template>
            <div class="font-bold text-xl">
                <iframe :src="printUrl" width="100%" style="position: absolute; height: 100%; border: none" frameborder="0"></iframe>
            </div>

        
        </UCard>
    </UModal>
</template>

<script setup>

import { usePaperizer } from 'paperizer'
definePageMeta({
  middleware: ["auth"]
})
const route = useRoute()

const form = ref()
const type = computed(() => form.value.survey_type)
const registrants = ref([]);
const questionnaire = ref([]);
const vote = ref([])
const comments = ref([])
const exportUrl = ref('')
const config = useRuntimeConfig();


const commentColumns = [{
    key: 'username',
    label: 'Username',
    class: 'text-center'
},
{
    key: 'fullName',
    label: 'ชื่อ - นามสกุล',
    class: 'text-center'
},
{
    key: 'comment',
    label: 'ข้อเสนอแนะ',
    class: 'text-center'
}]

const { paperize } = usePaperizer('print-me', {
  styles: [
    '/tailwind.css'
  ]
})
const print = () => {
  paperize()
}

onMounted(() => {
    fetchData()
})

const downloadExcel = ref(config.public.apiUrl + `/api/servey/Submit/ExportSurveyExcelResult?sv_id=${route.params.id}`)

const fetchData = async () => {
    const response = await useApi(`/api/servey/ServeyInfo/GetDocSet?survey_id=${route.params.id}`, 'GET');
    form.value = response.surveyInfo

    fetchRegistrants()
    if(form.value.survey_type === 'แบบสอบถาม') {
        fetchQuestionnaire()
    }

    if(form.value.survey_type === 'ระบบโหวต') {
        fetchVote()
    }

    
}


const fetchRegistrants = async () => {
    const response = await useApi(`/api/servey/Submit/PrintRegister`, 'POST', {
        SearchText:"", //ค้นหา survey_name , description  ,sv_type_name ,ค่าว่างค้นหาทั้งหมด  
        SurveyID: route.params.id,//เลขแบบสอบถาม ไม่ต้องระบุก็ได้ 
        show_excel:1,//0=/ไม่แสดง link 1=แสดง link
        show_pdf:1,//0=/ไม่แสดง link 1=แสดง link
        show_image:1//0=/ไม่แสดง link 1=แสดง link
    });

    registrants.value = response.register
    exportUrl.value = response.url.pdfUrl
}

const fetchQuestionnaire = async () => {
    const response = await useApi(`/api/servey/Submit/GetResultQuestionnaire`, 'POST', {
        SurveyID: route.params.id,//เลขแบบสอบถาม ไม่ต้องระบุก็ได้ 
        show_excel:1,//0=/ไม่แสดง link 1=แสดง link
        show_pdf:1,//0=/ไม่แสดง link 1=แสดง link
        show_image:1//0=/ไม่แสดง link 1=แสดง link
    });

    questionnaire.value = response.quizResult
    exportUrl.value = response.url.pdfUrl
    comments.value = response.comments
}

const fetchVote = async () => {
    const response = await useApi(`/api/servey/Submit/GetResultVote?sv_id=${route.params.id}`, 'GET');

    vote.value = response.resultVote
    comments.value = response.comments
}

const printRegister = ref(false)
const printUrl = ref(false)

</script>

<style lang="scss" scoped>

</style>