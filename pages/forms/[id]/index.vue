<template>
    <div>
        <PartialsTitle prefix="ระบบ" title="แบบสอบถาม" icon="i-mdi-vote" back/>

        <UForm :state="submitData.submit" class="px-8 mt-4" @submit="confirm = true" v-if="submitData.submit">
            <div class="mb-4">
                <div class="text-center bg-[#FFA133] rounded-t-lg py-4"></div>
                <div class="p-4 bg-white">
                    <h2 class="text-xl font-bold">{{ submitData.submit.survey_name }}</h2>
                    <p class="code-description el-tiptap-editor__content" v-dompurify-html="submitData.submit.description"></p>
                </div>
            </div>
            <ViewForm :form="submitData" v-if="submitData?.submit?.survey_type" :submitId="submitData?.submit?.submit_id" @setAnswer="submitAnswer" :preview="submitStatus"/>
            <div class="mb-4">
                <div class="text-center bg-[#FFA133] rounded-t-lg py-4"></div>
                <div class="p-4 bg-white">
                    <div class="text-lg font-bold mb-2">ข้อเสนอแนะ</div>
                    <UTextarea v-model="submitData.submit.comment" placeholder="กรอกข้อเสนอแนะ" color="gray" :rows="5" size="xl" :disabled="submitStatus"/>
                </div>
            </div>
            <div class="text-center" v-if="!submitStatus">
                <button class="rounded-lg px-6 py-1.5 bg-[#FFA133]" type="submit">{{ submitData.submit.survey_type === 'ฟอร์มสมัคร' ? 'สมัคร' : 'ส่ง' }}</button>
            </div>
        </UForm>

        

        <ModalSuccess v-model="confirm" title="แจ้งเตือน" close>
            <div class="text-2xl text-center font-bold pb-4">{{  submitData.submit.survey_type === 'ฟอร์มสมัคร' ? 'ยืนยันการสมัคร' : 'ยืนยันการตอบแบบฟอร์มใช่หรือไม่' }}</div>
            <div class="flex justify-end space-x-3">
                <button type="button" class="px-4 py-2 bg-green-600 text-base rounded-[5px] text-white" @click="submit">ยืนยัน</button>
                <button type="button" class="px-4 py-2 bg-gray-500 text-base rounded-[5px] text-white" @click="confirm = false">ทำรายการต่อ</button>
            </div>
        </ModalSuccess>

        <ModalSuccess v-model="success" title="แจ้งเตือน">
            <div class="text-2xl text-center font-bold pb-2">{{  submitData.submit.survey_type === 'ฟอร์มสมัคร' ? 'สมัครแบบฟอร์มสำเร็จ' : 'ตอบแบบฟอร์มสำเร็จ' }}</div>
            <div class="flex justify-center space-x-3">
                <button type="button" class="px-4 py-2 bg-green-600 text-base rounded-[5px] text-white" @click="success = false">ตกลง</button>
            </div>
        </ModalSuccess>
        
    </div>
</template>

<script setup>
  
    const { username } = useAuthStore();

 
    const route = useRoute()

    const confirm = ref(false)
    const success = ref(false)


    const { data: submitData, refresh } = await useAsyncData('submitData', async () => await useApi(`/api/servey/Submit/Save`, 'POST', {
        survey_id:  route.params.id,//แบบแบบสอบถาม
        username:   username,
        full_name: "", 
        created_by: username,
        modified_by: username
    }))

    const submitStatus = computed(() => submitData.value.submit.status === 'เสร็จสมบูรณ์')

    const title = computed(() => submitData.value.submit.survey_name )
    const description = computed(() => submitData.value.submit.description.replace(/<\/?[^>]+(>|$)/g, "") )
    const image = computed(() => submitData.value.submit.photo_cover_url ? submitData.value.submit.photo_cover_url : `/images/no-cover.jpg` )

    useHead({
        title: title,
        meta: [
            { name: 'description', content: description },
            { property: 'og:image', content: image },
            { property: 'og:description', content: description },
        ]
    })

    definePageMeta({
        key: route => route.fullPath,
        middleware: [
            'auth'
        ]
    })

    const submitAnswer = async (data) => {
        const res = await useApi(`/api/servey/Submit/SetAnswer`, 'POST', data);
        
        if(res.result === 'ok') {
            console.log('set answer');
        }
    }

    const submit = async () => {
        const res = await useApi(`/api/servey/Submit/SubmitTest`, 'POST', {
            SubmitID: submitData.value.submit.submit_id,//ปล่อยว่างคือเพิ่ม ระบุค่าคือแก้ไข
            Comment: submitData.value.submit.comment
       });

        if(res.result === 'ok') {
            console.log('test');
            refresh()

            confirm.value = false
            success.value = true
        }
    }
    const onClose = () => {}
    const onOpen = () => {}
    const onBlock = () => {}
    const onFocus = () => {}
</script>

<style lang="scss" scoped>

</style>