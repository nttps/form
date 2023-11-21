<template>
    <div>
        <PartialsTitle title="โหวตและแบบสอบถาม" icon="i-ri-chat-poll-fill" create/>
        <div class="px-8 mt-4">
            <h3 class="text-2xl font-bold mb-4">เข้าร่วมการ<span class="color-primary">โหวตและแบบสอบถาม</span></h3>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10" v-if="!pending && forms">
                <CardItem :item="row" v-for="row in rows" @share="shareModal(`/forms/${row.survey_id}/public`, row.survey_name)"/>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10" v-else>
                <div class="rounded-lg bg-white pb-4" v-for="i in 8">
                    <div class="delay-75 px-4 py-2">
                        <USkeleton class="w-full h-[200px]" />
                    </div>
                    <div class="px-4 pt-2">
                        <USkeleton class="h-6 mb-2" />
                        <USkeleton class="h-4" />
                    </div>
                    <div class="px-4 pt-2">
                        <USkeleton class="ml-auto w-16 h-7 rounded-full" />
                    </div>
                </div>
            </div>

            <div class="text-center text-2xl font-bold py-4" v-if="forms.length == 0">
                ไม่มีรายการ
            </div>

           
            <div class="flex justify-center px-3 pt-3.5">
                <UPagination 
                    v-model="page" 
                    :page-count="pageCount" 
                    :total="forms.length" 
                    v-if="forms.length"
                />
            </div>
        </div>
        <UModal v-model="share">
            <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex justify-between items-center">
                        <div class="text-xl font-bold">แบ่งปันรายการนี้</div>
                        <div>
                            <UButton icon="i-heroicons-x-mark" size="sm" color="gray" square variant="link" @click="share = false" />
                        </div>
                    </div>
                </template>
                <div class="flex items-center space-x-2">
                    <div class="text-lg max-w-max">ลิงก์</div>
                    <input class="form-input relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3 py-2 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400" type="text" readonly  ref="shareButton" @click="$event.target.select()" :value="urlShare" />
                    <UButton variant="outline" label="คัดลอก" size="xl" @click="copyToClipboard" />
                </div>
                <div class="flex items-center mt-4 space-x-2">
                    <div class="text-lg">แชร์</div>
                    <s-facebook
                        :window-features="{ width: 685, height: 600, }"
                        :use-native-behavior="true"
                        :share-options="shareFBOptions"
                    >
                        <Icon name="i-logos-facebook" size="25" />
                    </s-facebook>

                    <s-line
                        :window-features="{ width: 685, height: 600, }"
                        :use-native-behavior="true"
                        :share-options="shareLineOptions"
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
definePageMeta({
  middleware: ["auth"]
})

const { origin } = useRequestURL()

const page = ref(1)
const pageCount = 8

const { data: forms, pending } = await useAsyncData('submitData', async () =>  await useApi('/api/servey/ServeyInfo/ListData', 'POST', {
    SearchText:"",
    Status:"เปิด",
    Type:"",
    User: "",
    start_date: null,
    end_date: null,
    IsAdmin: false,
    IsShowActiveOnly:true//แสดงรายการที่วันที่ยัง active
}))


const rows = computed(() => {
    return forms.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

const { copy } = useCopyToClipboard()

const share = ref(false)
const shareButton= ref()
const urlShare = ref('')
const nameShare = ref('')


const shareModal = (url, name) => {
    share.value = true
    urlShare.value = origin + url
    nameShare.value = name

}

const copyToClipboard = () => {

    shareButton.value.click()
    copy(urlShare.value, { title: 'คัดลอกลิงก์สำเร็จ', closeButton : false, timeout: 2000})
}

const shareFBOptions = computed(() => {
   return {
        url: urlShare.value,
        quote: 'Quote',
        hashtag: '#DDPM',
   }
})

const shareLineOptions = computed(() => {
    return {
        url: urlShare.value,
        text: nameShare.value,
    }
})
</script>

<style lang="scss" scoped>

</style>