<template>
    <div class="md:flex justify-between items-center">
        <div class="flex items-center space-x-8">
            <div class="text-2xl md:text-4xl bg-white py-4 pl-6 pr-3 font-bold rounded-tr-lg rounded-br-lg flex items-center space-x-2">
                <div>{{ props.prefix ?? `ระบบ` }}<span class="color-primary">{{ props.title }}</span></div> <Icon v-if="props.icon" :name="props.icon" />
            </div>
            <NuxtLink target="_blank" to="/" v-if="props.export" class="text-xl font-bold rounded-lg px-4 py-2 bg-[#FFA133] flex space-x-2 items-center">
                <span>Export</span>
                <Icon name="i-uil-file-export" size="25" />
            </NuxtLink>
        </div>
        <div class="mt-4 md:mr-8 mx-auto">
            <NuxtLink :to="`${props.back ? props.back : `/`}`" class="ml-8 md:ml-0" v-if="props.back !== undefined"><Icon name="i-mdi-arrow-left-circle" class="text-[#FFA133]" size="40" /></NuxtLink>
            <ul class="font-bold text-xl flex space-x-4 place-content-center" v-else>
                <li class="bg-white py-1 px-4 rounded-full shadow-primary">
                    <NuxtLink to="/lists">รายการของฉัน</NuxtLink>
                </li>
                 <li class="bg-white py-1 px-4 rounded-full shadow-primary">
                    <button @click="isCreate = true" class="flex items-center space-x-2"> <Icon name="i-mdi-plus-circle-outline" size="30" /> <span>สร้างรายการ</span></button>
                </li>
            </ul>
        </div>
    </div>
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
                <NuxtLink to="/create/form-register" class="rounded-3xl basis-1/2-gap-4 h-[200px] bg-white text-center shadow-primary flex justify-center items-center text-3xl font-bold">
                    ฟอร์มสมัคร
                </NuxtLink>
            </div>
        </div>
    </UModal>
</template>

<script setup>
    const props = defineProps(['title', 'icon', 'back', 'prefix', 'export'])
    const isCreate = ref(false)
</script>

<style lang="scss" scoped>

</style>