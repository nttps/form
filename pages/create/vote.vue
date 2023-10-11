<template>
    <PartialsTitle prefix="ระบบ" title="โหวต" icon="i-mdi-vote" back/>

    <div class="px-8 mt-4">
        <h3 class="text-xl md:text-2xl font-bold mb-4 flex items-center space-x-2">
            <div>สร้าง<span class="color-primary">โหวต</span></div> 
            <Icon name="i-mdi-pencil" size="25" color="black" />
        </h3>

        <UForm :state="vote">
            <div class="px-6 py-4 bg-white rounded-lg mb-4">
                <div class="font-bold text-xl mb-2">การโหวต</div>
                <UFormGroup label="หัวข้อการโหวต" name="title" size="xl" class="mb-2">
                    <UInput placeholder="กรอกหัวข้อ" size="md" />
                </UFormGroup>
                <UFormGroup label="รายละเอียด" name="description" size="xl" class="mb-2">
                    <UTextarea :rows="5"/>
                </UFormGroup>
                <UFormGroup label="ประเภทตัวเลือก" name="description" size="xl" class="mb-3">
                    <USelect size="md" :options="types"  option-attribute="name" />
                </UFormGroup>
                <draggable class="dragArea list-group w-full" v-model="vote.choices" v-bind="dragOptions" 
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
                                    <button class=" cursor-move"><Icon name="i-uil-draggabledots" /></button>
                                </div>
                                <div class="flex-1">
                                    <UInput v-model="choice.value" />
                                </div>
                                <div class="min-w-max px-1">
                                    <button><Icon name="i-mdi-file-image-box" size="25" /></button>
                                </div>
                                <div class="min-w-max px-1" v-if="vote.choices.length > 1">
                                    <button @click="deleteChoice(index)"><Icon name="i-mdi-close" /></button>
                                </div>
                            </div>
                        </div>
                    </transition-group>
                </draggable>
                <div class="flex space-x-2">
                    <button @click="addChoice" class="text-gray-600 flex items-center space-x-2 px-1">
                        <Icon name="i-mdi-plus-circle-outline" size="20" />
                        <span>เพิ่มตัวเลือก</span>
                    </button>
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

    const drag = ref(false)
    const types = [ {
        name: 'ตัวเลือกเดียว',
        value: 'type',
    }, {
        name: 'หลายตัวเลือก',
        value: 'checkbox'
    },]

    const vote = ref({
        title: '',
        type: 'vote',
        description: '',
        choices: [
            {
                value: 'ตัวเลือกที่ 1'
            },
        ]
    })

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
        vote.value.choices.push({
                value: 'ตัวเลือกที่ ' + (vote.value.choices.length + 1)
        })
    }
    const deleteChoice = (index) => {
        vote.value.choices.splice(index, 1)
    }

    const submit = () => {
        navigateTo('/')
    }
</script>

<style lang="scss" scoped>
    .drag-list-move {
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