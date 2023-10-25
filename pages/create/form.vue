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

    const dateNow = moment().format('YYYY-MM-DDT00:00:00')
    const form = ref({
        survey_id: "",
        ref_id:"",
        survey_name: "",
        description: "",
        survey_type:"ระบบโหวต",
        survey_cate: "",
        department: "", 
        survey_date_from:dateNow,
        survey_date_to:dateNow,
        is_require_login:true,
        status: "ปิด",
        remark:"",
        created_by: "tammon.y",
        questions: [
            {
                quiz_desc: '',
                answer_type: 'ตัวเลือกได้ข้อเดียว',
                quiz_sort: 0,
                placeholder: 'คำถาม',
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
        const response = await surveySubmit(form.value);
        if(response.outputAction.result === 'ok') {

            form.value.questions.forEach()
            quizSubmit()
        }
    }
</script>

<style lang="scss" scoped>
    .question-list-move {
        transition: transform 0.5s;
    }

    .no-move {
        transition: transform 0s;
    }
    .ghost {
        opacity: 0.5;
        padding: .5rem 0;
        background: #c8ebfb;
    }
</style>