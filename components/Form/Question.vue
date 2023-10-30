<template>

    <UForm 
        :state="props.form" 
        :schema="schema"
        @submit="emit('submit')"
    >
        <UTabs :items="tabs" class="w-full">
            <template #form="{ item }">
                <div class="px-6 py-4 bg-white rounded-lg mb-4">
                    <div class="font-bold text-xl mb-2">{{ item.label }}</div>
                    <div class="md:flex md:space-x-4">
                        <div class="md:w-1/5">
                            <FormSetting :form="props.form" />
                        </div>
                        <div class="md:w-4/5">
                            <UFormGroup label="ชื่อแบบสอบถาม" name="survey_name" size="xl" class="mb-2">
                                <UInput v-model="props.form.survey_name" placeholder="กรอกชื่อแบบสอบถาม" size="md" />
                            </UFormGroup>
                            <UFormGroup label="รายละเอียด" name="description" size="xl" class="mb-2">
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
                        @end="dragQuestionEnd" 
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
                                <div class="list-group-item-drag text-center bg-[#FFA133] rounded-t-lg cursor-move">
                                    <Icon name="i-uil-draggabledots" class="rotate-90" size="25"/>
                                </div>
                                <div class="p-4 bg-white">
                                    <div class="flex flex-wrap space-x-4 mb-2">
                                        <div :class="`${question.quiz.answer_type === 'ตัวเลือกได้ข้อเดียว' || question.quiz.answer_type === 'เลือกได้หลายข้อ' ? `basis-1/2-gap-4` : `w-full` }`">
                                            <UInput v-model="question.quiz.quiz_desc" :placeholder="question.quiz.placeholder" size="md" required />
                                        </div>
                                        <div class="basis-1/2-gap-4" v-if="question.quiz.answer_type === 'ตัวเลือกได้ข้อเดียว' || question.quiz.answer_type === 'เลือกได้หลายข้อ'">
                                            <USelect size="md" :options="types" v-model="question.quiz.answer_type" placeholder="ประเภทคำถาม" option-attribute="name" required/>
                                        </div>
                                    </div>
                                    <div>
                                        <UFormGroup label="รายละเอียด" name="description" size="xl" class="mb-2">
                                            <ClientOnly>
                                                <Editor v-model="question.quiz.description" :height="question.quiz.answer_type == 'ข้อความ' ? `350px` : `300px`" />
                                            </ClientOnly>
                                        </UFormGroup>
                                    </div>
                                    <div v-if="question.quiz.answer_type === 'ตัวเลือกได้ข้อเดียว' || question.quiz.answer_type === 'เลือกได้หลายข้อ'" class="mt-2">
                                        <label for="" class="px-6">ตัวเลือก</label>
                                        <FormAnswer :index="index" :question="question" @delete-answer="deleteAnswer" @add-answer="addAnswer"/>
                                    </div>
                                    <div v-if="question.quiz.answer_type === 'image'" class="mt-2 text-center">
                                        <img :src="question.previewImage" alt="" class="mx-auto" />
                                    </div>
                                </div>
                                <div class="text-right">
                                    <button type="button" @click="deleteQuestion(index)" v-if="props.form.questions.length > 1"><Icon name="i-mdi-close" /></button>
                                </div>
                            </div>
                        </transition-group>
                    </draggable>
                    <div class="flex justify-end mb-4">
                        <div class="border border-gray-400 rounded-lg bg-white flex px-2">
                            <UTooltip text="เพิ่มคำถามทั่วไป">
                                <button @click="addQuestion" type="button" class="text-gray-600 flex items-center space-x-2 px-1">
                                    <Icon name="i-mdi-plus-circle-outline" size="35" />
                                </button>
                            </UTooltip>
                            <UTooltip text="เพิ่มข้อความ">
                                <button @click="addText" type="button" class="text-gray-600 flex items-center space-x-2 px-1">
                                    <Icon name="i-ic-twotone-text-fields" size="35" />
                                </button>
                            </UTooltip>
                            <UTooltip text="เพิ่มรูปภาพ">
                                <button @click="addImage" type="button" class="text-gray-600 flex items-center space-x-2 px-1">
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
        <UInput type="file" @change="pickImage"/>
        <img :src="previewImage" v-if="previewImage" alt="">
        <button @click="confirmImage">แทรก</button>
    </UModal>
</template>

<script setup>

    import moment from 'moment';
    import { object, string, date } from 'yup'

    const props = defineProps(['form', 'loadingSubmit', 'permissions'])

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

    const dateNow = moment().format('YYYY-MM-DDT00:00:00')

    const schema = object({
        survey_name: string().required('กรอกหัวข้อแบบสอบถาม'),
        survey_date_from: date().min(dateNow, 'เลือกวันที่ปัจจุบัน').required('กรุณาเลือกวันที่'),
        survey_date_to: date().min(dateNow, 'เลือกวันที่ปัจจุบัน').required('กรุณาเลือกวันที่')
    })

    const uploadImageModal = ref(false)

    const newPosition = computed(() => {
        return props.form.questions.map((question, index) => {
            return { title: question.title , type: question.type, position: index + 1, answers: question.answers };
        })

    })
    const dragOptions = computed(() => {
      return {
        animation: 1,
        disabled: false,
        ghostClass: 'ghost',
      }
    })

    const dragQuestion = ref(false)

    const dragQuestionEnd = (e) => {
        dragQuestion.value = false
        console.log(newPosition.value);
    }

    const addQuestion = () => {
        props.form.questions.push({
            quiz: {
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
                answer: 'ตัวเลือกที่ 1',
                image_path: '',
                answer_img_url: null,
                answer_sort: 1,
            }]
        })
    }

    const previewImage = ref(null)
    const fileImage = ref(null)

    const addImage = () => {
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
        props.form.questions.push({
            quiz_desc: '',
            answer_type: 'image',
            description: '',
            image: fileImage.value,
            previewImage: previewImage.value,
            placeholder: 'หัวข้อของภาพ ( ไม่จำเป็นต้องกรอก )',
            position: (props.form.questions.length + 1),
            answers: []
        })

        uploadImageModal.value = false
        fileImage.value = null
        previewImage.value = null
    }
   
    const addText = () => {
        props.form.questions.push({
            quiz_desc: '',
            answer_type: 'ข้อความ',
            placeholder: 'หัวข้อ',
            description: '',
            previewImage: previewImage.value,
            image: '',
            position: (props.form.questions.length + 1),
            answers: []
        })
    }


    const deleteQuestion = (index) => {
        props.form.questions.splice(index, 1)
    }

    const addAnswer = (indexQuestion) => {
        const question = props.form.questions[indexQuestion];
        question.answers.push({
            answer: `ตัวเลือกที่ ${question.answers.length + 1}`,
            answer_id: "",
            image_path: '',
            answer_img_url: null,
            answer_sort: (question.answers.length + 1),
        })
    }
    const deleteAnswer = (value) => {
        const question = props.form.questions[value.index];
        question.answers.splice(value.indexA, 1)
    }

    const departments = [{
        name: 'ทั้งหมด',
        value: '',
    }, {
        name: 'กก',
        value: 'กก',
    }, {
        name: 'กจ',
        value: 'กจ'
    }]
</script>

<style lang="scss" scoped>

</style>