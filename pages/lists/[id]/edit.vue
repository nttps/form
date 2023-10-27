<template>
    <div>
        <PartialsTitle prefix="ระบบ" title="โหวตและแบบสอบถาม" icon="i-mdi-file-document-plus" back="/lists"/>
        <div class="px-8 mt-4">
            <h3 class="text-xl md:text-2xl font-bold mb-4 flex items-center space-x-2">
                <div>แก้ไข<span class="color-primary">แบบฟอร์ม</span></div> 
                <Icon name="i-mdi-pencil" size="25" color="black" />
            </h3>

            <FormRegister v-if="form?.survey_type && form.survey_type == 'ฟอร์มสมัคร'" :form="form" @submit="submit"/>
            <FormVote v-if="form?.survey_type && form.survey_type == 'ระบบโหวต'" :vote="form" @submit="submit"/>
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

        if(response.surveyInfo.survey_type == "ระบบโหวต") {
            form.value.choices = response.quizSetList[0].answers
        }

        if(response.surveyInfo.survey_type == "แบบสอบถาม") {
            form.value.questions = response.quizSetList
        }
    }

    const submit = async () => {
        const response = await surveySubmit(form.value);
        if(response.outputAction.result === 'ok') {
            toast.add({
                id: 'edit_form',
                color: 'green',
                title: 'แก้ไขข้อมูลเรียบร้อยแล้ว',
                icon: 'i-heroicons-check-badge',
                timeout: 1000,
            })

            const quizId = response.quizSetList[0].quiz.quiz_id

            if(response.surveyInfo.survey_type = "ระบบโหวต") {
                for (let index = 0; index < form.value.choices.length; index++) {
                    const answer = form.value.choices[index];
                    answer.quiz_id = quizId
                    answer.modified_by = ''
                    answer.answer_sort = (index + 1)

                    const res = await answerSubmit(answer);
                    console.log(res);
                }
            }
            fetchData()
        }
    }

</script>

<style lang="scss" scoped>

</style>