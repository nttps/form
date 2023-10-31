<template>
    <div>
        <PartialsTitle prefix="ผล" title="แบบสอบถาม" icon="i-mdi-vote" back/>

        <div class="px-8 mt-4">
            <div class="mb-4">
                <div class="text-center bg-[#FFA133] rounded-t-lg cursor-move py-4"></div>
                <div class="p-4 bg-white">
                    <h2 class="text-xl font-bold">{{ form.survey_name }}</h2>
                    <p>{{ form.description }}</p>
                </div>
            </div>
            <ViewForm v-if="form?.survey_type && form.survey_type == 'แบบสอบถาม'" />
            <div class="mb-4">
                <div class="text-center bg-[#FFA133] rounded-t-lg cursor-move py-4"></div>
                <div class="p-4 bg-white">
                    <div class="text-lg font-bold mb-2">ข้อเสนอแนะ</div>
                    <div class="rounded-md px-2.5 py-1.5 shadow-sm bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400">
                        {{ form.remark }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

    const form = ref(null)

    onMounted(() => {
        fetchData()
    })

    const fetchData = async () => {
        const response = await useApi(`/api/servey/ServeyInfo/GetDocSet?survey_id=${route.params.id}`, 'GET');
        form.value = response.surveyInfo
        form.value.choices = []
        form.value.questions = []

        if(response.surveyInfo.survey_type == "ระบบโหวต") {
            form.value.choices = response.quizSetList[0].answers
        }

        if(response.surveyInfo.survey_type == "แบบสอบถาม") {
            form.value.questions = response.quizSetList
        }
    }

    const title = `DDPM Questionnaire - ${form.value.title}`
    useSeoMeta({
        ogTitle: () => title,
        title: () => title,
        description: () => form.value.description,
        ogDescription: () => form.value.description,
        ogImage: () => 'https://example.com/image.png',
        ogImageUrl: () => 'https://example.com/image.png',
        twitterCard: () => 'summary_large_image',
        twitterTitle: () => title,
        twitterDescription: () => form.value.description,
        twitterImage: () => 'https://example.com/image.png'
    })

    const submit = () => {
        
    }
</script>

<style lang="scss" scoped>
</style>