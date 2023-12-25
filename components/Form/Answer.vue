<template>
    <draggable 
        class="list-group w-full mb-4" 
        :group="`quiz-${props.question.quiz.quiz_sort}`"
        item-key="answer_sort" 
        v-model="props.question.answers" 
        v-bind="dragOptions" 
        @start="dragAnswer = true"
        @end="dragAnswerEnd" 
        handle=".answer-item-drag"
    >
        <transition-group 
            type="transition" 
            :name="dragAnswer ? 'drag-list' : null"
        >
            <div v-for="(answer, indexA) in props.question.answers" :key="answer.answer_sort">
                <div class="flex items-center py-2 space-x-4 group list-group-item">
                    <div class="min-w-max items-center flex">
                        <div class="w-[25px] answer-item-drag cursor-move">
                            <Icon name="i-uil-draggabledots" class="group-hover:!inline-block !hidden" size="25"/>
                        </div>
                        <div class="w-[30px]">
                            <Icon :name="`${props.question.quiz.answer_type == 'ตัวเลือกได้ข้อเดียว' ? `i-ic-round-radio-button-unchecked` : `i-mdi-checkbox-blank-outline`}`" size="30"/>
                        </div>
                    </div>
                    <div class="flex-1">
                        <UInput placeholder="กรอกคำตอบ" v-model="answer.answer" :placeholder="`ตัวเลือกที่ ${indexA+1}`" required :disabled="props.status === 'เปิด'"/>
                    </div>
                    <div class="min-w-max flex space-x-2">
                        <UTooltip text="แทรกรูปภาพตัวเลือก">
                            <label :for="`image_${indexA}`" :class="props.status === 'เปิด' ? 'cursor-not-allowed' : 'cursor-pointer'" >
                                <Icon name="i-mdi-file-image-box" size="25" />
                                <UInput type="file" :name="`image_${indexA}`" :disabled="props.status === 'เปิด'" accept="image/x-png,image/gif,image/jpeg" @change="pickImage($event, indexA)" :id="`image_${indexA}`" class="hidden" />
                            </label>
                        </UTooltip>
                        <UTooltip text="ลบตัวเลือก" v-if="props.question.answers.length > 1" >
                            <button class="hover:bg-black/5 text-gray-600" :class="props.status === 'เปิด' ? 'cursor-not-allowed' : ''" :disabled="props.status === 'เปิด'" type="button" @click="confirmDeleteAnswer(props.index, indexA)"> 
                                <Icon name="i-mdi-close" size="30"/> 
                            </button>
                        </UTooltip>
                    </div>
                </div>

                <div v-if="answer.answer_img_url || answer.image_path" class="ml-7 mt-4 relative max-w-max">
                    <div class="absolute top-1 right-1">
                        <UButton type="button" icon="i-heroicons-x-mark" variant="soft" color="red" class="ml-2" @click="alertDeleteImage(indexA)" :disabled="props.status === 'เปิด'" />
                    </div>
                    <img :src="answer.answer_img_url" class="h-[200px]">
                </div>
            </div>
        </transition-group>
    </draggable>
    <button type="button" @click="emits('addAnswer', props.index )" class="ml-6 block"><Icon name="material-symbols:add-circle-outline" size="30" /> เพิ่มตัวเลือก</button>


    <ModalSuccess v-model="alertImageDelete" title="แจ้งเตือน" close>
        <div class="text-2xl text-center font-bold pb-4">ยืนยันการลบรูปภาพนี้</div>
        <div class="flex justify-end space-x-3">
            <button type="button" class="px-4 py-2 bg-green-600 text-base rounded-[5px] text-white" @click="submitDeleteImage">ยืนยัน</button>
            <button type="button" class="px-4 py-2 bg-gray-500 text-base rounded-[5px] text-white" @click="alertImageDelete = false">ทำรายการต่อ</button>
        </div>
    </ModalSuccess>

    <ModalSuccess v-model="alertAnswerDelete" title="แจ้งเตือน" close>
        <div class="text-2xl text-center font-bold pb-4">ยืนยันการลบตัวเลือกนี้</div>
        <div class="flex justify-end space-x-3">
            <button type="button" class="px-4 py-2 bg-green-600 text-base rounded-[5px] text-white" @click="deleteAnswer">ยืนยัน</button>
            <button type="button" class="px-4 py-2 bg-gray-500 text-base rounded-[5px] text-white" @click="alertAnswerDelete = false">ทำรายการต่อ</button>
        </div>
    </ModalSuccess>
</template>


<script setup>
    const props = defineProps(['question', 'index', 'status'])
    const emits = defineEmits(['addAnswer', 'deleteAnswer'])

    const { username } = useAuthStore();


    const alertImageDelete = ref(false)
    const alertAnswerDelete = ref(false)
    const answerIndexDel = ref({
        question: null,
        answer: null
    })

    const dragOptions = computed(() => {
      return {
        animation: 1,
        disabled: false,
        ghostClass: 'ghost',
      }
    })

    const dragAnswer = ref(false)
    const dragAnswerEnd = (e) => {
        dragAnswer.value = false
        console.log(newPosition.value);
    }

    const pickImage = (e, index) => {
        let file = e.target.files

        const answer = props.question.answers[index]

        answer.image_path = file[0]
        if (file && file[0]) {
          let reader = new FileReader
          reader.onload = e => {
            answer.answer_img_url = e.target.result
          }
          reader.readAsDataURL(file[0])
        }
    }

    const imageIndexDel = ref(null)

    const alertDeleteImage = (index) => {
        alertImageDelete.value = true
        imageIndexDel.value = index
    }

    const submitDeleteImage = async () => {
        const answer = props.question.answers[imageIndexDel.value]
        answer.answer_img = null; 
        answer.image_path = null

        const res = await useApi('/api/servey/Quiz/DeleteAnswerPhoto', 'DELETE', { 
            AnswerID: answer.answer_id,
            ActionBy: username
        })

        if(res.result == 'ok') {
            alertImageDelete.value = false
        }
    }


    const confirmDeleteAnswer = (qIndex, AIndex) =>{

        console.log(AIndex);
        alertAnswerDelete.value = true
        answerIndexDel.value.question = qIndex
        answerIndexDel.value.answer = AIndex
    }

    const deleteAnswer = () =>{

        alertAnswerDelete.value = false
        emits('deleteAnswer', { index: answerIndexDel.value.question, indexA: answerIndexDel.value.answer })
    }
    

   

        
</script>

<style>
    .answer-list-move {
        transition: transform 0.5s;
    }
    
</style>