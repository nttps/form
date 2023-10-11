<template>
    <PartialsTitle prefix="ระบบ" title="แบบสอบถาม" icon="i-mdi-vote" back share @share="shareModal"/>

    <form class="px-8 mt-4" @submit.prevent="submit">
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
                <URadio required v-if="question.type == 'radio'" v-for="answer of question.answers" :label="answer.title" :name="question.question" :value="answer.title" :key="answer.position" v-model="question.answer"/>
                <div v-if="question.type == 'checkbox'">
                    <UCheckbox v-model="question.checkBoxAnswers" :ui="{ color: 'text-primary-500' }" v-for="answer of question.answers" :name="question.question" :label="answer.title" :value="answer.title" :required="question.checkBoxAnswers.length == 0" />
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
                <UTextarea v-model="form.remark" placeholder="กรอกข้อเสนอแนะ" color="gray" :rows="5" size="xl"/>
            </div>
        </div>
        <div class="text-center">
             <button class="rounded-lg px-6 py-1.5 bg-[#FFA133]" type="submit">ส่ง</button>
        </div>
    </form>

     <UModal v-model="share">
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex justify-between items-center">
                    <div class="text-xl font-bold">แบ่งปันแบบสอบถามนี้</div>
                    <div>
                        <UButton icon="i-heroicons-x-mark" size="sm" color="gray" square variant="link" @click="share = false" />
                    </div>
                </div>
            </template>
            <UTabs :items="shareTab">

            </UTabs>
                
                <s-facebook
                    :window-features="{ width: 685, height: 600, }"
                    :share-options="shareOptions"
                    @popup-close="onClose"
                    @popup-open="onOpen"
                    @popup-block="onBlock"
                    @popup-focus="onFocus"
                >
                    <Icon name="i-logos-facebook" size="25" />
                </s-facebook>
            </div>
            <template #footer>
                <div class="text-right">
                    <button type="button" @click="share = false" class="mr-4"> ยกเลิก</button>
                    <UButton variant="outline" label="คัดลอก" size="xl" />
                </div>
            </template>
        </UCard>
        
    </UModal>
</template>

<script setup>
    import { SFacebook } from 'vue-socials';
    const share = ref(false)

    const shareTab = [{
        key: 'account',
        label: 'Account',
    }]
    const form = ref({
        title: 'หัวข้อแบบสอบถาม',
        description: 'รายละเอียด',
        type: 'form',
        remark: '',
        questions: [
            {
                question: 'คำถามของแบบสอบถาม 1',
                description: 'รายละเอียดแบบสอบถาม',
                type: 'radio',
                position: 1,
                placeholder: 'คำถาม',
                answer: '',
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
                checkBoxAnswers: [],
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

    const submit = () => {
        navigateTo('/forms/1/preview')
    }

    const shareModal = () => {
        share.value = true
    }

    const shareOptions = ref({
        url: 'https://ui.nuxt.com/elements/button#icon',
        quote: 'Quote',
        hashtag: '#Facenook',
    })

    const onClose = () => {}
    const onOpen = () => {}
    const onBlock = () => {}
    const onFocus = () => {}
</script>

<style lang="scss" scoped>
</style>