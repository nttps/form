<template>
    <div>
        <PartialsTitle prefix="ระบบ" v-if="form" :title="type" icon="i-mdi-file-document-plus" back="/lists"/>
        <div class="px-8 mt-4">
            <h3 class="text-xl md:text-2xl font-bold mb-4 flex items-center space-x-2">
                <div>แก้ไข<span class="color-primary">แบบฟอร์ม</span></div> 
                <Icon name="i-mdi-pencil" size="25" color="black" />
            </h3>

            <FormRegister v-if="type && type == 'ฟอร์มสมัคร'" :form="form" :permissions="permissions" @submit="submit"/>
            <FormVote v-if="type && type == 'ระบบโหวต'" :vote="form" :permissions="permissions" @submit="submit"/>
            <FormQuestion v-if="type && type == 'แบบสอบถาม'" :form="form" :permissions="permissions" @submit="submit"/>
        </div>
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: ["auth"]
    })

    const formStore = useFormStore()
    const { username } = useAuthStore();


    const route = useRoute()
    const toast = useToast()
    const form = ref(formStore.duplicate)
    const type = computed(() => form.value.survey_type)
    const permissions = ref({
        all: [],
        user: []
    })
    onMounted(() => {
    })

   

    const submit = async () => {

        form.value.created_by = username;
        delete form.value.created_date;
        delete form.value.modified_date;


        
        const survey = await surveySubmit(form.value);

        let status;

        if(survey.surveyInfo.survey_type == "ระบบโหวต") {
            const res = await submitVote(form, survey)

            status = res.status
        }
        if(survey.surveyInfo.survey_type == "แบบสอบถาม" || survey.surveyInfo.survey_type == "ฟอร์มสมัคร") {
            const res = await submitQuestion(form, survey)
            status = res.status
        }

        if (status) {
            toast.add({
                id: 'edit_form',
                color: 'green',
                title: 'แก้ไขข้อมูลเรียบร้อยแล้ว',
                icon: 'i-heroicons-check-badge',
                timeout: 1000,
            })

            navigateTo(`/lists`)
        }
        //fetchData()
    }

</script>

<style lang="scss" scoped>

</style>