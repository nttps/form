<template>
    <PartialsTitle prefix="ระบบ" title="แบบฟอร์มสมัคร" icon="i-mdi-file-document-plus" back/>

    <div class="px-8 mt-4">
        <h3 class="text-xl md:text-2xl font-bold mb-4 flex items-center space-x-2">
            <div>สร้าง<span class="color-primary">แบบฟอร์มสมัคร</span></div> 
            <Icon name="i-mdi-pencil" size="25" color="black" />
        </h3>

        <UForm :state="form">
            <div class="px-6 py-4 bg-white rounded-lg mb-4">
                <div class="font-bold text-xl mb-2">แบบฟอร์มสมัคร</div>
                <UFormGroup label="ชื่อแบบฟอร์มสมัคร" name="title" size="xl" class="mb-2">
                    <UInput placeholder="กรอกชื่อแบบสอบถาม" size="md" />
                </UFormGroup>
                <UFormGroup label="รายละเอียด" name="description" size="xl" class="mb-2">
                    <ClientOnly>
                        <Editor v-model="form.description" height="300px" />
                    </ClientOnly>
                </UFormGroup>
            </div>

            <FormSetting />

            <div class="text-right mt-4">
                <button class="rounded-lg px-6 py-1.5 bg-[#FFA133]" @click="submit">สร้าง</button>
                <NuxtLink to="/" class="ml-4 rounded-lg px-6 py-1.5 border border-gray-400">ยกเลิก</NuxtLink>
            </div>
        </UForm>
    </div>

</template>

<script setup>

    useHead({
        title: `DDPM Questionnaire - สร้างฟอร์มสมัคร`,
    })
    const form = ref({
        title: '',
        description: '',
        type: 'form',
        questions: []
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
            placeholder: 'ชื่อภาพ ( ไม่จำเป็นต้องกรอก )',
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

    const submit = () => {
        navigateTo('/')
    }
</script>

<style lang="scss" scoped>
    .question-list-move {
        transition: transform 0.5s;
    }

    .answer-list-move {
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