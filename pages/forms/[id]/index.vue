<template>
    <div>
        <PartialsTitle prefix="" v-if="submitData.submit" :title="submitData.submit.survey_type" icon="i-mdi-vote" back/>

        <UForm :state="submitData.submit" class="px-8 mt-4" @submit="confirm = true" v-if="submitData.submit">
            <div class="mb-4">
                <div class="text-center bg-[#FFA133] rounded-t-lg py-4"></div>
                <div class="p-4 bg-white">
                    <h2 class="text-xl font-bold">{{ submitData.submit.survey_name }}</h2>
                    <p class="code-description el-tiptap-editor__content" v-dompurify-html="submitData.submit.description"></p>
                </div>
            </div>
            <ViewForm :form="submitData" v-if="submitData.submit" :submitId="submitData?.submit?.submit_id" @setAnswer="submitAnswer" @setImage="submitImage" :preview="submitStatus"/>
            <div class="mb-4">
                <div class="text-center bg-[#FFA133] rounded-t-lg py-4"></div>
                <div class="p-4 bg-white">
                    <div class="grid grid-cols-1 xl:grid-cols-3 xl:gap-4" v-if="submitData.submit.survey_type === 'ฟอร์มสมัคร'">
                        <div>
                            <div class="text-lg font-bold mb-2 mt-2">คำนำหน้าชื่อ</div>
                            <USelect :options="['นาย', 'นาง', 'นางสาว']"  v-model="submitData.submit.title" placeholder="คำนำหน้าชื่อ" :disabled="submitStatus"/>
                        </div>
                         <div>
                            <div class="text-lg font-bold mb-2 mt-2">ชื่อ</div>
                            <UInput v-model="submitData.submit.firstname" placeholder="กรอกชื่อ" required :disabled="submitStatus" />
                        </div>
                        <div>
                            <div class="text-lg font-bold mb-2 mt-2">นามสกุล</div>
                            <UInput v-model="submitData.submit.lastname" placeholder="กรอกนามสกุล" required :disabled="submitStatus" />
                        </div>
                        <div>
                            <div class="text-lg font-bold mb-2">เบอร์โทรศัพท์</div>
                            <UInput v-model="submitData.submit.phone" placeholder="กรอกเบอร์โทรศัพท์" required :disabled="submitStatus" />
                        </div>
                        <div>
                            <div class="text-lg font-bold mb-2">บัตรประชาชน</div>
                             <UInput v-model="submitData.submit.people_id" placeholder="กรอกบัตรประชาชน" required :disabled="submitStatus" />
                        </div>
                        <div>
                            <div class="text-lg font-bold mb-2">อีเมล์</div>
                            <UInput v-model="submitData.submit.email" placeholder="กรอกอีเมล์" required :disabled="submitStatus" />
                        </div>
                    </div>
                    <div v-if="submitData.submit.survey_type === 'ฟอร์มสมัคร'">
                        <div class="text-lg font-bold mb-2 mt-2">ที่อยู่</div>
                        <div class="grid grid-cols-3 gap-4">
                            <UInput v-model="submitData.submit.house_no" placeholder="เลขที่" required :disabled="submitStatus" />
                            <UInput v-model="submitData.submit.moo_no" placeholder="หมู่ที่" required :disabled="submitStatus" />
                            <UInput v-model="submitData.submit.soi" placeholder="ดรอก/ซอย" required :disabled="submitStatus" />
                            <UInput v-model="submitData.submit.road" placeholder="ถนน" required :disabled="submitStatus" />
                            <UInput v-model="submitData.submit.t_name" placeholder="ตำบล / แขวง" required :disabled="submitStatus" />
                            <UInput v-model="submitData.submit.a_name" placeholder="อำเภอ / เขต" required :disabled="submitStatus" />
                            <UInput v-model="submitData.submit.p_name" placeholder="จังหวัด" required :disabled="submitStatus" />
                            <UInput v-model="submitData.submit.post_code" placeholder="รหัสไปรษณีย์" required :disabled="submitStatus" />
                        </div>
                    </div>
                    <div class="text-lg font-bold mb-2 mt-4">ข้อเสนอแนะ <span class="text-red-600"> (*ไม่จำเป็นต้องกรอก)</span></div>
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
    import moment from 'moment';
    moment.locale('th')
    const { username, fullName, firstName, lastName } = useAuthStore();

    const route = useRoute()

    const confirm = ref(false)
    const success = ref(false)

    const submitData = ref({
        submit: null
    })

    const submitStatus = ref(false)
    
    onMounted(async () => {

         const responed = await useApi(`/api/servey/Submit/Save`, 'POST', {
            survey_id:  route.params.id,//แบบแบบสอบถาม
            username:   username,
            full_name: fullName, 
            created_by: username,
            modified_by: username
        })
        submitData.value = responed

        submitData.value.submit.firstname = firstName
        submitData.value.submit.lastname = lastName

        submitStatus.value = submitData.value.submit.status === 'เสร็จสมบูรณ์'
    })
    
   

    useHead({
        title: submitData.value?.submit?.survey_name,
    })

    definePageMeta({
        key: route => route.fullPath,
        middleware: [
            'auth'
        ]
    })

    const submitImage = async (data) => {
    
        const res = await uploadAnsImage(submitData.value.submit.submit_id, data.quizId, data.file)

        if(res.result === 'ok') {
            console.log('set answer image');
        }
    }

    const submitAnswer = async (data) => {
        const res = await useApi(`/api/servey/Submit/SetAnswer`, 'POST', data);
        
        if(res.result === 'ok') {
            console.log('set answer');
        }
    }

    const submit = async () => {
        const res = await useApi(`/api/servey/Submit/SubmitTest`, 'POST', {
            SubmitID: submitData.value.submit.submit_id,//ปล่อยว่างคือเพิ่ม ระบุค่าคือแก้ไข
            Comment: submitData.value.submit.comment,
            Fullname: submitData.value.submit.firstname + ' ' + submitData.value.submit.lastname,
            title: submitData.value.submit.title,
            firstname: submitData.value.submit.firstname,
            lastname: submitData.value.submit.lastname,
            phone: submitData.value.submit.phone,
            people_id: submitData.value.submit.people_id,
            email: submitData.value.submit.email,
            house_no: submitData.value.submit.house_no,
            moo_no: submitData.value.submit.moo_no,
            soi: submitData.value.submit.soi,
            road: submitData.value.submit.road,
            t_name: submitData.value.submit.t_name,
            a_name: submitData.value.submit.a_name,
            p_name: submitData.value.submit.p_name,
            post_code: submitData.value.submit.post_code,
       });

        if(res.result === 'ok') {
           
            confirm.value = false
            success.value = true

            navigateTo(`/`)
        }
    }
    const onClose = () => {}
    const onOpen = () => {}
    const onBlock = () => {}
    const onFocus = () => {}
</script>

<style lang="scss" scoped>

</style>