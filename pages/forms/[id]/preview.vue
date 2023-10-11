<template>
    <PartialsTitle prefix="ผล" title="แบบสอบถาม" icon="i-mdi-vote" back/>

    <div class="px-8 mt-4">
        <div class="mb-4">
            <div class="text-center bg-[#FFA133] rounded-t-lg cursor-move py-4"></div>
            <div class="p-4 bg-white">
                <h2 class="text-xl font-bold">{{ form.title }}</h2>
                <p>{{ form.description }}</p>
            </div>
        </div>
        <div
            class="rounded-md mb-4 bg- relative"
            v-for="(question, index) in form.questions" :key="question.position"
        >
            <div class="text-center bg-[#FFA133] rounded-t-lg cursor-move py-4"></div>
            <div class="p-4 bg-white">
                <div class="mb-2">
                    <div class="text-lg font-bold">{{ question.question }}</div>
                    <p>{{ question.description }}</p>
                </div>
                <div v-if="question.type == 'radio'" class="flex space-x-2 items-center ml-2"> 
                    <Icon name="i-mdi-checkbox-marked-circle" size="20" /> <span>{{ question.answer }}</span>
                </div>
                <div v-if="question.type == 'checkbox'">
                    <div v-for="q in question.checkBoxAnswers" class="flex space-x-2 items-center ml-2">
                        <Icon name="i-carbon-checkbox-checked-filled" size="20" /> <span>{{ q }}</span>
                    </div>
                </div>
                
                
                <div v-if="question.type === 'image'" class="mt-2 text-center">
                    <img :src="question.previewImage" alt="" class="mx-auto" />
                </div>
                <div v-if="question.type === 'text'" class="mt-2">
                    {{ question.description }}
                </div>
            </div>
        </div>
        <div class="mb-4">
            <div class="text-center bg-[#FFA133] rounded-t-lg cursor-move py-4"></div>
            <div class="p-4 bg-white">
                <div class="text-lg font-bold mb-2">ข้อเสนอแนะ</div>
                <div class="rounded-md px-2.5 py-1.5 shadow-sm bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400">
                    {{ form.remark }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const form = ref({
        title: 'หัวข้อแบบสอบถาม',
        description: 'รายละเอียด',
        type: 'form',
        remark: 'ทดสอบกรอกข้อเสนอแนะ',
        questions: [
            {
                question: 'คำถามของแบบสอบถาม 1',
                description: 'รายละเอียดแบบสอบถาม',
                type: 'radio',
                position: 1,
                placeholder: 'คำถาม',
                answer: 'ตัวเลือกที่ 1',
                checkBoxAnswers: [],
                answers: [{
                    title: 'ตัวเลือกที่ 1',
                    image: '',
                    position: 1,
                },{
                    title: 'ตัวเลือกที่ 2',
                    image: '',
                    position: 2,
                },{
                    title: 'ตัวเลือกที่ 3',
                    image: '',
                    position: 3,
                },{
                    title: 'ตัวเลือกที่ 4',
                    image: '',
                    position: 4,
                }]
            },
            {
                question: 'คำถามของแบบสอบถาม 2',
                description: 'รายละเอียดแบบสอบถาม',
                type: 'checkbox',
                position: 2,
                placeholder: 'คำถาม',
                answer: '',
                checkBoxAnswers: ['ตัวเลือกที่ 1', 'ตัวเลือกที่ 2'],
                answers: [{
                    title: 'ตัวเลือกที่ 1',
                    image: '',
                    position: 1,
                    isSelect: false
                },{
                    title: 'ตัวเลือกที่ 2',
                    image: '',
                    position: 2,
                    isSelect: false
                },{
                    title: 'ตัวเลือกที่ 3',
                    image: '',
                    position: 3,
                    isSelect: false
                },{
                    title: 'ตัวเลือกที่ 4',
                    image: '',
                    position: 4,
                    isSelect: false
                },{
                    title: 'ตัวเลือกที่ 5',
                    image: '',
                    position: 5,
                    isSelect: false
                },{
                    title: 'ตัวเลือกที่ 6',
                    image: '',
                    position: 6,
                    isSelect: false
                }]
            },
        ]
    })

    const title = `DDPM Questionnaire - ${form.value.title}`
    useSeoMeta({
        ogTitle: () => title,
        title: () => title,
        description: () => form.value.description,
        ogDescription: () => form.value.description,
        ogImage: () => 'https://example.com/image.png',
        ogImageUrl: () => 'https://example.com/image.png',
        twitterCard: () => 'summary_large_image',
        twitterTitle: () => title,
        twitterDescription: () => form.value.description,
        twitterImage: () => 'https://example.com/image.png'
    })

    const submit = () => {
        na
    }
</script>

<style lang="scss" scoped>
</style>