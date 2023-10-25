<template>
    <PartialsTitle title="โหวตและแบบสอบถาม" icon="i-ri-chat-poll-fill" back create/>
    <div class="px-8 mt-4">
        <h3 class="text-xl md:text-2xl font-bold mb-4">รายการ<span class="color-primary">โหวตและแบบสอบถาม</span></h3>
        <div class="bg-white rounded-t-md px-4 py-8 rounded-2xl">
            <div class="items-center w-full md:flex">
                <div class="md:w-3/12 mb-4">
                  <UInput placeholder="ค้นหาหัวข้อ" size="lg" />
                </div>
                <div class="md:w-2/12 md:ml-4 mb-4">
                  <USelect size="lg" :options="types" v-model="selectedType" placeholder="ประเภทคำถาม" option-attribute="name" @update:model-value="fetchData" />
                </div>
                <div class="md:w-2/12 md:ml-4 mb-4">
                  <UInput placeholder="วันที่สร้าง" size="lg" />
                </div>
                <button class="font-bold rounded-lg px-4 py-2 bg-[#FFA133] mb-4 md:ml-4 text-center"> ค้นหา </button>
            </div>
            <div class="flex border relative not-prose rounded-2xl border-[#FFA800] mb-2 div">
                <div class="w-full ">
                    <UTable v-model="selected" :columns="columns" :rows="rows">
                        <template #sv_type_name-data="{ row }">
                            <div class="text-center">{{ row.sv_type_name }}</div>
                        </template>
                        <template #created_date-data="{ row }">
                            <div class="text-center">{{ fomatDate(row.created_date) }}</div>
                        </template>
                        <template #dateRange-data="{ row }">
                            <div class="text-center">{{ fomatDate(row.dateBegin) }} ถึง {{ fomatDate(row.dateEnd) }}</div>
                        </template>
                        <template #status-data="{ row }">
                            <div class="text-center">{{ row.status }}</div>
                        </template>
                        <template #others-data="{ row }">
                            <div class="flex justify-center">
                                <NuxtLink :to="`/lists/${row.survey_id}`" class="border-r-2 border-black pr-2"><Icon name="i-mdi-clipboard-text-search-outline" size="25" color="green"  /></NuxtLink>
                                <NuxtLink :to="`/lists/${row.survey_id}/edit`" class="pl-2 border-r-2 border-black pr-2"><Icon name="i-mdi-pencil" size="25" color="orange" /></NuxtLink>
                                <button type="button" @click="deleteItem(row.survey_id)" class="pl-2"><Icon name="i-mdi-trash" size="25" color="red" /></button>
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

import moment from "moment"

const types = [{
  name: 'ทั้งหมด',
  value: '',
}, {
  name: 'ระบบโหวต',
  value: 'ระบบโหวต',
}, {
  name: 'แบบสอบถาม',
  value: 'แบบสอบถาม'
}, {
  name: 'ฟอร์มสมัคร',
  value: 'ฟอร์มสมัคร'
}]

const columns = [{
  key: 'survey_name',
  label: 'หัวข้อ',
  class: 'text-center'
}, {
  key: 'created_date',
  label: 'วันที่',
  class: 'text-center'
}, {
  key: 'sv_type_name',
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

const lists = ref([])
const selectedType = ref("")

onMounted(() => {
    fetchData()
})

const fetchData = async () => {
  lists.value = await useApi('/api/servey/ServeyInfo/ListData', 'POST', {
    "SearchText":"",
    "Status":"",
    "User":"tammon.y",
    "start_date":"2023-10-20",
    "end_date":"2023-10-25",
    "Type": selectedType.value,
    "IsShowActiveOnly":false
  });
}

const page = ref(1)
const pageCount = 20

const rows = computed(() => {
  return lists.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

const selected = ref([])

const fomatDate = (date) => {
  return moment(date).format('DD/MM/yyyy')
}

const deleteItem = (id) => {

}
</script>

<style lang="scss" scoped>

</style>