<template>
    <PartialsTitle prefix="ระบบ" title="แบบฟอร์มสมัคร" icon="i-mdi-file-document-plus" back/>

    <div class="px-8 mt-4">
        <h3 class="text-xl md:text-2xl font-bold mb-4 flex items-center space-x-2">
            <div>สร้าง<span class="color-primary">แบบฟอร์มสมัคร</span></div> 
            <Icon name="i-mdi-pencil" size="25" color="black" />
        </h3>

       

        <FormRegister v-if="form" :form="form" @submit="submit"/>
    </div>

    <ModalSuccess v-model="success" title="สร้างแบบฟอร์มสมัครเรียบร้อยแล้ว" close>
        <div class="flex justify-between">
            <button type="button" class="px-4 py-2 bg-green-600 text-base rounded-[5px] text-white" @click="navigateTo(`/lists/${form.survey_id}/edit`)">เข้าแบบฟอร์มแบบสมัคร</button>
            <button type="button" class="px-4 py-2 bg-gray-500 text-base rounded-[5px] text-white" @click="navigateTo(`/lists`)">กลับสู่หน้าหลัก</button>
        </div>
    </ModalSuccess>

</template>

<script setup>

    import moment from 'moment';
   
    useHead({
        title: `DDPM Questionnaire - สร้างฟอร์มสมัคร`,
    })
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
        created_by: "tammon.y",
        modified_by: ""
    })

    const success = ref(false)
    const submit = async () => {
        const response = await surveySubmit(form.value);
        if(response.outputAction.result === 'ok') {
            success.value = true

            form.value = response.surveyInfo
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