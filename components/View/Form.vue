<template>
    <div
        class="rounded-md mb-4 bg- relative"
        v-for="(question, index) in form.questions" :key="question.quiz.quiz_sort"
    >
        <div class="text-center bg-[#FFA133] rounded-t-lg cursor-move py-4"></div>
        <div class="p-4 bg-white">
            <div class="mb-2">
                <div class="text-xl font-bold">{{ question.quiz.quiz_desc }}</div>
                <p class="text-lg" v-dompurify-html="question.quiz.description"></p>
            </div>
            <URadio required v-if="question.quiz.answer_type == 'ตัวเลือกได้ข้อเดียว'" :ui="{ wrapper: 'relative flex items-center mb-2' }" v-for="(answer, index) of question.answers" :label="answer.answer" :name="question.quiz.quiz_desc" :value="answer.answer_id" :key="answer.quiz_sort" v-model="question.AnswerIDs"/>
            <div v-if="question.quiz.answer_type == 'เลือกได้หลายข้อ'">
                <UCheckbox v-model="question.checkBoxAnswers" :ui="{ wrapper: 'relative flex items-center mb-2', color: 'text-primary-500' }" v-for="answer of question.answers" :name="question.quiz.quiz_desc" :label="answer.answer" :value="answer.answer_id" :required="question.checkBoxAnswers.length == 0" />
            </div>
            
            
            <div v-if="question.quiz.answer_type === 'image'" class="mt-2 text-center">
                <img :src="question.previewImage" alt="" class="mx-auto" />
            </div>
            <div v-if="question.quiz.answer_type === 'text'" class="mt-2">
                {{ question.description }}
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps(['form'])
</script>

<style lang="scss" scoped>

</style>