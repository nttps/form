<template>

    <UForm 
        :state="props.form" 
        :schema="schema"
        @submit="emit('submit')"
    >
        <UTabs :items="showTabs" class="w-full">
            <template #form="{ item }">
                <div class="px-6 py-4 bg-white rounded-lg mb-4">
                    <div class="font-bold text-xl mb-2">{{ item.label }}</div>
                    <div class="md:flex md:space-x-4">
                        <div class="md:w-1/5">
                            <FormSetting :form="props.form" />
                        </div>
                        <div class="md:w-4/5">
                            <UFormGroup label="ชื่อแบบสอบถาม" name="survey_name" size="xl" class="mb-2">
                                <UInput v-model="props.form.survey_name" placeholder="กรอกชื่อแบบสอบถาม" size="md" :disabled="props.form.status === 'เปิด'" />
                            </UFormGroup>
                            <UFormGroup label="รายละเอียดแบบสอบถาม" name="description" size="xl" class="mb-2">
                                <ClientOnly>
                                    <Editor v-model="props.form.description" height="500px" />
                                </ClientOnly>
                            </UFormGroup>
                        </div>
                    </div>
                    <draggable 
                        class="dragArea list-group w-full mb-4" 
                        group="questions"
                        item-key="quiz.quiz_sort" 
                        v-model="props.form.questions" 
                        v-bind="dragOptions" 
                        @start="dragQuestion = true"
                        @end="dragQuestion = false" 
                        handle=".list-group-item-drag"
                    >
                        <transition-group 
                            type="transition" 
                            :name="dragQuestion ? 'drag-list' : null"
                        >
                            <div
                                class="list-group-item rounded-md mb-2 relative"
                                v-for="(question, index) in props.form.questions" :key="question.quiz.quiz_sort"
                            >
                                
                                <div class="absolute bottom-full right-0"  v-if="props.form.questions.length > 1">
                                    <UTooltip text="ลบคำถาม" v-if="props.form.status !== 'เปิด'">
                                        <UButton square icon="i-heroicons-x-circle-20-solid" variant="link" type="button" @click="confirmDeleteQuestion(index)" size="xl" :ui="{ icon: {size: { xl: 'h-7 w-7'}}}" color="white" :padded="false"/>
                                    </UTooltip>
                                    <div v-else class="text-xs text-red-600">ฟอร์มถูกแสดงอยู่ ไม่สามารถลบได้</div>
                                </div>
                                <div class="list-group-item-drag bg-[#FFA133] rounded-t-lg cursor-move text-center">
                                    <Icon name="i-uil-draggabledots" class="rotate-90" size="25"/>
                                </div>
                               
                                <div class="p-4 bg-white">
                                    
                                    <div class="flex flex-wrap space-x-4 mb-2">
                                        <div :class="`${question.quiz.answer_type === 'ตัวเลือกได้ข้อเดียว' || question.quiz.answer_type === 'เลือกได้หลายข้อ' ? `basis-1/2-gap-4` : `w-full` }`">
                                            <UInput v-model="question.quiz.quiz_title" :placeholder="question.quiz.answer_type === 'image' ? `คำถามแบบใส่รูปภาพ` : question.quiz.placeholder" size="md" :required="question.quiz.answer_type !== 'image'" :disabled="props.form.status === 'เปิด'" />
                                        </div>
                                        <div class="basis-1/2-gap-4" v-if="question.quiz.answer_type === 'ตัวเลือกได้ข้อเดียว' || question.quiz.answer_type === 'เลือกได้หลายข้อ'">
                                            <USelect size="md" :options="types" v-model="question.quiz.answer_type" placeholder="ประเภทคำถาม" option-attribute="name" required :disabled="props.form.status === 'เปิด'"/>
                                        </div>
                                    </div>
                                    <div v-if="question.quiz.answer_type !== 'image'">
                                        <UFormGroup label="รายละเอียด" name="description" size="xl" class="mb-2">
                                            <ClientOnly>
                                                <Editor v-model="question.quiz.quiz_desc" :height="question.quiz.answer_type == 'ข้อเขียน' ? `350px` : `300px`" />
                                            </ClientOnly>
                                        </UFormGroup>
                                    </div>
                                    <div v-if="question.quiz.answer_type === 'ตัวเลือกได้ข้อเดียว' || question.quiz.answer_type === 'เลือกได้หลายข้อ'" class="mt-2">
                                        <label for="" class="px-6">ตัวเลือก</label>
                                        <FormAnswer :index="index" :question="question" :status="props.form.status" @delete-answer="deleteAnswer" @add-answer="addAnswer"/>
                                    </div>
                                    <div v-if="question.quiz.answer_type === 'image'" class="mt-2">
                                        คำถามแบบใส่รูปภาพ
                                         <!-- <UTooltip text="แทรกรูปภาพตัวเลือก">
                                            <label :for="`question_image_${index}`" :class="props.status === 'เปิด' ? 'cursor-not-allowed' : 'cursor-pointer'" >
                                                <Icon name="i-mdi-file-image-box" size="25" @click="editImage(index)" />
                                            </label>
                                        </UTooltip>

                                        <img :src="question.quiz.quiz_img_url" class="h-[200px]"> -->
                                    </div>
                                </div>
                               
                            </div>
                        </transition-group>
                    </draggable>
                    <div class="flex justify-end mb-4">
                        <div class="border border-gray-400 rounded-lg bg-white flex px-2">
                            <UTooltip text="เพิ่มคำถามทั่วไป">
                                <button @click="addQuestion" type="button" class="text-gray-600 flex items-center space-x-2 px-1" :disabled="props.form.status === 'เปิด'">
                                    <Icon name="i-mdi-plus-circle-outline" size="35" />
                                </button>
                            </UTooltip>
                            <UTooltip text="เพิ่มคำถามแบบกรอกข้อความ">
                                <button @click="addText" type="button" class="text-gray-600 flex items-center space-x-2 px-1" :disabled="props.form.status === 'เปิด'">
                                    <Icon name="i-ic-twotone-text-fields" size="35" />
                                </button>
                            </UTooltip>
                            <UTooltip text="เพิ่มคำถามแบบใส่รูปภาพ">
                                <button @click="addImage" type="button" class="text-gray-600 flex items-center space-x-2 px-1" :disabled="props.form.status === 'เปิด'">
                                    <Icon name="i-ic-round-image" size="35" />
                                </button>
                            </UTooltip>
                        </div>
                    </div>
                </div>
            </template>

            <template #settings="{ item }">
                <div class="px-6 py-4 bg-white rounded-lg mb-4">
                    <div class="font-bold text-xl mb-2">{{ item.label }}</div>
                    <FormPermission :permissions="props.permissions.all" :user-permissions="props.permissions.user" @fetchData="emit('fetchData')" />
                </div>
            </template>
        </UTabs>

        <div class="text-right mt-4">
            <UButton type="submit" :disabled="props.loadingSubmit" :label="props.form.survey_id ? `แก้ไข` : `สร้าง`" size="xl" />
            <NuxtLink :to="`${props.form.survey_id ? `/lists` : `/`}`" class="ml-4 rounded-lg px-6 py-1.5 border border-gray-400">ยกเลิก</NuxtLink>
        </div>
    </UForm>

    <UModal v-model="uploadImageModal">
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="text-center">ตัวอย่างรูปภาพ</div>
            </template>
            <UInput type="file"  accept="image/x-png,image/gif,image/jpeg" @change="pickImage"/>
            <div class="text-center mt-2">
                <img :src="previewImage" v-if="previewImage" class="mx-auto mb-4" alt="">
                <UButton @click="confirmImage" label="แทรก"/>
            </div>
        </UCard>
    </UModal>

    <ModalSuccess v-model="alertQuestionDelete" title="แจ้งเตือน" close>
        <div class="text-2xl text-center font-bold pb-4">คำถามจะถูกลบโดยไม่ต้องบันทึกรายการ ยืนยันการลบคำถามนี้ใช่หรือไม่</div>
        <div class="flex justify-end space-x-3">
            <button type="button" class="px-4 py-2 bg-green-600 text-base rounded-[5px] text-white" @click="deleteQuestion">ยืนยัน</button>
            <button type="button" class="px-4 py-2 bg-gray-500 text-base rounded-[5px] text-white" @click="alertQuestionDelete = false">ทำรายการต่อ</button>
        </div>
    </ModalSuccess>
</template>

<script setup>

    import { object, string, date } from 'yup'

    const props = defineProps(['form', 'loadingSubmit', 'permissions', 'create'])

    const emit = defineEmits(['submit', 'fetchData'])

    const types = [ {
        name: 'ตัวเลือกเดียว',
        value: 'ตัวเลือกได้ข้อเดียว',
    }, {
        name: 'หลายตัวเลือก',
        value: 'เลือกได้หลายข้อ'
    }]

    const tabs = [{
        slot: 'form',
        label: 'แบบฟอร์มสอบถาม',
    }, {
        slot: 'settings',
        label: 'การเข้าถึง',
    }]

    const showTabs = computed(() => {
        if(props.create) {
            return [{
                slot: 'form',
                label: 'แบบฟอร์มสอบถาม',
            }]
        }

        return tabs
    })

    const schema = object({
        survey_name: string().required('กรอกหัวข้อแบบสอบถาม'),
        survey_date_from: date().required('กรุณาเลือกวันที่'),
        survey_date_to: date().required('กรุณาเลือกวันที่')
    })

    const uploadImageModal = ref(false)

    const dragOptions = computed(() => {
      return {
        animation: 1,
        disabled: false,
        ghostClass: 'ghost',
      }
    })

    const dragQuestion = ref(false)

    const addQuestion = () => {
        props.form.questions.push({
            quiz: {
                quiz_title: '',
                quiz_desc: '',
                answer_type: 'ตัวเลือกได้ข้อเดียว',
                placeholder: 'คำถาม',
                description: '',
                image_path: null,
                quiz_img_url: '',
                quiz_sort: (props.form.questions.length + 1),
            },
            answers: [{
                answer_id: "",
                answer: '',
                image_path: '',
                answer_img_url: null,
                answer_sort: 1,
            }]
        })
    }

    const previewImage = ref(null)
    const fileImage = ref(null)
    const quizImage = ref(null)

    const addImage = () => {
        props.form.questions.push({
            quiz: {
                quiz_title: '',
                quiz_desc: '',
                answer_type: 'image',
                placeholder: 'หัวข้อของภาพ ( ไม่จำเป็นต้องกรอก )',
                description: '',
                image_path: fileImage.value,
                quiz_img_url: previewImage.value,
                quiz_sort: (props.form.questions.length + 1),
            },
            answers: []
        })
    }

    const editImage = (index) => {
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
            const q = props.form.questions[quizImage.value]
            q.quiz.image_path = fileImage.value
            q.quiz.quiz_img_url = previewImage.value
        }else {
            props.form.questions.push({
                quiz: {
                    quiz_title: '',
                    quiz_desc: '',
                    answer_type: 'image',
                    placeholder: 'หัวข้อของภาพ ( ไม่จำเป็นต้องกรอก )',
                    description: '',
                    image_path: fileImage.value,
                    quiz_img_url: previewImage.value,
                    quiz_sort: (props.form.questions.length + 1),
                },
                answers: []
            })
        }
       
        uploadImageModal.value = false
        fileImage.value = null
        previewImage.value = null
        quizImage.value = null
    }
   
    const addText = () => {
        props.form.questions.push({
            quiz: {
                quiz_title: '',
                quiz_desc: '',
                answer_type: 'ข้อเขียน',
                placeholder: 'หัวข้อ',
                description: '',
                image_path: null,
                quiz_img_url: '',
                quiz_sort: (props.form.questions.length + 1),
            },
            answers: []
        })
    }
    
    const questionIndexDel = ref(null)

    const alertQuestionDelete = ref(false)
    const confirmDeleteQuestion = (index) =>{
        alertQuestionDelete.value = true
        questionIndexDel.value = index
    }

    const deleteQuestion = async () => {

        const question = props.form.questions[questionIndexDel.value];

        props.form.questions.splice(questionIndexDel.value, 1)


        if(question?.quiz.quiz_id) {
            const response = await useApi(`/api/servey/Quiz/DeleteQuiz`, 'DELETE', {
                QuizID: question?.quiz.quiz_id,
                ActionBy: username
            });
        }

        alertQuestionDelete.value = false
    }

     const addAnswer = (indexQuestion) => {
        const question = props.form.questions[indexQuestion];
        question.answers.push({
            answer: ``,
            answer_id: "",
            image_path: '',
            answer_img_url: null,
            answer_sort: (question.answers.length + 1),
        })
    }
    
    const { username } = useAuthStore();

    const deleteAnswer = async (value) => {

        const question = props.form.questions[value.index];
        const answer = question.answers[value.indexA]
        question.answers.splice(value.indexA, 1)

        if(answer?.answer_id) {
            const response = await useApi(`/api/servey/Quiz/DeleteAnswer`, 'DELETE', {
                AnswerID: answer.answer_id,
                ActionBy: username
            });
        }

    }
</script>

<style lang="scss" scoped>

</style>