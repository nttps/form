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
                            <UFormGroup label="ชื่อแบบฟอร์มสมัคร" name="survey_name" size="xl" class="mb-2">
                                <UInput v-model="props.form.survey_name" :disabled="props.form.status === 'เปิด'" placeholder="กรอกชื่อแบบฟอร์มสมัคร" size="md" />
                            </UFormGroup>
                            <UFormGroup label="รายละเอียดแบบฟอร์มสมัคร" name="description" size="xl" class="mb-2">
                                <ClientOnly>
                                    <Editor v-model="props.form.description" height="400px" />
                                </ClientOnly>
                            </UFormGroup>
                        </div>
                    </div>
                    <draggable 
                        class="dragArea list-group w-full my-4" 
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
                                    <UTooltip text="ลบคำถาม">
                                        <UButton square icon="i-heroicons-x-circle-20-solid" variant="link" type="button" @click="deleteQuestion(index)" :disabled="props.form.status === 'เปิด'" size="xl" :ui="{ icon: {size: { xl: 'h-7 w-7'}}}" color="white" :padded="false"/>
                                    </UTooltip>
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
                                    <div v-if="question.quiz.answer_type === 'image' || question.quiz.answer_type === 'ข้อเขียน'" class="mt-2 text-red-600 text-sm">
                                        {{ question.quiz.answer_type === 'image' ? `*แสดงปุ่มเพิ่มรูปภาพในหน้ากรอกแบบฟอร์ม` : `*แสดงกล่องข้อความให้กรอกในหน้ากรอกแบบฟอร์ม` }}
                                    </div>
                                    <div v-if="question.quiz.answer_type !== 'image'">
                                        <UFormGroup label="รายละเอียดคำถาม" name="description" size="xl" class="mb-2">
                                            <ClientOnly>
                                                <Editor v-model="question.quiz.quiz_desc" :height="question.quiz.answer_type == 'ข้อเขียน' ? `350px` : `300px`" />
                                            </ClientOnly>
                                        </UFormGroup>
                                    </div>
                                    <div v-if="question.quiz.answer_type === 'ตัวเลือกได้ข้อเดียว' || question.quiz.answer_type === 'เลือกได้หลายข้อ'" class="mt-2">
                                        <label for="" class="px-6">ตัวเลือก</label>
                                        <FormAnswer :index="index" :question="question" :status="props.form.status" @delete-answer="deleteAnswer" @add-answer="addAnswer"/>
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

                    <FormPermission :permissions="props.permissions.all" :user-permissions="props.permissions.user" @fetchData="emit('fetchData')"/>

                </div>
            </template>
        </UTabs>

        <div class="text-right mt-4">
            <UButton size="xl" :label="props.form.survey_id ? `แก้ไข` : `สร้าง`" type="submit" />
            <NuxtLink :to="`${props.form.survey_id ? `/lists` : `/`}`" class="ml-4 rounded-lg px-6 py-1.5 border border-gray-400">ยกเลิก</NuxtLink>
        </div>
    </UForm>

</template>

<script setup>
    import { object, string, date } from 'yup'

    const props = defineProps(['form', 'permissions', 'create'])

    const emit = defineEmits(['submit', 'fetchData'])

    const types = [ {
        name: 'ตัวเลือกเดียว',
        value: 'ตัวเลือกได้ข้อเดียว',
    }, {
        name: 'หลายตัวเลือก',
        value: 'เลือกได้หลายข้อ'
    }]

    const schema = object({
        survey_name: string().required('กรอกหัวข้อแบบฟอร์มสมัคร'),
        survey_date_from: date().required('กรุณาเลือกวันที่'),
        survey_date_to: date().required('กรุณาเลือกวันที่')
    })

    const tabs = [{
        slot: 'form',
        label: 'แบบฟอร์มสมัคร',
    }, {
        slot: 'settings',
        label: 'การเข้าถึง',
    }]

    const showTabs = computed(() => {
        if(props.create) {
            return [{
                slot: 'form',
                label: 'แบบฟอร์มสมัคร',
            }]
        }

        return tabs
    })

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
    const addImage = () => {
        props.form.questions.push({
            quiz: {
                quiz_title: '',
                quiz_desc: '',
                answer_type: 'image',
                description: '',
                image_path: '',
                quiz_img_url: '',
                quiz_sort: (props.form.questions.length + 1),
            },
        })
    }

    const addText = () => {
        props.form.questions.push({
            quiz: {
                quiz_title: '',
                quiz_desc: '',
                answer_type: 'ข้อเขียน',
                placeholder: 'คำถาม',
                description: '',
                image_path: null,
                quiz_img_url: '',
                quiz_sort: (props.form.questions.length + 1),
            },
            answers: []
        })
    }

    const { username } = useAuthStore();

    const deleteQuestion = async (index) => {
        const question = props.form.questions[index];
        props.form.questions.splice(index, 1)

        if(question?.quiz?.quiz_id) {
            const response = await useApi(`/api/servey/Quiz/DeleteQuiz`, 'DELETE', {
                QuizID: question.quiz.quiz_id,
                ActionBy: username
            });
        }
        
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
    const deleteAnswer = async (value) => {
        const question = props.form.questions[value.index];
        const answer = props.form.answers[value.indexA]
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