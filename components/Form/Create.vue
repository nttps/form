<template>
    <button @click="isCreate = true" class="flex items-center space-x-2"> <Icon name="i-mdi-plus-circle-outline" size="30" /> <span>สร้างรายการ</span></button>
    <UModal v-model="isCreate">
        <div class="bg-[#F3F3F3]">
            <div class="px-4 py-1 bg-[#FFA133] text-white text-xl">สร้างรายการ <Icon name="i-mdi-checkbox-marked-circle" /></div>
            <div class="flex flex-wrap items-center justify-center p-4 gap-4">
                <NuxtLink to="/create/vote" class="rounded-3xl basis-1/2-gap-4 h-[200px] bg-white text-center shadow-primary flex justify-center items-center text-3xl font-bold">
                    ระบบโหวต
                </NuxtLink>
                <NuxtLink to="/create/form" class="rounded-3xl basis-1/2-gap-4 h-[200px] bg-white text-center shadow-primary flex justify-center items-center text-3xl font-bold">
                    ระบบแบบสอบถาม
                </NuxtLink>
                <NuxtLink to="/create/register-form" class="rounded-3xl basis-1/2-gap-4 h-[200px] bg-white text-center shadow-primary flex justify-center items-center text-3xl font-bold">
                    ฟอร์มสมัคร
                </NuxtLink>
            </div>
        </div>
    </UModal>
</template>

<script setup>
const isCreate = ref(false)
</script>

<style lang="scss" scoped>

</style>