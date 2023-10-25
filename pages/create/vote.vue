<template>
    <PartialsTitle prefix="ระบบ" title="โหวต" icon="i-mdi-vote" back/>

    <div class="px-8 mt-4">
        <h3 class="text-xl md:text-2xl font-bold mb-4 flex items-center space-x-2">
            <div>สร้าง<span class="color-primary">โหวต</span></div> 
            <Icon name="i-mdi-pencil" size="25" color="black" />
        </h3>

        <FormVote v-if="vote" :vote="vote" @submit="submit"/>
        
    </div>

    <ModalSuccess v-model="success" title="สร้างผลโหวตเรียบร้อยแล้ว">
        <div class="text-center text-2xl text-green-500">สร้างผลโหวตเรียบร้อยแล้ว</div>
    </ModalSuccess>
</template>

<script setup>
    import moment from 'moment';
    useHead({
        title: `DDPM Questionnaire - สร้างโหวต`,
    })

    const dateNow = moment().format('YYYY-MM-DDT00:00:00')

    const vote = ref({
        survey_id: "",
        ref_id:"",
        survey_name: undefined,
        description: "",
        survey_type:"ระบบโหวต",
        survey_cate: "",
        department: "", 
        vote_type: "",
        survey_date_from:dateNow,
        survey_date_to:dateNow,
        is_require_login:true,
        status: "ปิด",
        answer_type: "ตัวเลือกได้ข้อเดียว",
        remark:"",
        created_by: "tammon.y",
        modified_by: "",
        choices: [
            {
                quiz_desc: 'ตัวเลือกที่ 1',
                answer_type: 'ตัวเลือกได้ข้อเดียว',
                quiz_sort: 0,
            },
        ]
    })

    const success = ref(false)

    

    const submit = async () => {
        const response = await surveySubmit(vote.value);
        if(response.outputAction.result === 'ok') {

            vote.value.choices.forEach()
            quizSubmit()
        }
    }
</script>

<style lang="scss" scoped>
    .drag-list-move {
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