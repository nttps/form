<template>
    <div class="bg-gradient-to-t from-white to-[#ffc760] py-4 warpper">
        <div class="max-w-screen-lg mx-auto ">
            <PartialsTitle prefix="" v-if="submitData.submit" :title="submitData.submit.survey_type" color="white" icon="i-mdi-vote" back/>
            <UForm :state="submitData.submit" :schema="schema" class="mt-4" @submit="confirmSubmit" v-if="submitData.submit">
             <div class="mb-4">
                <div class="text-center bg-white rounded py-4 text-2xl font-bold text-amber-500">{{ submitData.submit.survey_name }}</div>
                <div class="p-4 bg-white" v-if="submitData.submit.description">
                    <p class="code-description el-tiptap-editor__content" v-dompurify-html="submitData.submit.description"></p>
                </div>
            </div>
            <ViewForm :form="submitData" v-if="submitData.submit" :submitId="submitData?.submit?.submit_id" @setAnswer="submitAnswer" @setImage="submitImage" :preview="submitStatus"/>

            <div class="mb-4" v-if="submitData.submit.survey_type === 'ฟอร์มสมัคร'">
                <div class="text-center bg-[#ff8c09] rounded-t-lg py-2 "></div>
                <div class="p-4 bg-white border-l border-r border-b border-[#ffc583]">
                    <div v-if="submitStatus" class="text-red-600 font-bold text-lg font">*ไม่สามารถแก้ไขข้อมูลได้ เนื่องจากคุณได้ทำรายการของแบบฟอร์มนี้ไปเรียบร้อยแล้ว</div>
                    <div class="grid grid-cols-1 xl:grid-cols-3 xl:gap-4" >
                        <div>
                            <div class="text-lg font-bold mb-2 mt-2">คำนำหน้าชื่อ</div>
                            <USelect :options="['นาย', 'นาง', 'นางสาว']" required v-model="submitData.submit.title" placeholder="คำนำหน้าชื่อ" :disabled="submitStatus"/>
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
                            <UInput v-model="submitData.submit.phone" placeholder="กรอกเบอร์โทรศัพท์" v-maska data-maska="###-###-####" required :disabled="submitStatus" />
                        </div>
                        <div>
                            <div class="text-lg font-bold mb-2">อีเมล์</div>
                            <UFormGroup name="email" >
                                <UInput v-model="submitData.submit.email" placeholder="กรอกอีเมล์" required :disabled="submitStatus" />
                            </UFormGroup>
                        </div>
                    </div>
                   
                </div>
            </div>
            <div class="text-center" v-if="!submitStatus">
                <button class="rounded-lg px-6 py-1.5 bg-white" type="submit">{{ submitData.submit.survey_type === 'ฟอร์มสมัคร' ? 'ลงทะเบียน' : 'ส่ง' }}</button>
            </div>
        </UForm>


        </div>
    
        

        <ModalSuccess v-model="confirm" title="แจ้งเตือน" close>
            <div class="text-2xl text-center font-bold pb-4">{{  submitData.submit.survey_type === 'ฟอร์มสมัคร' ? 'ยืนยันการสมัคร' : 'ยืนยันการตอบแบบฟอร์มใช่หรือไม่' }}</div>
            <div class="flex justify-end space-x-3">
                <button type="button" class="px-4 py-2 bg-green-600 text-base rounded-[5px] text-white" @click="submit">ยืนยัน</button>
                <button type="button" class="px-4 py-2 bg-gray-500 text-base rounded-[5px] text-white" @click="confirm = false">ทำรายการต่อ</button>
            </div>
        </ModalSuccess>

        <ModalSuccess v-model="alert" title="แจ้งเตือน" close>
            <div class="text-2xl text-center font-bold pb-4 text-red-600">กรุณาตอบให้ครบทุกข้อ</div>
            <div class="flex justify-center space-x-3">
                <button type="button" class="px-4 py-2 bg-gray-500 text-base rounded-[5px] text-white" @click="alert = false">ตกลง</button>
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
    import { object, string } from 'yup'
    moment.locale('th')
    const { username, fullName, firstName, lastName, prefix } = useAuthStore();

    const route = useRoute()

    const confirm = ref(false)
    const success = ref(false)
    const alert = ref(false)
    const listAddress = ref([])
    const textSearchAddress = ref('')
    const showInputAddress = ref(false)

    const submitData = ref({
        submit: null
    })

    
    const schema = object({
        email: string().when('survey_type', {
            is: (survey_type) =>  survey_type === 'ฟอร์มสมัคร',
            then: (schema) => schema.email('คุณใส่รูปแบบอีเมล์ผิด').required('กรอกอีเมล์ของคุณ'),
        }),
        t_name: string().when('survey_type', {
            is: (survey_type) =>  survey_type === 'ฟอร์มสมัคร',
            then: (schema) => schema.required('ค้นหาข้อมูลที่อยู่ของคุณ')
        }),
        a_name: string().when('survey_type', {
            is: (survey_type) =>  survey_type === 'ฟอร์มสมัคร',
            then: (schema) => schema.required('ค้นหาข้อมูลที่อยู่ของคุณ')
        }),
        p_name: string().when('survey_type', {
            is: (survey_type) => survey_type === 'ฟอร์มสมัคร',
            then: (schema) => schema.required('ค้นหาข้อมูลที่อยู่ของคุณ')
        }),
        post_code: string().when('survey_type', {
            is: (survey_type) =>  survey_type === 'ฟอร์มสมัคร',
            then: (schema) => schema.required('ค้นหาข้อมูลที่อยู่ของคุณ')
        })
    })
    const submitStatus = ref(false)
    
    onMounted(async () => {

        fetchData()
    })
    
    const fetchData = async () => {
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
        submitData.value.submit.title = prefix

        submitStatus.value = submitData.value.submit.status === 'เสร็จสมบูรณ์'
    }

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


    const searchAddress = async (e) => {
        const data = await useApi(`/api/share/addr/ListAddress?search=${e.target.value}`, 'GET');
    
        listAddress.value = data
    }

    const selectAddress = (address) => {


        submitData.value.submit.t_name  = address.districT_NAME
        submitData.value.submit.a_name  = address.bordeR_NAME
        submitData.value.submit.p_name  = address.provincE_NAME
        submitData.value.submit.post_code   = address.districT_POSTAL_CODE

        showInputAddress.value = true
        textSearchAddress.value = ''
        listAddress.value = []
    }

    const confirmSubmit = () => {

        const countAs = submitData.value.quizSet.some(q => (q.answers.filter(a => a.is_select).length > 0))

        if(submitData.value.submit.survey_type === 'ฟอร์มสมัคร' || (submitData.value.survey_type !== 'ฟอร์มสมัคร' && countAs)) {
            confirm.value = true
        }else {
            alert.value = true
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
  .warpper {
        background-image: url('~/assets/images/bg.jpg');
        background-position: center;
        background-size: cover;
    }
</style>