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
                                <draggable 
                                    class="dragArea list-group w-full" 
                                    :list="props.vote.choices" 
                                    v-bind="dragOptions" 
                                    group="choices"
                                    item-key="answer_sort" 
                                    :move="draggableMove"
                                    @start="drag = true"
                                    @end="drag = false"  
                                    handle=".list-group-item-drag"
                                >
                                    <transition-group 
                                        type="transition" 
                                        :name="drag ? 'drag-list' : null"
                                    >
                                        <div
                                            class="list-group-item rounded-md mb-2 relative"
                                            v-for="(choice, index) in vote.choices" :key="choice.answer_sort"
                                        >
                                            <div class="flex items-center space-x-2">
                                                <div class="min-w-max px-1 list-group-item-drag">
                                                    <button type="button" class=" cursor-move"><Icon name="i-uil-draggabledots" /></button>
                                                </div>
                                                <div class="flex-1">
                                                    <UInput :id="`answer${index}`" name="answer" v-model="choice.answer" size="md" />
                                                </div>
                                                <div class="min-w-max px-1">
                                                    <label :for="`image_${index}`" class="cursor-pointer">
                                                        <Icon name="i-mdi-file-image-box" size="25" />
                                                        <UInput type="file" :name="`image_${index}`" accept="image/x-png,image/gif,image/jpeg" @change="pickImage($event, index)" :id="`image_${index}`" class="hidden" />
                                                    </label>
                                                   
                                                    <!-- <button type="button" @click="addImageChoice(index)"><Icon name="i-mdi-file-image-box" size="25" /></button> -->
                                                </div>
                                                <div class="min-w-max px-1" v-if="vote.choices.length > 1">
                                                    <button type="button" @click="deleteChoice(index)"><Icon name="i-mdi-close" /></button>
                                                </div>
                                            </div>
                                            <div v-if="choice.answer_img || choice.image_path" class="ml-7 mt-4 relative max-w-max">
                                                <div class="absolute top-1 right-1">
                                                    <UButton type="button" icon="i-heroicons-x-mark" variant="soft" color="red" class="ml-2" @click="choice.answer_img = null; choice.image_path = null" />
                                                </div>
                                                <img :src="choice.answer_img_url" class="h-[200px]">
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

                    <FormPermission :permissions="props.permissions.all" :user-permissions="props.permissions.user"  @fetchData="emit('fetchData')" />

                </div>
            </template>
        </UTabs>

        <div class="text-right mt-4">
            <UButton type="submit" :disabled="props.loadingSubmit" :label="props.vote.survey_id ? `แก้ไข` : `สร้าง`" size="xl" />
            <UButton type="button" color="gray" variant="outline" class="ml-4" label="ยกเลิก" size="xl" @click="navigateTo(`${props.vote.survey_id ? `/lists` : `/`}`)" />
        </div>
    </UForm>

</template>

<script setup>
    import { object, string, date } from 'yup'

    const props = defineProps(['vote', 'loadingSubmit', 'permissions'])

    const emit = defineEmits(['submit', 'fetchData'])

    const schema = object({
        survey_name: string().required('กรอกหัวข้อการโหวต'),
        survey_date_from: date().required('กรุณาเลือกวันที่'),
        survey_date_to: date().min(props.vote.survey_date_from, 'ห้ามต่ำกว่ามันที่เริ่มโหวต').required('กรุณาเลือกวันที่')
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
        disabled: false,
        ghostClass: 'ghost',
      }
    })

    const draggableMove = (e) => {
        console.log(props.vote.choices);
    }

    
    const addChoice = () => {
        props.vote.choices.push({
            answer: 'ตัวเลือกที่ ' + (props.vote.choices.length + 1),
            answer_sort: (props.vote.choices.length + 1),
            answer_type: 'ตัวเลือกได้ข้อเดียว',
        })
    }
    const deleteChoice = (index) => {
        props.vote.choices.splice(index, 1)
    }

    const pickImage = (e, index) => {
        let file = e.target.files

        const choice = props.vote.choices[index]

        choice.image_path = file[0]
        if (file && file[0]) {
          let reader = new FileReader
          reader.onload = e => {
            choice.answer_img_url = e.target.result
          }
          reader.readAsDataURL(file[0])
        }
    }
</script>

<style lang="scss" scoped>
</style>