<template>
    <div>
        <PartialsTitle prefix="ระบบ" title="แบบสอบถาม" icon="i-mdi-file-document-plus" back/>

        <div class="px-8 mt-4">
            <h3 class="text-xl md:text-2xl font-bold mb-4 flex items-center space-x-2">
                <div>สร้าง<span class="color-primary">แบบสอบถาม</span></div> 
                <Icon name="i-mdi-pencil" size="25" color="black" />
            </h3>

            <FormQuestion v-if="form" :form="form" @submit="submit"/>
            
        </div>
    </div>
</template>

<script setup>
    import moment from 'moment';
    useHead({
        title: `DDPM Questionnaire - สร้างแบบสอบถาม`,
    })

    const toast = useToast()


    const dateNow = moment().format('YYYY-MM-DDT00:00:00')
    const form = ref({
        survey_id: "",
        ref_id:"",
        survey_name: "",
        answer_type: "",
        description: "",
        survey_type:"แบบสอบถาม",
        survey_cate: "",
        department: "", 
        survey_date_from:dateNow,
        survey_date_to:dateNow,
        is_require_login:true,
        status: "ปิด",
        remark:"",
        created_by: "tammon.y",
        modified_by: "",
        questions: [
            {
                quiz: {
                    quiz_desc: '',
                    answer_type: 'ตัวเลือกได้ข้อเดียว',
                    quiz_sort: 0,
                    placeholder: 'คำถาม',
                },
                answers: [{
                    answer: 'ตัวเลือกที่ 1',
                    quiz_img: '',
                    quiz_img_url: '',
                    answer_sort: 0,
                }]
            },
        ]
    })

    const submit = async () => {
        const survey = await surveySubmit(form.value);

        const { status } = await submitQuestion(form, survey)
        if(status) {
            toast.add({
                id: 'edit_form',
                color: 'green',
                title: 'แก้ไขข้อมูลเรียบร้อยแล้ว',
                icon: 'i-heroicons-check-badge',
                timeout: 1000,
            })

            await navigateTo(`/lists/${survey.surveyInfo.survey_id}/edit`)
        }
       
    }
</script>

<style lang="scss" scoped>

</style>