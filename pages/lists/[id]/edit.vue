<template>
    <div>
        <PartialsTitle prefix="ระบบ" title="โหวตและแบบสอบถาม" icon="i-mdi-file-document-plus" back="/lists"/>
        <div class="px-8 mt-4">
            <h3 class="text-xl md:text-2xl font-bold mb-4 flex items-center space-x-2">
                <div>แก้ไข<span class="color-primary">แบบฟอร์ม</span></div> 
                <Icon name="i-mdi-pencil" size="25" color="black" />
            </h3>

            <FormRegister v-if="form?.survey_type && form.survey_type == 'ฟอร์มสมัคร'" :form="form" :permissions="permissions" @submit="submit" @fetchData="fetchData"/>
            <FormVote v-if="form?.survey_type && form.survey_type == 'ระบบโหวต'" :vote="form" :permissions="permissions" @submit="submit" @fetchData="fetchData"/>
            <FormQuestion v-if="form?.survey_type && form.survey_type == 'แบบสอบถาม'" :form="form" :permissions="permissions" @submit="submit" @fetchData="fetchData"/>
        </div>
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: ["auth"]
    })
    const route = useRoute()
    const toast = useToast()
    const form = ref(null)

    const permissions = ref({
        all: [],
        user: []
    })
    onMounted(() => {
        fetchData()
    })

    const fetchData = async () => {
        const response = await useApi(`/api/servey/ServeyInfo/GetDocSet?survey_id=${route.params.id}`, 'GET');
        form.value = response.surveyInfo
        form.value.choices = []
        form.value.questions = []
        permissions.value.all = response.permission
        permissions.value.user = response.permissionUser


        if(response.surveyInfo.survey_type == "ระบบโหวต") {
            form.value.choices = response.quizSetList[0].answers
        }

        if(response.surveyInfo.survey_type == "แบบสอบถาม") {
            form.value.questions = response.quizSetList
        }
    }

    const submit = async () => {
        const survey = await surveySubmit(form.value);

        let status;

        if(survey.surveyInfo.survey_type == "ฟอร์มสมัคร") {
            status = (survey.outputAction.result === 'ok')
        }

        if(survey.surveyInfo.survey_type == "ระบบโหวต") {
            const res = await submitVote(form, survey)

            status = res.status
        }
        if(survey.surveyInfo.survey_type == "แบบสอบถาม") {
            const res = await submitQuestion(form, survey)
            status = res.status
        }

        if (status) {
            toast.add({
                id: 'edit_form',
                color: 'green',
                title: 'แก้ไขข้อมูลเรียบร้อยแล้ว',
                icon: 'i-heroicons-check-badge',
                timeout: 1000,
            })

            navigateTo(`/lists`)
        }
        //fetchData()
    }

</script>

<style lang="scss" scoped>

</style>