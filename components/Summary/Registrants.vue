<template>
    <div class="flex border relative not-prose rounded-2xl border-[#FFA800] mb-2 div">
        <div class="w-full ">
            <UTable 
              :columns="columns" 
              :rows="props.data" 
              class="bg-white" 
              :ui="{ tr: {base: 'divide-x divide-[#FFA800]'} }"
              :loading-state="{ label: 'กำลังโหลด ...' }" 
              :empty-state="{ label: 'ไม่พบรายการ' }"
            > 
                <template #created_date-data="{ row }">
                    <div class="text-center">{{ fomatDate(row.created_date) }}</div>
                </template>

                <template #full_name-data="{ row }">
                    <div class="text-center">{{ row.full_name || 'บุคคลทั่วไป' }}</div>
                </template>

                
                <template #comment-data="{ row }">
                    <div class="text-center">{{ row.comment || '-' }}</div>
                </template>
                
                <template #details-data="{ row }">
                    <div v-if="row.full_name">Username: {{ row.username }}</div>
                    <div>
                      <div>
                        ชื่อ - นามสกุล: {{ row.title }} {{ row.fullname }}
                      </div>
                      <div>
                        เบอร์โทรศัพท์: {{ row.phone }}
                      </div>
                      <div>
                        อีเมล์: {{ row.email }}
                      </div>
                    </div>
                </template>
                
            </UTable>
        </div>
    </div>
</template>

<script setup>

import moment from 'moment'
const props = defineProps(['data'])
const columns = [{
  key: 'full_name',
  label: 'ชื่อผู้สมัคร',
  class: 'text-center'
}, {
  key: 'comment',
  label: 'ข้อเสนอแนะ',
  class: 'text-center'
}, {
  key: 'details',
  label: 'ข้อมูลผู้สมัคร',
  class: 'text-center'
}, {
  key: 'created_date',
  label: 'วันที่สมัคร',
  class: 'text-center'
}]


const fomatDate = (date) => {
  return moment(date).format('DD/MM/yyyy H:mm')
}
</script>

<style lang="scss" scoped>

</style>