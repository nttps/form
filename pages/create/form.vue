<template>
    <div>
        <PartialsTitle prefix="ระบบ" title="แบบสอบถาม" icon="i-mdi-file-document-plus" back/>

        <div class="px-8 mt-4">
            <h3 class="text-xl md:text-2xl font-bold mb-4 flex items-center space-x-2">
                <div>สร้าง<span class="color-primary">แบบสอบถาม</span></div> 
                <Icon name="i-mdi-pencil" size="25" color="black" />
            </h3>

            <FormQuestion v-if="form" :form="form" @submit="confirmSubmit" :create="true"/>
            
        </div>

        <ModalSuccess v-model="confirm" title="แจ้งเตือน" close>
            <div class="text-2xl text-center font-bold pb-4">ยืนยันการสร้างแบบฟอร์ม</div>
            <div class="flex justify-end space-x-3">
                <button type="button" class="px-4 py-2 bg-green-600 text-base rounded-[5px] text-white" @click="submit">ยืนยัน</button>
                <button type="button" class="px-4 py-2 bg-gray-500 text-base rounded-[5px] text-white" @click="confirm = false">ทำรายการต่อ</button>
            </div>
        </ModalSuccess>

        <UModal v-model="alertDateModal">
            <div class="text-xl text-center py-4 font-bold text-red-600">
                {{ messageAlert }}
            </div>
        </UModal>
    </div>

   
</template>

<script setup>
    import moment from 'moment';
    useHead({
        title: `DDPM Questionnaire - สร้างแบบสอบถาม`,
    })
    definePageMeta({
        middleware: ["auth"]
    })

    const { username } = useAuthStore();

    const toast = useToast()
    const confirm = ref(false)

    const alertDateModal = ref(false)
    const messageAlert = ref('')


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
        created_by: username,
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
                    answer: '',
                    quiz_img: '',
                    quiz_img_url: '',
                    answer_sort: 0,
                }]
            },
        ]
    })

    const confirmSubmit = () => {

        
        const start = moment(form.value.survey_date_from, 'YYYY-MM-DDT00:00:00')
        const end = moment(form.value.survey_date_to, 'YYYY-MM-DDT00:00:00')

        if(end.isBefore(start)){
            alertDateModal.value = true
            messageAlert.value = 'กรุณาเลือกวันที่ให้ถูกต้อง วันที่เริ่มไม่ควรมากกว่าวันที่สิ้นสุด'

            return
        }

        confirm.value = true
    }

    const submit = async () => {

       

        confirm.value = false
        const survey = await surveySubmit(form.value);
        const { status } = await submitQuestion(form, survey)
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

</style>