<template>
    <div
        class="rounded-md mb-4 bg- relative"
        v-for="(question, index) in props.form.quizSet" :key="question.quiz.quiz_sort"
    >
        <div class="text-center bg-[#FFA133] rounded-t-lg py-4"></div>
        <div class="p-4 bg-white">
            <div class="mb-2">
                <div class="text-xl font-bold" v-if="props.form.submit.survey_type  !==  'ระบบโหวต'">{{ question.quiz.quiz_title }}</div>
                <p class="text-lg code-description el-tiptap-editor__content" v-if="question.quiz.quiz_desc && props.form.submit.survey_type  !==  'ระบบโหวต'" v-dompurify-html="question.quiz.quiz_desc"></p>
            </div>
            <div v-for="(answer, index) of question.answers" v-if="question.quiz.answer_type == 'ตัวเลือกได้ข้อเดียว' || question.quiz.answer_type == 'เลือกได้หลายข้อ'">
                <label :for="answer.answer_id" class="flex space-x-2 items-center">
                    <input 
                        :id="answer.answer_id" 
                        :type="question.quiz.answer_type == 'ตัวเลือกได้ข้อเดียว' ? `radio` : `checkbox`" 
                        :name="question.quiz.quiz_id" 
                        :value="answer.answer_id" 
                        @input="question.quiz.answer_type == 'ตัวเลือกได้ข้อเดียว' ? setAnswer($event, question, index) : setMultipleAnswer($event, question, index)"   
                        :checked="answer.is_select === true"
                        :disabled="preview"
                        :required="question.quiz.answer_type == 'ตัวเลือกได้ข้อเดียว' ? true : false"
                        class="hover:bg-amber-700 checked:bg-rose-500"
                    />
                    <div>{{ answer.answer }}</div>
                </label>
                <div v-if="answer.answer_img_url">
                    <img :src="answer.answer_img_url" class="h-[200px] my-4" :alt="answer.answer">
                </div>
            </div>
            <div v-if="question.quiz.answer_type === 'image'">
                <UTooltip text="เลือกรูป">
                    <button @click="addImage(index)" type="button" :disabled="props.form.status === 'เปิด'" class="text-gray-600 flex items-center space-x-2 px-1">
                        <span>เลือกรูป</span>
                        <Icon name="i-ic-round-image" size="35" />
                    </button>
                </UTooltip>
                <img v-if="question.quiz.answer_img" :src="question.quiz.answer_img_url" alt="" class="mt-2 h-[200px]" />
            </div>
            <div v-if="question.quiz.answer_type === 'ข้อเขียน'" class="mt-2">
                <UTextarea placeholder="กรุณากรอก" v-model="question.quiz.answer_desc" @input="setTextAnswer($event, question)"  autoresize :rows="2" size="xl" :disabled="props.form.status === 'เปิด'" />
            </div>
        </div>
    </div>

     <UModal v-model="uploadImageModal">
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="text-center">ตัวอย่างรูปภาพ</div>
            </template>
            <UInput type="file" @change="pickImage"/>
            <div class="text-center mt-2">
                <img :src="previewImage" v-if="previewImage" class="mx-auto mb-4" alt="">
                <UButton @click="confirmImage" label="ยืนยันการอัพโหลด"/>
            </div>
        </UCard>
    </UModal>
</template>

<script setup>
    const props = defineProps(['form', 'submitId', 'preview'])
    const emits = defineEmits(['setAnswer', 'setImage'])


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

    const requiredCheckboxMultiple = (quiz, index) => {

        return quiz.answers.find(a => a.is_select == true).length > 0
    }

    const setTextAnswer = (event, quiz) => {

        answer.value.QuizID = quiz.quiz.quiz_id
        answer.value.AnswerDesc = event.target.value

        emits('setAnswer', answer.value)
    }

    const setMultipleAnswer = (event, quiz, index) => {
        
        answer.value.QuizID = quiz.quiz.quiz_id
        var indexA = answer.value.AnswerIDs.indexOf(event.target.value);

        if(!quiz.answers[index].is_select && indexA === -1) {

            answer.value.AnswerIDs.push(event.target.value);
            quiz.answers[index].is_select = true
        }else {
            answer.value.AnswerIDs.splice(indexA, 1);
            quiz.answers[index].is_select = false
        }
        emits('setAnswer', answer.value)
    }

    const uploadImageModal = ref(false)
    const previewImage = ref(null)
    const fileImage = ref(null)
    const quizImage = ref(null)


    const addImage = (index) => {
        quizImage.value = index
        uploadImageModal.value = true

        
    }

    const pickImage = (e) => {
        let file = e.target.files

        fileImage.value = file[0]
        if (file && file[0]) {
          let reader = new FileReader
          reader.onload = e => {
            previewImage.value = e.target.result
          }
          reader.readAsDataURL(file[0])
        }
    }


    const confirmImage = () => {

        if(quizImage.value) {
            const q = props.form.quizSet[quizImage.value]
            q.quiz.answer_img_url = previewImage.value


            emits('setImage', {
                quizId: q.quiz.quiz_id,
                file: fileImage.value
            })
        }
       
       
        uploadImageModal.value = false
        previewImage.value = null
        quizImage.value = null

       
    }

</script>

<style lang="scss" scoped>



</style>