<template>
    <div class="flex">
        <div class="w-1/2">
            <ChartPie :data="props.data"  style="width: 100%; height: 500px" />
        </div>
        <div class="w-1/2 flex items-center">
            <div class="flex border relative rounded-2xl border-[#FFA800] mb-2 w-full">
                <div class="w-full ">
                    <UTable 
                        :rows="props.data" 
                        :columns="answerColumns" 
                        :ui="{ td: { base: 'w-1/2'}, tr: {base: 'divide-x divide-[#FFA800]'}}"
                        class="bg-white"
                        :loading-state="{ label: 'กำลังโหลด ...' }" 
                        :empty-state="{ label: 'ไม่พบรายการ' }"
                    >
                        <template #answer_desc-data="{ row }">
                            <div class="flex items-center justify-center">
                                <div class="text-center w-1/2">{{ row.answer_desc }}</div>
                                <div class="w-1/2" v-if="row.answer_img_url">
                                    <img :src="row.answer_img_url" class="h-[80px]" />
                                </div>
                                
                            </div>
                        </template>
                        <template #count_answer-data="{ row }">
                            <div class="text-center">{{ row.count_answer }}</div>
                        </template>
                    </UTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import moment from 'moment'
const props = defineProps(['data'])
const answerColumns = [ {
  key: 'answer_desc',
  label: 'คำตอบ',
  class: 'text-center'
}, {
  key: 'count_answer',
  label: 'จำนวนผู้ตอบ',
  class: 'text-center'
}]


const fomatDate = (date) => {
  return moment(date).format('DD/MM/yyyy H:mm')
}
</script>

<style lang="scss" scoped>

</style>