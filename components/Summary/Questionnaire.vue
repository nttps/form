<template>
    <div v-for="({ quiz, answers }, index) in props.data.filter(q => q.quiz.answer_type !== 'ข้อเขียน')">
        <UCard class="mb-4" :ui="{ header: { background: 'bg-[#FFA800]'}}">
            <template #header>
                <h3 class="text-2xl font-bold">คำถามที่ {{ index +1 }} {{ quiz.quiz_title }}</h3>
            </template>

            <div class="flex">
                <div class="w-1/2">
                    <ChartPie :data="answers"  style="width: 100%; height: 300px" />
                </div>
                <div class="w-1/2 flex items-center">
                    <div class="flex border relative rounded-2xl border-[#FFA800] mb-2 w-full">
                        <div class="w-full ">
                            <UTable 
                                :rows="answers" 
                                :columns="answerColumns" 
                                :ui="{ td: { base: 'w-1/2'}, tr: {base: 'divide-x divide-[#FFA800]'}}" 
                                class="bg-white"
                                :loading-state="{ label: 'กำลังโหลด ...' }" 
                                :empty-state="{ label: 'ไม่พบรายการ' }"
                            >
                                <template #count_answer-data="{ row }">
                                    <div class="text-center">{{ row.count_answer }}</div>
                                </template>
                            </UTable>
                        </div>
                    </div>
                </div>
                
            </div>
            

            
        </UCard>
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