<template>
    <div class="bg-gradient-to-t from-white to-[#ffc760] py-4 warpper min-h-screen">
        <div class="max-w-screen-lg mx-auto h-full">
            <PartialsTitle prefix="ระบบ" v-if="submitData.submit" :title="submitData.submit.survey_type" color="white" icon="i-mdi-vote" share @share="shareModal"/>
            <UForm :state="submitData.submit" :schema="schema" class="mt-4" @submit="confirm = true" v-if="submitData.submit">
                <div class="mb-4">
                    <div class="text-center bg-white rounded py-4 text-2xl font-bold text-amber-500">{{ submitData.submit.survey_name }}</div>
                    <div class="p-4 pt-0 bg-white" v-if="submitData.submit.description">
                        <p class="code-description el-tiptap-editor__content" v-dompurify-html="submitData.submit.description"></p>
                    </div>
                </div>
                <ViewForm :form="submitData" v-if="submitData?.submit?.survey_type" :submitId="submitData?.submit?.submit_id" @setAnswer="submitAnswer" :preview="submitStatus"/>
                <div class="mb-4">
                    <div class="text-center bg-[#ff8c09] rounded-t-lg py-2"></div>
                    <div class="p-4 bg-white border-l border-r border-b border-[#ffc583]">
                        <div class="grid grid-cols-1 xl:grid-cols-3 xl:gap-4">
                            <div>
                                <div class="text-lg font-bold mb-2 mt-2">คำนำหน้าชื่อ</div>
                                <USelect :options="['นาย', 'นาง', 'นางสาว']"  v-model="submitData.submit.title" placeholder="คำนำหน้าชื่อ" required :disabled="submitStatus"/>
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
                                <div class="text-lg font-bold mb-2 mt-2">เบอร์โทรศัพท์</div>
                                <UInput v-model="submitData.submit.phone" placeholder="กรอกเบอร์โทรศัพท์" v-maska data-maska="###-###-####" required :disabled="submitStatus" />
                            </div>
                        
                            <div>
                                <div class="text-lg font-bold mb-2 mt-2">อีเมล์</div>
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
                <div class="flex items-center w-full">
                    <div class="w-full lg:w-1/3"> <img v-if="imgQRCode" :src="imgQRCode" class="image-render-pixel h-[200px] mx-auto" /></div>
                    <div class="w-full lg:w-2/3">
                        <div class="text-lg max-w-max">ลิงก์</div>
                        <input class="form-input relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3 py-2 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400" type="text" readonly  ref="shareButton" @click="$event.target.select()" :value="urlShare" />
                           
                        <div class="mt-4">
                            <UButton variant="outline" label="คัดลอกลิงก์" size="xl" @click="copyToClipboard" />
                            <UButton variant="solid" color="sky" class="ml-4" label="ดาวน์โหลด QRCODE" size="xl" @click="downloadQRCode" />
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
                        
                    </div>
                </div>
            </UCard>
            
        </UModal>

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

        <ModalSuccess v-model="completeForm" title="แจ้งเตือน">
            <div class="text-2xl text-center font-bold pb-2">กรอกข้อมูลเสร็จสิ้น</div>
            <div class="flex justify-center space-x-3">
                <button type="button" class="px-4 py-2 bg-green-600 text-base rounded-[5px] text-white" @click="completeForm = false">ตกลง</button>
            </div>
        </ModalSuccess>
        
    </div>
</template>

<script setup>
    import moment from 'moment';
    import { v4 as uuidv4 } from 'uuid';
    import { generate } from "lean-qr";
    import { object, string } from 'yup'
    moment.locale('th')
    import { SFacebook, SLine } from 'vue-socials';
    const { copy } = useCopyToClipboard()
    const url = useRequestURL()
    const route = useRoute()

    const { username, fullName, firstName, lastName, setGuest, machineId } = useAuthStore();

    setGuest(uuidv4())

    const listAddress = ref([])
    const textSearchAddress = ref('')
    const showInputAddress = ref(false)
    const completeForm = ref(false)

    const schema = object({
        email: string().when('survey_type', {
            is: (survey_type) =>  survey_type === 'ฟอร์มสมัคร',
            then: (schema) => schema.email('คุณใส่รูปแบบอีเมล์ผิด').required('กรอกอีเมล์ของคุณ'),
        }),
    })

    const share = ref(false)
    const shareUrl= ref()

    const urlShare = url.href 
    const confirm = ref(false)
    const success = ref(false)


    const stateGuest = ref(machineId)

    const { data: submitData } = await useAsyncData('submitData', async () => await useApi(`/api/servey/Submit/Save`, 'POST', {
        survey_id:  route.params.id,//แบบแบบสอบถาม
        username:   username || machineId || stateGuest.value,
        full_name: fullName || '', 
        created_by: "",
        modified_by: ""
    }))


    submitData.value.submit.firstname = firstName
    submitData.value.submit.lastname = lastName

    const submitStatus = computed(() => submitData.value.submit.status === 'เสร็จสมบูรณ์')

    const title = computed(() => submitData.value.submit.survey_name )
    const description = computed(() => submitData.value.submit.description.replace(/<\/?[^>]+(>|$)/g, "") )
    const image = computed(() => submitData.value.submit.photo_cover_url ? submitData.value.submit.photo_cover_url : `~/images/no-cover.jpg` )

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
        layout: 'guest',
        middleware: ['auth-redirect']
    })

    const blackRGBA  = [0, 0, 0, 255];
    const whiteRGBA = [255, 255, 255, 255];
    const qrConfig = {
        on: blackRGBA,
        off: whiteRGBA,
    };

    const qrcode = generate(urlShare);
    const canvas = ref();
    const filename = ref("");
    const size = ref(300);
    const imgQRCode = ref()
    async function genQRCode() {
        size.value = Math.min(Math.max(size.value, 32), 2000);

        const canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d"),
            imgData = qrcode.toImageData(ctx, qrConfig);

        canvas.width = canvas.height = size.value;
        ctx.putImageData(imgData, 0, 0);
        ctx.imageSmoothingEnabled = false;
        ctx.globalCompositeOperation = "copy";

        ctx.drawImage(
            canvas,
            0,
            0,
            imgData.width,
            imgData.height,
            0,
            0,
            canvas.width,
            canvas.height
        );

        imgQRCode.value = canvas.toDataURL("image/png", 1)

    }

    async function downloadQRCode() {
        const link = document.createElement("a");
        link.download = filename.value || "qrcode.png";
        link.href = imgQRCode.value;
        link.click();
    }


    const shareModal = () => {
        share.value = true
        genQRCode()
    }

    const copyToClipboard = () => {

        shareUrl.value.click()
        copy(urlShare, { title: 'คัดลอกลิงก์สำเร็จ', closeButton : false, timeout: 2000})
    }

    const shareFBOptions = ref({
        url: urlShare,
        quote: 'Quote',
        hashtag: '#DDPM',
    })

    const shareLineOptions = computed(() => {
        return {
            url: urlShare,
            text: submitData.value.submit.survey_name,
        }
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


            completeForm.value = true

            const data = await useApi(`/api/servey/Submit/Save`, 'POST', {
                survey_id:  route.params.id,//แบบแบบสอบถาม
                username:   username || `${stateGuest.value}`,
                full_name: fullName || '', 
                created_by: "",
                modified_by: ""
            })

            submitData.value = data
            //navigateTo(`/`)
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
        min-height: 100vh;
    }
</style>