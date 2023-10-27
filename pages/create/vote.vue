<template>
    <div>
        <PartialsTitle prefix="ระบบ" title="โหวต" icon="i-mdi-vote" back/>

        <div class="px-8 mt-4">
            <h3 class="text-xl md:text-2xl font-bold mb-4 flex items-center space-x-2">
                <div>สร้าง<span class="color-primary">โหวต</span></div> 
                <Icon name="i-mdi-pencil" size="25" color="black" />
            </h3>

            <FormVote v-if="vote" :vote="vote" @submit="submit" :loadingSubmit="loadingSubmit"/>
            
        </div>
        <ModalSuccess v-model="success" title="สร้างแบบฟอร์มโหวตเรียบร้อยแล้ว" close>
            <div class="flex justify-between">
                <button type="button" class="px-4 py-2 bg-green-600 text-base rounded-[5px] text-white" @click="navigateTo(`/lists/${vote.survey_id}/edit`)">เข้าแบบฟอร์มแบบสมัคร</button>
                <button type="button" class="px-4 py-2 bg-gray-500 text-base rounded-[5px] text-white" @click="navigateTo(`/lists`)">กลับสู่หน้าหลัก</button>
            </div>
        </ModalSuccess>
    </div>
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
                answer: 'ตัวเลือกที่ 1',
                answer_id: '',
                image: null,
                answer_type: 'ตัวเลือกได้ข้อเดียว',
                answer_sort: 1,
            },
        ]
    })

    const success = ref(false)
    const loadingSubmit = ref(false)
    
    const submit = async () => {
        loadingSubmit.value = true

        const survey = await surveySubmit(form.value);

        const { status } = await submitVote(vote, survey)

        if(status) {
            vote.value = survey.surveyInfo
            success.value = status
        }
        loadingSubmit.value = false
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