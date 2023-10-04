<template>
    <PartialsTitle prefix="ระบบ" title="แบบสอบถาม" icon="i-mdi-file-document-plus" back/>

    <div class="px-8 mt-4">
        <h3 class="text-xl md:text-2xl font-bold mb-4 flex items-center space-x-2">
            <div>สร้าง<span class="color-primary">แบบสอบถาม</span></div> 
            <Icon name="i-mdi-pencil" size="25" color="black" />
        </h3>

        <UForm :state="form">
            <div class="px-6 py-4 bg-white rounded-lg mb-4">
                <div class="font-bold text-xl mb-2">แบบสอบถาม</div>
                <UFormGroup label="ชื่อแบบสอบถาม" name="title" size="xl" class="mb-2">
                    <UInput placeholder="กรอกชื่อแบบสอบถาม" size="md" />
                </UFormGroup>
                <UFormGroup label="รายละเอียด" name="description" size="xl" class="mb-2">
                    <UTextarea :rows="5"/>
                </UFormGroup>
            </div>


            <draggable class="dragArea list-group w-full mb-4" item-key="position" v-model="form.quitions" v-bind="dragOptions" :move="draggableMove"  @start="drag = true"
        @end="dragEnd" handle=".list-group-item-drag">
                <transition-group type="transition" name="flip-list" :name="!drag ? 'flip-list' : null">
                    <div
                        class="list-group-item rounded-md mb-2 bg- relative"
                        v-for="(quition, index) in form.quitions" :key="quition.position"
                    >
                        <div class="list-group-item-drag text-center bg-[#FFA133] rounded-t-lg cursor-move">
                            <button><Icon name="i-uil-draggabledots" /></button>
                        </div>
                        <div class="p-4 bg-white">
                            <div class="flex flex-wrap space-x-4">
                                <div class="basis-1/2-gap-4">
                                    <UInput v-model="quition.title" placeholder="คำถาม" size="md" />
                                </div>
                                <div class="basis-1/2-gap-4">
                                    <USelect size="md" :options="types" placeholder="ประเภทคำถาม" option-attribute="name" />
                                </div>
                            </div>
                        </div>
                        <div class="text-right">
                            <button @click="deleteQuition(index)"  v-if="form.quitions.length > 1"><Icon name="i-mdi-close" /></button>
                        </div>
                    </div>
                </transition-group>
            </draggable>
            <div class="flex justify-end mb-4">
                <div class="border border-gray-400 rounded-lg bg-white flex px-2">
                    <UTooltip text="เพิ่มคำถามทั่วไป">
                        <button @click="addQuition" class="text-gray-600 flex items-center space-x-2 px-1">
                            <Icon name="i-mdi-plus-circle-outline" size="35" />
                        </button>
                    </UTooltip>
                    <UTooltip text="เพิ่มข้อความ">
                        <button @click="addChoice" class="text-gray-600 flex items-center space-x-2 px-1">
                            <Icon name="i-ic-twotone-text-fields" size="35" />
                        </button>
                    </UTooltip>
                    <UTooltip text="เพิ่มรูปภาพ">
                        <button @click="addChoice" class="text-gray-600 flex items-center space-x-2 px-1">
                            <Icon name="i-ic-round-image" size="35" />
                        </button>
                    </UTooltip>
                </div>
            </div>

            <FormSetting />

            <div class="text-right mt-4">
                <button class="rounded-lg px-6 py-1.5 bg-[#FFA133]" @click="submit">สร้าง</button>
                <NuxtLink to="/" class="ml-4 rounded-lg px-6 py-1.5 border border-gray-400">ยกเลิก</NuxtLink>
            </div>
        </UForm>
    </div>
</template>

<script setup>

    const types = [ {
        name: 'ตัวเลือกเดียว',
        value: 'radio',
    }, {
        name: 'หลายตัวเลือก',
        value: 'checkbox'
    }]

    const form = ref({
        title: '',
        description: '',
        quitions: [
            {
                quition: '',
                type: 'radio',
                position: 1
            },
        ]
    })

    const newPosition = computed(() => {
        return form.value.quitions.map((quition, type, index) => {
            return { quition, type, position: index + 1 };
        })

    })

   
    const drag = ref(false)

    const dragOptions = computed(() => {
      return {
        animation: 1,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      }
    })

    const dragEnd = (e) => {
        drag.value = false

        console.log(newPosition.value);
    }

    const draggableMove = (e) => {

    }

    const addQuition = () => {
        form.value.quitions.push({
            quition: '',
            type: 'radio',
            position: (form.value.quitions.length + 1)
        })
    }
    const deleteQuition = (index) => {
        form.value.quitions.splice(index, 1)
    }

    const submit = () => {
        navigateTo('/')
    }
</script>

<style lang="scss" scoped>
    .flip-list-move {
        transition: transform 0.5s;
    }
    .no-move {
        transition: transform 0s;
    }
    .ghost {
        opacity: 0.5;
        padding: .5rem 0;
        background: #c8ebfb;
    }
</style>