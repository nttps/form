<template>
    <div>
        <PartialsTitle prefix="ผล" v-if="form" :title="type" icon="i-ri-chat-poll-fill" export="test" back="/lists"/>


        <div class="text-5xl text-center py-8 font-bold text-red-500">Comming Soon</div>
    </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"]
})
const route = useRoute()

const form = ref()
const type = computed(() => form.value.survey_type)
onMounted(() => {
    fetchData()
})

const fetchData = async () => {
    const response = await useApi(`/api/servey/ServeyInfo/GetDocSet?survey_id=${route.params.id}`, 'GET');
    form.value = response.surveyInfo
}

</script>

<style lang="scss" scoped>

</style>