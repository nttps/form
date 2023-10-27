<template>
    <div>
        <PartialsTitle title="โหวตและแบบสอบถาม" icon="i-ri-chat-poll-fill" create/>
        <div class="px-8 mt-4">
            <h3 class="text-2xl font-bold mb-4">เข้าร่วมการ<span class="color-primary">โหวตและแบบสอบถาม</span></h3>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10" v-if="forms.length">
                <CardItem :item="row" v-for="row in rows"/>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10" v-else>
                <div class="rounded-lg bg-white pb-4" v-for="i in 8">
                    <div class="delay-75 px-4 py-2">
                        <USkeleton class="w-full h-[200px]" />
                    </div>
                    <div class="px-4 pt-2">
                        <USkeleton class="h-6 mb-2" />
                        <USkeleton class="h-4" />
                    </div>
                    <div class="px-4 pt-2">
                        <USkeleton class="ml-auto w-16 h-7 rounded-full" />
                    </div>
                </div>
            </div>
            <div class="flex justify-center px-3 pt-3.5">
                <UPagination 
                    v-model="page" 
                    :page-count="pageCount" 
                    :total="forms.length" 
                    v-if="forms.length"
                />
            </div>
        </div>
    </div>
</template>

<script setup>


const page = ref(1)
const pageCount = 8
const forms = ref([])

onMounted(() => {
    fetchData()
})

const fetchData = async () => {
    forms.value = await useApi('/api/servey/ServeyInfo/ListData', 'POST', {
        SearchText:"",
        Status:"เปิด",
        Type:"",
        User: "",
        IsAdmin: false,
        IsShowActiveOnly:true//แสดงรายการที่วันที่ยัง active
    });
}
const rows = computed(() => {
    return forms.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

</script>

<style lang="scss" scoped>

</style>