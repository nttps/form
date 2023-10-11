<template>
    <PartialsTitle title="โหวตและแบบสอบถาม" icon="i-ri-chat-poll-fill" back/>
    <div class="px-8 mt-4">
        <h3 class="text-xl md:text-2xl font-bold mb-4">รายการ<span class="color-primary">โหวตและแบบสอบถาม</span></h3>
        <div class="bg-white rounded-t-md px-4 py-8 rounded-2xl">
            <div class="items-center md:flex md:space-x-4">
                <div class="md:w-3/12 mb-4">
                  <UInput placeholder="ค้นหาหัวข้อ" size="lg" />
                </div>
                <div class="md:w-2/12 mb-4">
                  <USelect size="lg" :options="types" placeholder="ประเภทคำถาม" option-attribute="name" />
                </div>
                <div class="md:w-2/12 mb-4">
                  <UInput placeholder="วันที่สร้าง" size="lg" />
                </div>
                <button class="font-bold rounded-lg px-4 py-2 bg-[#FFA133] mb-4"> ค้นหา </button>
            </div>
            <div class="flex border relative not-prose rounded-2xl border-[#FFA800] mb-2 div">
                <div class="w-full ">
                    <UTable v-model="selected" :columns="columns" :rows="rows">
                        <template #type-data="{ row }">
                            <div class="text-center">{{ row.type }}</div>
                        </template>
                        <template #date-data="{ row }">
                            <div class="text-center">{{ row.date }}</div>
                        </template>
                        <template #dateRange-data="{ row }">
                            <div class="text-center">{{ row.dateBegin }} ถึง {{ row.dateEnd }}</div>
                        </template>
                        <template #status-data="{ row }">
                            <div class="text-center">{{ row.status }}</div>
                        </template>
                        <template #others-data="{ row }">
                            <div class="flex justify-center">
                                <NuxtLink :to="`/lists/${row.id}`" class="border-r-2 border-black pr-2"><Icon name="i-mdi-clipboard-text-search-outline" size="30" color="black"  /></NuxtLink>
                                <NuxtLink :to="`/lists/${row.id}/edit`" class="pl-2"><Icon name="i-mdi-pencil" size="30" color="black" /></NuxtLink>
                            </div>
                        </template>
                    </UTable>
                </div>
            </div>
            <div class="flex justify-center px-3 pt-3.5">
                <UPagination 
                  v-model="page" 
                  :page-count="pageCount" 
                  :total="lists.length" 
                />
            </div>
        </div>
    </div>
</template>

<script setup>

const types = [{
  name: 'โหวต',
  value: 'vote',
}, {
  name: 'แบบสอบถาม',
  value: 'form'
}, {
  name: 'ฟอร์มสมัคร',
  value: 'register'
}]

const columns = [{
  key: 'title',
  label: 'หัวข้อ',
  class: 'text-center'
}, {
  key: 'date',
  label: 'วันที่',
  class: 'text-center'
}, {
  key: 'type',
  label: 'ประเภท',
  class: 'text-center'
},{
  key: 'dateRange',
  label: 'เริ่มวันที่ - สิ้นสุดวันที่',
  class: 'text-center'
}, {
  key: 'status',
  label: 'สถานะ',
  class: 'text-center'
}, {
  key: 'others',
  label: 'อื่นๆ',
  class: 'text-center'
},]

const lists = ref([{
    id: 1,
    title: 'โหวตเรื่อง,หัวข้อ',
    date: '10/05/2566',
    type: 'โหวต',
    dateBegin: '20/05/2566',
    dateEnd: '20/05/2566',
    status: 'กำลังดำเนินการ',
}, {
    id: 2,
    title: 'แบบสอบถามเรื่อง...',
    date: '10/05/2566',
    type: 'แบบสอบถาม',
    dateBegin: '20/05/2566',
    dateEnd: '20/05/2566',
    status: 'กำลังดำเนินการ',
}, {
    id: 3,
    title: 'แบบสอบถามเรื่อง...',
    date: '10/05/2566',
    type: 'แบบสอบถาม',
    dateBegin: '20/05/2566',
    dateEnd: '20/05/2566',
    status: 'จบการดำเนินการ',
}])


const page = ref(1)
const pageCount = 5

const rows = computed(() => {
  return lists.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

const selected = ref([])

</script>

<style lang="scss" scoped>

</style>