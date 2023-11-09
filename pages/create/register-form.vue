<template>
    <div>
        <PartialsTitle prefix="ระบบ" title="แบบฟอร์มสมัคร" icon="i-mdi-file-document-plus" back/>

        <div class="px-8 mt-4">
            <h3 class="text-xl md:text-2xl font-bold mb-4 flex items-center space-x-2">
                <div>สร้าง<span class="color-primary">แบบฟอร์มสมัคร</span></div> 
                <Icon name="i-mdi-pencil" size="25" color="black" />
            </h3>
            <FormRegister v-if="form" :form="form" @submit="confirm = true" :create="true"/>
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
        title: `DDPM Questionnaire - สร้างฟอร์มสมัคร`,
    })

    definePageMeta({
        middleware: ["auth"]
    })

    const toast = useToast()
    const { username } = useAuthStore();

    const dateNow = moment().format('YYYY-MM-DDT00:00:00')

    
    const form = ref({
        survey_id: "",
        ref_id:"",
        survey_name: "",
        description: "",
        survey_type:"ฟอร์มสมัคร",
        survey_cate: "",
        department: "", 
        survey_date_from:dateNow,
        survey_date_to:dateNow,
        is_require_login:true,
        status: "ปิด",
        remark:"",
        created_by: username,
        modified_by: ""
    })
    const confirm = ref(false)

    const submit = async () => {
        const survey = await surveySubmit(form.value);
        if(survey.outputAction.result === 'ok') {
            toast.add({
                id: 'create_form',
                color: 'green',
                title: 'สร้างแบบฟอร์มข้อมูลเรียบร้อยแล้ว',
                icon: 'i-heroicons-check-badge',
                timeout: 2000,
            })

            navigateTo(`/lists/${survey.surveyInfo.survey_id}/edit`)
        }
    }

</script>

<style lang="scss" scoped>
    .question-list-move {
        transition: transform 0.5s;
    }

    .answer-list-move {
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