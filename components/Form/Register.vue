<template>
    <UForm 
        :state="props.form" 
        :schema="schema"
        @submit="emit('submit')"
    >
        <UTabs :items="tabs" class="w-full">
            <template #form="{ item }">
                <div class="px-6 py-4 bg-white rounded-lg mb-4">
                    <div class="font-bold text-xl mb-2">{{ item.label }}</div>
                    <div class="md:flex md:space-x-4">
                        <div class="md:w-1/5">
                            <FormSetting :form="props.form" />
                        </div>
                        <div class="md:w-4/5">
                            <UFormGroup label="ชื่อแบบฟอร์มสมัคร" name="survey_name" size="xl" class="mb-2">
                                <UInput v-model="props.form.survey_name" placeholder="กรอกชื่อแบบฟอร์มสมัคร" size="md" />
                            </UFormGroup>
                            <UFormGroup label="รายละเอียด" name="description" size="xl" class="mb-2">
                                <ClientOnly>
                                    <Editor v-model="props.form.description" height="800px" />
                                </ClientOnly>
                            </UFormGroup>
                        </div>
                        
                    </div>
                </div>

                
            </template>

            <template #settings="{ item }">
                <div class="px-6 py-4 bg-white rounded-lg mb-4">
                    <div class="font-bold text-xl mb-2">{{ item.label }}</div>
                    <div class="flex md:space-x-2 flex-wrap">
                        <div class="min-w-max md:w-56">
                            <UFormGroup label="หน่วยงาน" name="title" size="xl" class="mb-2">
                                <USelect size="md" :options="departments" placeholder="เลือกหน่วยงาน" option-attribute="name" />
                            </UFormGroup>
                        </div>
                        <div class="min-w-max md:w-56">
                            <UFormGroup label="ตำแหน่ง" name="title" size="xl" class="mb-2">
                                <USelect size="md" :options="types" placeholder="เลือกตำแหน่ง"  option-attribute="name" />
                            </UFormGroup>
                        </div>
                    </div>
                </div>

            </template>
        </UTabs>

        <div class="text-right mt-4">
            <button class="rounded-lg px-6 py-1.5 bg-[#FFA133]" type="submit">{{ props.form.survey_id ? `แก้ไข` : `สร้าง` }}</button>
            <NuxtLink :to="`${props.form.survey_id ? `/lists` : `/`}`" class="ml-4 rounded-lg px-6 py-1.5 border border-gray-400">ยกเลิก</NuxtLink>
        </div>
    </UForm>
</template>

<script setup>
    import moment from 'moment';
    import { object, string, date } from 'yup'

    const props = defineProps(['form'])

    const emit = defineEmits(['submit'])
    const dateNow = moment().format('YYYY-MM-DDT00:00:00')

    const schema = object({
        survey_name: string().required('กรอกหัวข้อแบบฟอร์มสมัคร'),
        description: string().required('กรอกรายละเอียดแบบฟอร์ม'),
        survey_date_from: date().min(dateNow, 'เลือกวันที่ปัจจุบัน').required('กรุณาเลือกวันที่'),
        survey_date_to: date().min(dateNow, 'เลือกวันที่ปัจจุบัน').required('กรุณาเลือกวันที่')
    })

    const tabs = [{
        slot: 'form',
        label: 'แบบฟอร์มสมัคร',
    }, {
        slot: 'settings',
        label: 'การเข้าถึง',
    }]
</script>

<style lang="scss" scoped>

</style>