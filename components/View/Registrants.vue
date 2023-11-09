<template>
    <div class="flex border relative not-prose rounded-2xl border-[#FFA800] mb-2 div">
        <div class="w-full ">
            <UTable :columns="columns" :rows="props.data" class="bg-white" :ui="{ tr: {base: 'divide-x divide-[#FFA800]'} }"> 
                <template #created_date-data="{ row }">
                    <div class="text-center">{{ fomatDate(row.created_date) }}</div>
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
  label: 'หมายเหตุ',
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