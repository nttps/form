<template>
   <div>
      <PartialsTitle title="โหวตและแบบสอบถาม" icon="i-ri-chat-poll-fill" back create/>
      <div class="px-8 mt-4">
          <h3 class="text-xl md:text-2xl font-bold mb-4">รายการ<span class="color-primary">โหวตและแบบสอบถาม</span></h3>
          <div class="bg-white rounded-t-md px-4 py-8 rounded-2xl">
              <div class="items-center w-full md:flex">
                  <div class="md:w-3/12 mb-4">
                    <UInput v-model="search" placeholder="ค้นหาหัวข้อ" size="lg" />
                  </div>
                  <div class="md:w-2/12 md:ml-4 mb-4">
                    <USelect size="lg" :options="types" v-model="selectedType" placeholder="ประเภทคำถาม" option-attribute="name" />
                  </div>
                  <div class="md:w-2/12 md:ml-4 mb-4">
                    <UPopover :popper="{ placement: 'bottom-start' }">
                        <UButton icon="i-heroicons-calendar-days-20-solid" class="w-full" size="md" :label="labelRangeDate" />
                        <template #panel="{ close }">
                            <FormRangeDatePicker v-model="range" @close="close" />
                        </template>
                    </UPopover>
                  </div>
                  <div class="md:w-2/12 md:ml-4 mb-4">
                    <UButton size="md"  label="ค้นหา" :disabled="search === '' && selectedType === '' && range.start === null && range.end === null" @click="refresh"/>
                    <UButton color="gray" size="md" class="md:ml-4"  label="รีเซ็ทฟิลเตอร์" @click="resetFilters"/>
                  </div>

                  
                  <UButton
                    v-if="selectedRows.length > 0"
                    class="ml-auto mb-4"
                    trailing
                    color="red"
                    size="lg"
                    @click="isDeleteAlertAll = true"
                  >
                    ลบทั้งหมด
                  </UButton>
              </div>
              <div class="flex border relative not-prose rounded-2xl border-[#FFA800] mb-2 div">
                  <div class="w-full ">
                      <UTable 
                        v-model="selectedRows" 
                        :columns="columns" 
                        :rows="rows" 
                        :loading="pending" 
                        :loading-state="{ label: 'กำลังโหลด ...' }" 
                        :empty-state="{ label: 'ไม่พบรายการ' }"
                      >
                          <template #sv_type_name-data="{ row }">
                              <div class="text-center">{{ row.sv_type_name }}</div>
                          </template>
                          <template #created_date-data="{ row }">
                              <div class="text-center">{{ fomatDate(row.created_date) }}</div>
                          </template>
                          <template #dateRange-data="{ row }">
                              <div class="text-center">{{ fomatDate(row.survey_date_from) }} ถึง {{ fomatDate(row.survey_date_to) }}</div>
                          </template>
                          <template #status-data="{ row }">
                              <div class="text-center">{{ row.status }}</div>
                          </template>
                          <template #others-data="{ row }">
                              <div class="flex justify-center">
                                  <UTooltip text="สถิติ" :popper="{ offsetDistance: 16 }">
                                    <NuxtLink :to="`/lists/${row.survey_id}`" class="border-r-2 border-black pr-2"><Icon name="i-mdi-clipboard-text-search-outline" size="25" color="green"  /></NuxtLink>
                                  </UTooltip>
                                 
                                  <UTooltip text="แก้ไข" :popper="{ offsetDistance: 16 }">
                                    <NuxtLink :to="`/lists/${row.survey_id}/edit`" class="pl-2 border-r-2 border-black pr-2"><Icon name="i-mdi-pencil" size="25" color="orange" /></NuxtLink>
                                  </UTooltip>
                                 
                                  <UTooltip text="คัดลอก" :popper="{ offsetDistance: 16 }">
                                    <button type="button" @click="duplicate(row.survey_id)" class="pl-2 border-r-2 border-black pr-2"><Icon name="heroicons:document-duplicate-solid" size="25" color="sky" /></button>
                                  </UTooltip>
                                  <UTooltip text="ลบ" :popper="{ offsetDistance: 16 }">
                                    <button type="button" @click="deletePopup(row.survey_id)" class="pl-2"><Icon name="i-mdi-trash" size="25" color="red" /></button>
                                  </UTooltip>
                                  
                              </div>
                          </template>
                      </UTable>
                  </div>
              </div>
              <div class="flex flex-wrap justify-between items-center px-3 pt-3.5">
                <div>
                  <span class="text-sm leading-5">
                    กำลังแสดง
                    <span class="font-medium">{{ pageFrom }}</span>
                    ถึง
                    <span class="font-medium">{{ pageTo }}</span>
                    จาก
                    <span class="font-medium">{{ pageTotal }}</span>
                    รายการ
                  </span>
                </div>


                <UPagination 
                  v-model="page" 
                  :page-count="pageCount" 
                  :total="lists.length" 
                />
              </div>
          </div>
      </div>

      <UModal v-model="isDeleteAlert">
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
          <template #header>
              <div class="text-center">แจ้งเตือนการยืนยัน</div>
          </template>

          <div class="font-bold text-xl text-center">คุณต้องการยืนยันที่จะลบข้อมูลนี้ใช่หรือไม่</div>

          <template #footer>
              <div class="flex justify-between">
                  <button type="button" class="px-4 py-2 bg-red-600 text-base rounded-[5px] text-white" @click="deleteItem">ยืนยัน</button>
                  <button type="button" class="px-4 py-2 bg-gray-500 text-base rounded-[5px] text-white" @click="isDeleteAlert = false">ยกเลิก</button>
              </div>
          </template>
        </UCard>
      </UModal>

      <UModal v-model="isDeleteAlertAll">
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
          <template #header>
              <div class="text-center">แจ้งเตือนการยืนยัน</div>
          </template>

          <div class="font-bold text-xl text-center">คุณต้องการยืนยันที่จะลบข้อมูลทั้งหมดใช่หรือไม่</div>

          <template #footer>
              <div class="flex justify-between">
                  <button type="button" class="px-4 py-2 bg-red-600 text-base rounded-[5px] text-white" @click="deleteAll">ยืนยัน</button>
                  <button type="button" class="px-4 py-2 bg-gray-500 text-base rounded-[5px] text-white" @click="isDeleteAlertAll = false">ยกเลิก</button>
              </div>
          </template>
        </UCard>
      </UModal>
   </div>
</template>

<script setup>

import moment from "moment"

definePageMeta({
  middleware: ["auth"]
})

const toast = useToast()
const { username } = useAuthStore();

const canSearch = ref(false)

const types = [{
  name: 'ประเภทคำถามทั้งหมด',
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

// Selected Rows
const selectedRows = ref([])
const search = ref('')
const selectedType = ref("")
const range = ref({
  start: null,
  end: null,
});

const labelRangeDate = computed(() => !range.value.start && !range.value.end ? 'เลือกช่วงวันที่' : moment(range.value.start).format('DD/MM/yyyy') + ' ' + moment(range.value.end).format('DD/MM/yyyy'))
const isDeleteAlert = ref(false)
const deleteId = ref(null)
const isDeleteAlertAll = ref(false)
// Pagination
const page = ref(1)
const pageCount = ref(20)
const pageTotal = computed(() => lists.value.length)
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1)
const pageTo = computed(() => Math.min(page.value * pageCount.value, pageTotal.value))

// Data
const { data: lists, pending, refresh } = await useAsyncData(
  'lists',
  async () => await useApi('/api/servey/ServeyInfo/ListData', 'POST', {
    SearchText: search.value,
    Status:"",
    User: username,
    start_date: range.value.start ? moment(range.value.start).format('YYYY-MM-DD') : null,
    end_date: range.value.start ? moment(range.value.end).format('YYYY-MM-DD') : null,
    Type: selectedType.value,
    IsShowActiveOnly:false
  }), {
    watch: []
  }
)

const resetFilters = () => {
  search.value = ''
  range.value.start = null
  range.value.end = null
  selectedType.value = ''

  refresh()
}


const rows = computed(() => {
  return lists.value.slice((page.value - 1) * pageCount.value, (page.value) * pageCount.value)
})


const fomatDate = (date) => {
  return moment(date).format('DD/MM/yyyy')
}
const deletePopup = (id) => {
  deleteId.value = id
  isDeleteAlert.value = true
}
const deleteItem = async () => {
  const response = await useApi('/api/servey/ServeyInfo/DeleteDoc', 'DELETE', { 
    SurveyID : deleteId.value,
    DeletedBy : username
  });

  if(response.result === 'ok') {
    toast.add({
        id: 'delete_form_success',
        color: 'green',
        title: 'ลบข้อมูลเรียบร้อยแล้ว',
        icon: 'i-heroicons-check-badge',
        timeout: 1000,
    })
  }else {
    toast.add({
        id: 'delete_form_fail',
        color: 'red',
        title: 'เกิดข้อผิดพลาด กรุณาติดต่อผู้ดูแลระบบ',
        icon: 'i-heroicons-information-circle',
        timeout: 1000,
    })
  }

  isDeleteAlert.value = false
  refresh()
}



const deleteAll = async () => {

  const itemsDelete = selectedRows.value.map(i => i.survey_id);

  const response = await useApi('/api/servey/ServeyInfo/DeleteDocs', 'DELETE', { 
    SurveyID : itemsDelete,
    DeletedBy : username
  });

  if(response.result === 'ok') {
    toast.add({
        id: 'delete_form_success',
        color: 'green',
        title: 'ลบข้อมูลเรียบร้อยแล้ว',
        icon: 'i-heroicons-check-badge',
        timeout: 1000,
    })
  }else {
    toast.add({
        id: 'delete_form_fail',
        color: 'red',
        title: 'เกิดข้อผิดพลาด กรุณาติดต่อผู้ดูแลระบบ',
        icon: 'i-heroicons-information-circle',
        timeout: 1000,
    })
  }

  isDeleteAlertAll.value = false
  refresh()

  selectedRows.value = []

}

const duplicate = async (id) => {
  const response = await useApi(`/api/servey/ServeyInfo/GetDocSet?survey_id=${id}`, 'GET');

  const formStore = useFormStore()
  let form;
  form = response.surveyInfo
  form.choices = []
  form.questions = []

  if(response.surveyInfo.survey_type == "ระบบโหวต") {
      form.choices = response.quizSetList[0].answers
  }

  if(response.surveyInfo.survey_type == "แบบสอบถาม" || response.surveyInfo.survey_type == "ฟอร์มสมัคร") {
      form.questions = response.quizSetList
  }

  formStore.assign(form)

  navigateTo('/create/duplicate')
  
}
</script>

<style lang="scss" scoped>

</style>