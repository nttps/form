<template>

    <UForm 
        :state="props.vote" 
        :schema="schema" 
        @submit="emit('submit')"
    >
        <UTabs :items="tabs" class="w-full">
            <template #form="{ item }">
                <div class="px-6 py-4 bg-white rounded-lg mb-4">
                    <div class="font-bold text-xl mb-2">{{ item.label }}</div>
                    <div class="md:flex md:space-x-4">
                        <div class="md:w-1/5">
                            <FormSetting :form="props.vote" />
                        </div>
                        <div class="md:w-4/5">
                            <UFormGroup label="หัวข้อการโหวต" name="survey_name" size="xl" class="mb-2" required>
                                <UInput v-model="props.vote.survey_name" placeholder="กรอกหัวข้อ" size="md" />
                            </UFormGroup>
                            <UFormGroup label="รายละเอียด" name="description" size="xl" class="mb-2">
                                <ClientOnly>
                                    <Editor v-model="props.vote.description" height="300px" />
                                </ClientOnly>
                            </UFormGroup>
                            <UFormGroup label="ประเภทตัวเลือก" name="description" size="xl" class="mb-3">
                                <USelect size="md" :options="types"  v-model="props.vote.answer_type" option-attribute="name" />
                            </UFormGroup>
                            <UFormGroup label="ตัวเลือก" name="choices" size="xl" class="mb-3">
                                <draggable class="dragArea list-group w-full" v-model="props.vote.choices" v-bind="dragOptions" 
                                    @start="drag = true"
                                    @end="drag = false"  
                                    @move="draggableMove" 
                                    handle=".list-group-item-drag"
                                >
                                    <transition-group type="transition" :name="drag ? 'drag-list' : null">
                                        <div
                                            class="list-group-item rounded-md mb-2 relative"
                                            v-for="(choice, index) in vote.choices" :key="index"
                                        >
                                            <div class="flex items-center space-x-2">
                                                <div class="min-w-max px-1 list-group-item-drag">
                                                    <button type="button" class=" cursor-move"><Icon name="i-uil-draggabledots" /></button>
                                                </div>
                                                <div class="flex-1">
                                                    <UInput v-model="choice.quiz_desc" size="md" />
                                                </div>
                                                <div class="min-w-max px-1">
                                                    <button type="button"><Icon name="i-mdi-file-image-box" size="25" /></button>
                                                </div>
                                                <div class="min-w-max px-1" v-if="vote.choices.length > 1">
                                                    <button type="button" @click="deleteChoice(index)"><Icon name="i-mdi-close" /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </transition-group>
                                </draggable>
                            </UFormGroup>
                            <div class="flex space-x-2">
                                <button @click="addChoice" type="button" class="text-gray-600 flex items-center space-x-2 px-1">
                                    <Icon name="i-mdi-plus-circle-outline" size="20" />
                                    <span>เพิ่มตัวเลือก</span>
                                </button>
                            </div>
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
            <button class="rounded-lg px-6 py-1.5 bg-[#FFA133]" type="submit">สร้าง</button>
            <NuxtLink to="/" class="ml-4 rounded-lg px-6 py-1.5 border border-gray-400">ยกเลิก</NuxtLink>
        </div>
    </UForm>
</template>

<script setup>
    import moment from 'moment';
    import { object, string, date } from 'yup'

    const props = defineProps(['vote'])

    const emit = defineEmits(['submit'])
    const dateNow = moment().format('YYYY-MM-DDT00:00:00')

    const schema = object({
        survey_name: string().required('กรอกหัวข้อการโหวต'),
        survey_date_from: date().min(dateNow, 'เลือกวันที่ปัจจุบัน').required('กรุณาเลือกวันที่'),
        survey_date_to: date().min(dateNow, 'เลือกวันที่ปัจจุบัน').required('กรุณาเลือกวันที่')
    })

    const types = [{
        name: 'โหวตได้ข้อเดียว',
        value: 'ตัวเลือกได้ข้อเดียว',
    }, {
        name: 'โหวตได้หลายข้อ',
        value: 'เลือกได้หลายข้อ'
    }]

    
    const tabs = [{
        slot: 'form',
        label: 'แบบฟอร์มการโหวต',
    }, {
        slot: 'settings',
        label: 'การเข้าถึง',
    }]

    
    const drag = ref(false)
    const dragOptions = computed(() => {
      return {
        animation: 1,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      }
    })

    const draggableMove = (e) => {
        console.log(e);
    }

    
    const addChoice = () => {

        console.log(props.vote);
        props.vote.choices.push({
            quiz_desc: 'ตัวเลือกที่ ' + (props.vote.choices.length + 1),
            quiz_sort: 0,
            answer_type: 'ตัวเลือกได้ข้อเดียว',
        })
    }
    const deleteChoice = (index) => {
        props.vote.choices.splice(index, 1)
    }
</script>

<style lang="scss" scoped>

</style>