<template>
    <div>
        <PartialsTitle prefix="ผล" v-if="form" :title="type" icon="i-ri-chat-poll-fill" :export="exportUrl" back="/lists"/>
        <div class="px-8 mt-4 ">
            <UCard class="mb-4" :ui="{ ring: 'ring-1 ring-[#FFA800] dark:ring-gray-800', header: { background: 'bg-[#FFA800]'}}">
                <template #header>
                    <h2 class="font-bold text-3xl leading-8" v-if="form">หัวข้อ {{ form.survey_name  }}</h2>
                </template>

                <SummaryRegistrants v-if="form && type === 'ฟอร์มสมัคร'" :data="registrants" />
                <SummaryQuestionnaire v-if="form && type === 'แบบสอบถาม'" :data="questionnaire" />
                <SummaryVote v-if="form && type === 'ระบบโหวต' && vote.length > 0 " :data="vote"/>
            </UCard>

            
            
        </div>
    </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"]
})
const route = useRoute()

const form = ref()
const type = computed(() => form.value.survey_type)
const registrants = ref([]);
const questionnaire = ref([]);
const vote = ref([])

const exportUrl = ref('')
onMounted(() => {
    fetchData()
})

const fetchData = async () => {
    const response = await useApi(`/api/servey/ServeyInfo/GetDocSet?survey_id=${route.params.id}`, 'GET');
    form.value = response.surveyInfo

    if(form.value.survey_type === 'ฟอร์มสมัคร') {
        fetchRegistrants()
    }
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
}

const fetchVote = async () => {
    const response = await useApi(`/api/servey/Submit/GetResultVote?sv_id=${route.params.id}`, 'GET');

    vote.value = response
}
</script>

<style lang="scss" scoped>

</style>