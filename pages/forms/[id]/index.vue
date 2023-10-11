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
                    <div class="text-xl font-bold">{{ question.question }}</div>
                    <p class="text-lg">{{ question.description }}</p>
                </div>
                <URadio required v-if="question.type == 'radio'" :ui="{ wrapper: 'relative flex items-center mb-2' }" v-for="answer of question.answers" :label="answer.title" :name="question.question" :value="answer.title" :key="answer.position" v-model="question.answer"/>
                <div v-if="question.type == 'checkbox'">
                    <UCheckbox v-model="question.checkBoxAnswers" :ui="{ wrapper: 'relative flex items-center mb-2', color: 'text-primary-500' }" v-for="answer of question.answers" :name="question.question" :label="answer.title" :value="answer.title" :required="question.checkBoxAnswers.length == 0" />
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
               <div class="flex items-center space-x-2">
                <div class="text-lg max-w-max">ลิงก์</div>
                <input class="form-input relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3 py-2 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400" type="text" readonly  ref="shareUrl" @click="$event.target.select()" :value="urlShare" />
                <UButton variant="outline" label="คัดลอก" size="xl" @click="copyToClipboard" />
            </div>
            <div class="flex items-center mt-4 space-x-2">
                <div class="text-lg">แชร์</div>
                <s-facebook
                    :window-features="{ width: 685, height: 600, }"
                    :use-native-behavior="true"
                    :share-options="shareFBOptions"
                    @popup-close="onClose"
                    @popup-open="onOpen"
                    @popup-block="onBlock"
                    @popup-focus="onFocus"
                >
                    <Icon name="i-logos-facebook" size="25" />
                </s-facebook>

                <s-line
                    :window-features="{ width: 685, height: 600, }"
                    :use-native-behavior="true"
                    :share-options="shareLineOptions"
                    @popup-close="onClose"
                    @popup-open="onOpen"
                    @popup-block="onBlock"
                    @popup-focus="onFocus"
                >
                    <Icon name="i-bi-line" color="green" size="25" />
                </s-line>
            </div>
        </UCard>
        
    </UModal>
    <UNotifications/>
</template>

<script setup>
    import { SFacebook, SLine } from 'vue-socials';
    const { copy } = useCopyToClipboard()
    const url = useRequestURL()
    const share = ref(false)
    const shareUrl= ref()

    const urlShare = url.href
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
        navigateTo('/forms/1/preview')
    }

    const shareModal = () => {
        share.value = true
    }

    const copyToClipboard = () => {

        shareUrl.value.click()
        copy(urlShare, { title: 'คัดลอกลิงก์สำเร็จ', closeButton : false, timeout: 2000})
    }

    const shareFBOptions = ref({
        url: urlShare,
        quote: 'Quote',
        hashtag: '#Facebook',
    })

    const shareLineOptions = computed(() => {
        return {
            url: urlShare,
            text: form.value.title,
        }
    })
    const onClose = () => {}
    const onOpen = () => {}
    const onBlock = () => {}
    const onFocus = () => {}
</script>

<style lang="scss" scoped>
</style>