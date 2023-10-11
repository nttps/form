<template>
    <PartialsTitle prefix="ระบบ" title="แบบสอบถาม" icon="i-mdi-file-document-plus" back/>

    <div class="px-8 mt-4">
        <h3 class="text-xl md:text-2xl font-bold mb-4 flex items-center space-x-2">
            <div>สร้าง<span class="color-primary">แบบสอบถาม</span></div> 
            <Icon name="i-mdi-pencil" size="25" color="black" />
        </h3>

        <UForm :state="form">
            <div class="px-6 py-4 bg-white rounded-lg mb-4">
                <div class="font-bold text-xl mb-2">แบบสอบถาม</div>
                <UFormGroup label="ชื่อแบบสอบถาม" name="title" size="xl" class="mb-2">
                    <UInput v-model="form.title" placeholder="กรอกชื่อแบบสอบถาม" size="md" />
                </UFormGroup>
                <UFormGroup label="รายละเอียด" name="description" size="xl" class="mb-2">
                    <ClientOnly>
                        <Editor v-model="form.description" />
                    </ClientOnly>
                </UFormGroup>
            </div>


            <draggable 
                class="dragArea list-group w-full mb-4" 
                group="questions"
                item-key="position" 
                v-model="form.questions" 
                v-bind="dragOptions" 
                @start="dragQuestion = true"
                @end="dragQuestionEnd" 
                handle=".list-group-item-drag"
            >
                <transition-group 
                    type="transition" 
                    :name="dragQuestion ? 'question-list' : null"
                >
                    <div
                        class="list-group-item rounded-md mb-2 bg- relative"
                        v-for="(question, index) in form.questions" :key="question.position"
                    >
                        <div class="list-group-item-drag text-center bg-[#FFA133] rounded-t-lg cursor-move">
                            <Icon name="i-uil-draggabledots" class="rotate-90" size="25"/>
                        </div>
                        <div class="p-4 bg-white">
                            <div class="flex flex-wrap space-x-4 mb-2">
                                <div :class="`${question.type === 'radio' || question.type === 'checkbox' ? `basis-1/2-gap-4` : `w-full` }`">
                                    <UInput v-model="question.question" :placeholder="question.placeholder" size="md" />
                                </div>
                                <div class="basis-1/2-gap-4" v-if="question.type === 'radio' || question.type === 'checkbox'">
                                    <USelect size="md" :options="types" v-model="question.type" placeholder="ประเภทคำถาม" option-attribute="name" />
                                </div>
                            </div>
                            <div>
                                <UFormGroup label="รายละเอียด" name="description" size="xl" class="mb-2">
                                    <ClientOnly>
                                        <Editor v-model="question.description" :height="question.type == 'text' ? `300px` : ``" />
                                    </ClientOnly>
                                </UFormGroup>
                            </div>
                            <div v-if="question.type === 'radio' || question.type === 'checkbox'" class="mt-2">
                                <label for="" class="px-6">ตัวเลือก</label>
                                <FormAnswer :index="index" :question="question" @delete-answer="deleteAnswer" @add-answer="addAnswer"/>
                            </div>
                            <div v-if="question.type === 'image'" class="mt-2 text-center">
                                <img :src="question.previewImage" alt="" class="mx-auto" />
                            </div>
                        </div>
                        <div class="text-right">
                            <button @click="deleteQuestion(index)" v-if="form.questions.length > 1"><Icon name="i-mdi-close" /></button>
                        </div>
                    </div>
                </transition-group>
            </draggable>
            <div class="flex justify-end mb-4">
                <div class="border border-gray-400 rounded-lg bg-white flex px-2">
                    <UTooltip text="เพิ่มคำถามทั่วไป">
                        <button @click="addQuestion" class="text-gray-600 flex items-center space-x-2 px-1">
                            <Icon name="i-mdi-plus-circle-outline" size="35" />
                        </button>
                    </UTooltip>
                    <UTooltip text="เพิ่มข้อความ">
                        <button @click="addText" class="text-gray-600 flex items-center space-x-2 px-1">
                            <Icon name="i-ic-twotone-text-fields" size="35" />
                        </button>
                    </UTooltip>
                    <UTooltip text="เพิ่มรูปภาพ">
                        <button @click="addImage" class="text-gray-600 flex items-center space-x-2 px-1">
                            <Icon name="i-ic-round-image" size="35" />
                        </button>
                    </UTooltip>
                </div>
            </div>

            <FormSetting />

            <div class="text-right mt-4">
                <button class="rounded-lg px-6 py-1.5 bg-[#FFA133]" @click="submit">สร้าง</button>
                <NuxtLink to="/" class="ml-4 rounded-lg px-6 py-1.5 border border-gray-400">ยกเลิก</NuxtLink>
            </div>
        </UForm>
    </div>

    <UModal v-model="uploadImageModal">
        <UInput type="file" @change="pickImage"/>
        <img :src="previewImage" v-if="previewImage" alt="">
        <button @click="confirmImage">แทรก</button>
    </UModal>
</template>

<script setup>

    const types = [ {
        name: 'ตัวเลือกเดียว',
        value: 'radio',
    }, {
        name: 'หลายตัวเลือก',
        value: 'checkbox'
    }]

    const form = ref({
        title: '',
        description: 'รายละเอยีด',
        type: 'form',
        questions: [
            {
                question: '',
                type: 'radio',
                position: 1,
                placeholder: 'คำถาม',
                answers: [{
                    title: 'ตัวเลือกที่ 1',
                    image: '',
                    position: 1,
                }]
            },
        ]
    })

    const uploadImageModal = ref(false)

    const newPosition = computed(() => {
        return form.value.questions.map((question, index) => {
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
        form.value.questions.push({
            question: '',
            type: 'radio',
            placeholder: 'คำถาม',
            description: '',
            image: '',
            previewImage: previewImage.value,
            position: (form.value.questions.length + 1),
            answers: [{
                title: 'ตัวเลือกที่ 1',
                image: '',
                position: 1,
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
        form.value.questions.push({
            question: '',
            type: 'image',
            description: '',
            image: fileImage.value,
            previewImage: previewImage.value,
            placeholder: 'หัวข้อของภาพ ( ไม่จำเป็นต้องกรอก )',
            position: (form.value.questions.length + 1),
            answers: []
        })

        uploadImageModal.value = false
        fileImage.value = null
        previewImage.value = null
    }
   
    const addText = () => {
        form.value.questions.push({
            question: '',
            type: 'text',
            placeholder: 'หัวข้อ',
            description: '',
            previewImage: previewImage.value,
            image: '',
            position: (form.value.questions.length + 1),
            answers: []
        })
    }


    const deleteQuestion = (index) => {
        form.value.questions.splice(index, 1)
    }

    const addAnswer = (indexQuestion) => {
        const question = form.value.questions[indexQuestion];
        question.answers.push({
            title: `ตัวเลือกที่ ${question.answers.length + 1}`,
            position: (question.answers.length + 1),
        })
    }
    const deleteAnswer = (value) => {
        const question = form.value.questions[value.index];
        question.answers.splice(value.indexA, 1)
    }
    
    const submit = () => {
        navigateTo('/')
    }
</script>

<style lang="scss" scoped>
    .question-list-move {
        transition: transform 0.5s;
    }

    .no-move {
        transition: transform 0s;
    }
    .ghost {
        opacity: 0.5;
        padding: .5rem 0;
        background: #c8ebfb;
    }
</style>