<template>
    <PartialsTitle title="โหวตและแบบสอบถาม" icon="i-ri-chat-poll-fill"/>
    <div class="px-8 mt-4">
        <h3 class="text-2xl font-bold mb-4">เข้าร่วมการ<span class="color-primary">โหวตและแบบสอบถาม</span></h3>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
            <CardItem :item="row" v-for="row in rows"/>
        </div>
        <div class="flex justify-center px-3 pt-3.5">
            <UPagination 
                v-model="page" 
                :page-count="pageCount" 
                :total="forms.length" 
            />
        </div>
    </div>
</template>

<script setup>

const isCreate = ref(false)

const page = ref(1)
const pageCount = 8

const rows = computed(() => {
    return forms.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})
const forms = ref([
    {
        id: '1',
        title: '(หัวข้อแบบสอบถาม)',
        image: 'default1.png',
        description: 'แบบสอบถามโครงอาหาร สถานที่....'
    },
    {
        id: '2',
        title: '(หัวข้อการโหวต)',
        image: 'default2.png',
        description: 'โหวตเพื่อการ...'
    },
    {
        id: '3',
        title: '(หัวข้อแบบสอบถาม)',
        image: 'default1.png',
        description: 'แบบสอบถามโครงอาหาร สถานที่....'
    },
    {
        id: '4',
        title: '(หัวข้อการโหวต)',
        image: 'default2.png',
        description: 'โหวตเพื่อการ...'
    },{
        id: '4',
        title: '(หัวข้อการโหวต)',
        image: 'default2.png',
        description: 'โหวตเพื่อการ...'
    },{
        id: '4',
        title: '(หัวข้อการโหวต)',
        image: 'default2.png',
        description: 'โหวตเพื่อการ...'
    },{
        id: '4',
        title: '(หัวข้อการโหวต)',
        image: 'default2.png',
        description: 'โหวตเพื่อการ...'
    },{
        id: '4',
        title: '(หัวข้อการโหวต)',
        image: 'default2.png',
        description: 'โหวตเพื่อการ...'
    },{
        id: '4',
        title: '(หัวข้อการโหวต)',
        image: 'default2.png',
        description: 'โหวตเพื่อการ...'
    },{
        id: '4',
        title: '(หัวข้อการโหวต)',
        image: 'default2.png',
        description: 'โหวตเพื่อการ...'
    },{
        id: '4',
        title: '(หัวข้อการโหวต)',
        image: 'default2.png',
        description: 'โหวตเพื่อการ...'
    },{
        id: '4',
        title: '(หัวข้อการโหวต)',
        image: 'default2.png',
        description: 'โหวตเพื่อการ...'
    },{
        id: '4',
        title: '(หัวข้อการโหวต)',
        image: 'default2.png',
        description: 'โหวตเพื่อการ...'
    },{
        id: '4',
        title: '(หัวข้อการโหวต)',
        image: 'default2.png',
        description: 'โหวตเพื่อการ...'
    },
])
</script>

<style lang="scss" scoped>

</style>