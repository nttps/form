<template>
    <div>
        <PartialsTitle prefix="ผล" v-if="form" :title="type" icon="i-ri-chat-poll-fill" :export="exportUrl" back="/lists"/>
        <div class="px-8 mt-4">
            <h2 class="font-bold text-3xl leading-8 mb-2" v-if="form">หัวข้อ {{ form.survey_name  }}</h2>
            <ViewRegistrants v-if="form && type === 'ฟอร์มสมัคร'" :data="registrants" />
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
</script>

<style lang="scss" scoped>

</style>