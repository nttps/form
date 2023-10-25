<template>
    <PartialsTitle prefix="ระบบ" title="แบบฟอร์มสมัคร" icon="i-mdi-file-document-plus" back="/lists"/>

    <div class="px-8 mt-4">
        <h3 class="text-xl md:text-2xl font-bold mb-4 flex items-center space-x-2">
            <div>แก้ไข<span class="color-primary">แบบฟอร์มสมัคร</span></div> 
            <Icon name="i-mdi-pencil" size="25" color="black" />
        </h3>

        <FormRegister v-if="form?.survey_type && form.survey_type == 'ฟอร์มสมัคร'" :form="form" @submit="submit"/>
        <FormVote v-if="form?.survey_type && form.survey_type == 'ระบบโหวต'" :vote="form" @submit="submit"/>
        <FormQuition v-if="form?.survey_type && form.survey_type == 'แบบสอบถาม'" :form="form" @submit="submit"/>
    </div>

    <ModalSuccess v-model="success" title="สร้างแบบฟอร์มสมัครเรียบร้อยแล้ว">
        <div class="text-center text-2xl text-green-500">สร้างแบบฟอร์มสมัครเรียบร้อยแล้ว</div>
    </ModalSuccess>

</template>

<script setup>

    const route = useRoute()
    const form = ref(null)
    const success = ref(false)
    onMounted(() => {
        fetchData()
    })

    const fetchData = async () => {
        const response = await useApi(`/api/servey/ServeyInfo/GetDocSet?survey_id=${route.params.id}`, 'GET');
        form.value = response.surveyInfo
    }

    const submit = async () => {
        const response = await surveySubmit(form.value);
        if(response.outputAction.result === 'ok') {
            success.value = true
        }
    }

</script>

<style lang="scss" scoped>

</style>