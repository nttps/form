<template>
    <div class="px-6 py-4 bg-white rounded-lg">
        <div class="font-bold text-xl mb-2">การตั้งค่า</div>

        <div class="md:flex flex-wrap">
            
            <div class="w-1/2">
                <div class="text-lg font-bold">เวลาร่วมโหวต</div>
                <div class="flex flex-wrap">
                    <div class="min-w-max w-1/2">
                        <UFormGroup label="วันที่เริ่มการโหวต" name="title" size="xl" class="mb-2">
                            <UPopover :popper="{ placement: 'bottom-start' }">
                                <UButton icon="i-heroicons-calendar-days-20-solid" class="md:w-4/5" size="md" :label="label" />
                                <template #panel="{ close }">
                                    <FormDatePicker v-model="date" @close="close" />
                                </template>
                            </UPopover>
                        </UFormGroup>
                    </div>
                    <div class="min-w-max w-1/2">
                        <UFormGroup label="วันที่สิ้นสุดการโหวต" name="title" size="xl" class="mb-2">
                            <UPopover :popper="{ placement: 'bottom-start' }">
                                <UButton icon="i-heroicons-calendar-days-20-solid" class="md:w-4/5" size="md" :label="label" />
                                <template #panel="{ close }">
                                    <FormDatePicker v-model="date" @close="close" />
                                </template>
                            </UPopover>
                        </UFormGroup>
                    </div>
                </div>
            </div>
            <div class="w-1/2">
                <div class="text-lg font-bold">ผู้เข้าร่วมโหวต</div>
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
        </div>
    </div>
</template>

<script setup>

const date = ref(new Date())
const label = computed(() => date.value.toLocaleDateString('th', { year: 'numeric', month: 'long', day: 'numeric' }) + ' เวลา ' + date.value.toLocaleTimeString('th', { hour: "2-digit", minute: "2-digit" }))


 const departments = [ {
        name: 'กก',
        value: 'กก',
    }, {
        name: 'กจ',
        value: 'กจ'
    },]

    const types = []

</script>

<style lang="scss" scoped>

</style>