<template>
    <div>
        <PartialsTitle prefix="ระบบ" title="โหวต" icon="i-mdi-vote" back/>

        <div class="px-8 mt-4">
            <h3 class="text-xl md:text-2xl font-bold mb-4 flex items-center space-x-2">
                <div>สร้าง<span class="color-primary">โหวต</span></div> 
                <Icon name="i-mdi-pencil" size="25" color="black" />
            </h3>

            <FormVote v-if="vote" :vote="vote" @submit="confirmSubmit" :loadingSubmit="loadingSubmit" :create="true"/>
            
        </div>
        <ModalSuccess v-model="confirm" title="แจ้งเตือน" close>
            <div class="text-2xl text-center font-bold pb-4">ยืนยันการสร้างแบบฟอร์ม</div>
            <div class="flex justify-end space-x-3">
                <button type="button" class="px-4 py-2 bg-green-600 text-base rounded-[5px] text-white" @click="submit">ยืนยัน</button>
                <button type="button" class="px-4 py-2 bg-gray-500 text-base rounded-[5px] text-white" @click="confirm = false">ทำรายการต่อ</button>
            </div>
        </ModalSuccess>
    </div>
</template>

<script setup>
    import moment from 'moment';
    useHead({
        title: `DDPM Questionnaire - สร้างโหวต`,
    })

    definePageMeta({
        middleware: ["auth"]
    })
    const toast = useToast()
    const { username } = useAuthStore();

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
        created_by: username,
        modified_by: "",
        choices: [
            {
                answer: '',
                answer_id: '',
                image: null,
                answer_type: 'ตัวเลือกได้ข้อเดียว',
                answer_sort: 1,
            },
        ]
    })

    const loadingSubmit = ref(false)
    const confirm = ref(false)


    const confirmSubmit = () => {

        const start = moment(vote.value.survey_date_from, 'YYYY-MM-DDT00:00:00')
        const end = moment(vote.value.survey_date_to, 'YYYY-MM-DDT00:00:00')

        if(end.isBefore(start)){
            alertDateModal.value = true
            messageAlert.value = 'กรุณาเลือกวันที่ให้ถูกต้อง วันที่เริ่มไม่ควรมากกว่าวันที่สิ้นสุด'

            return
        }

        confirm.value = true
    }
    
    const submit = async () => {
        confirm.value = false
        const survey = await surveySubmit(vote.value);
        const { status } = await submitVote(vote, survey)
        if(status) {
            toast.add({
                id: 'create_form',
                color: 'green',
                title: 'สร้างแบบฟอร์มข้อมูลเรียบร้อยแล้ว',
                icon: 'i-heroicons-check-badge',
                timeout: 2000,
            })

            navigateTo(`/lists`)
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