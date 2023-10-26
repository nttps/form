<template>
    <div>
        <PartialsTitle prefix="ระบบ" title="โหวตและแบบสอบถาม" icon="i-mdi-file-document-plus" back="/lists"/>
        <div class="px-8 mt-4">
            <h3 class="text-xl md:text-2xl font-bold mb-4 flex items-center space-x-2">
                <div>แก้ไข<span class="color-primary">แบบฟอร์ม</span></div> 
                <Icon name="i-mdi-pencil" size="25" color="black" />
            </h3>

            <FormRegister v-if="form?.survey_type && form.survey_type == 'ฟอร์มสมัคร'" :form="form" @submit="submit"/>
            <FormVote v-if="form?.survey_type && form.survey_type == 'ระบบโหวต'" :vote="form" @submit="submit" :loadingSubmit="loadingSubmit"/>
            <FormQuestion v-if="form?.survey_type && form.survey_type == 'แบบสอบถาม'" :form="form" @submit="submit"/>
        </div>
    </div>
</template>

<script setup>

    const route = useRoute()
    const toast = useToast()
    const form = ref(null)
    onMounted(() => {
        fetchData()
    })

    const fetchData = async () => {
        const response = await useApi(`/api/servey/ServeyInfo/GetDocSet?survey_id=${route.params.id}`, 'GET');
        form.value = response.surveyInfo
        form.value.choices = []
        form.value.questions = []

        if(response.surveyInfo.survey_type = "ระบบโหวต") {
            form.value.choices = response.quizSetList[0].answers
        }
    }

    const loadingSubmit = ref(false)


    const submit = async () => {
        loadingSubmit.value = true
        const survey = await surveySubmit(form.value);

        if(form.value.survey_type = "ระบบโหวต") {
            const { status } = await submitVote(form, survey)
            if(status) {
                toast.add({
                    id: 'edit_form',
                    color: 'green',
                    title: 'แก้ไขข้อมูลเรียบร้อยแล้ว',
                    icon: 'i-heroicons-check-badge',
                    timeout: 1000,
                })
            }
        }
        fetchData()

        loadingSubmit.value = false
    }

</script>

<style lang="scss" scoped>

</style>