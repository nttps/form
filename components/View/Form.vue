<template>
    <div
        class="rounded-md mb-4 bg- relative"
        v-for="(question, index) in form.quizSet" :key="question.quiz.quiz_sort"
    >
        <div class="text-center bg-[#FFA133] rounded-t-lg cursor-move py-4"></div>
        <div class="p-4 bg-white">
            <div class="mb-2">
                <div class="text-xl font-bold">{{ question.quiz.quiz_desc }}</div>
                <p class="text-lg code-description" v-dompurify-html="question.quiz.description"></p>
            </div>

            <label v-for="(answer, index) of question.answers" v-if="question.quiz.answer_type == 'ตัวเลือกได้ข้อเดียว' || question.quiz.answer_type == 'เลือกได้หลายข้อ'" class="flex space-x-2 items-center">
                <input 
                    :id="answer.answer_id" 
                    :type="question.quiz.answer_type == 'ตัวเลือกได้ข้อเดียว' ? `radio` : `checkbox`" 
                    :name="question.quiz.quiz_id" 
                    :value="answer.answer_id" 
                    @input="question.quiz.answer_type == 'ตัวเลือกได้ข้อเดียว' ? setAnswer($event, question, index) : setMultipleAnswer($event, question, index)"   
                    :checked="answer.is_select === true"
                    :disabled="preview"
                    required
                    class="hover:bg-amber-700 checked:bg-rose-500"
                />
                <div>{{ answer.answer }}</div>
            </label>
           
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
    const props = defineProps(['form', 'submitId', 'preview'])
    const emits = defineEmits(['setAnswer'])


    const answer = ref({
        SubmitID: props.submitId,
        QuizID: '',
        AnswerDesc: '',
        AnswerIDs: []
    })

    const setAnswer = (event, quiz, index) => {

        answer.value.QuizID = quiz.quiz.quiz_id
        answer.value.AnswerIDs = [event.target.value]
       
        quiz.answers.filter((v, i) => i != index).forEach(v => v.is_select = false)
        quiz.answers.filter((v, i) => i == index).forEach(v => v.is_select = true)


        emits('setAnswer', answer.value)
    }

    const setMultipleAnswer = (event, quiz, index) => {
        answer.value.QuizID = quiz.quiz.quiz_id
        quiz.answers[index].is_select = true
        answer.value.AnswerIDs.push(event.target.value)
        emits('setAnswer', answer.value)
    }

</script>

<style lang="scss" scoped>



</style>