<template>
    <div>
        <PartialsTitle prefix="ระบบ" title="แบบสอบถาม" icon="i-mdi-vote" back share @share="shareModal"/>

        <form class="px-8 mt-4" @submit.prevent="submit" v-if="form">
            <div class="mb-4">
                <div class="text-center bg-[#FFA133] rounded-t-lg cursor-move py-4"></div>
                <div class="p-4 bg-white">
                    <h2 class="text-xl font-bold">{{ form.survey_name }}</h2>
                    <p v-dompurify-html="form.description"></p>
                </div>
            </div>
            <ViewForm :form="form" v-if="form?.survey_type && form.survey_type == 'แบบสอบถาม'" />
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
    </div>
</template>

<script setup>
    import { SFacebook, SLine } from 'vue-socials';
    const { copy } = useCopyToClipboard()
    const url = useRequestURL()
    const route = useRoute()

    const share = ref(false)
    const shareUrl= ref()

    const urlShare = url.href
    const form = ref(null)
    

    onMounted(() => {
        fetchData()
    })

    const fetchData = async () => {
        const response = await useApi(`/api/servey/ServeyInfo/GetDocSet?survey_id=${route.params.id}`, 'GET');
        form.value = response.surveyInfo
        form.value.choices = []
        form.value.questions = []

        if(response.surveyInfo.survey_type == "ระบบโหวต") {
            form.value.choices = response.quizSetList[0].answers
        }

        if(response.surveyInfo.survey_type == "แบบสอบถาม") {
            form.value.questions = response.quizSetList
        }
    }

    const title = computed(() => form?.value?.survey_name )
    useHead({
        title: title,
        meta: [
            { name: 'description', content: form?.value?.description.replace(/<\/?[^>]+(>|$)/g, "") },
        ]
    })

    definePageMeta({
        key: route => route.fullPath,
    })

    useSeoMeta({
        description: () => form?.value?.description.replace(/<\/?[^>]+(>|$)/g, ""),
        ogDescription: () => form?.value?.description.replace(/<\/?[^>]+(>|$)/g, ""),
        ogImage: () => 'https://example.com/image.png',
        ogImageUrl: () => 'https://example.com/image.png',
        twitterCard: () => 'summary_large_image',
        twitterTitle: () => title.value,
        twitterDescription: () => form?.value?.description.replace(/<\/?[^>]+(>|$)/g, ""),
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
            text: form.value.survey_name,
        }
    })
    const onClose = () => {}
    const onOpen = () => {}
    const onBlock = () => {}
    const onFocus = () => {}
</script>

<style lang="scss" scoped>
</style>