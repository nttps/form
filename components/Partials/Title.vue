<template>
    <div class="md:flex justify-between items-center">
        <div class="flex items-center space-x-8">
            <div class="text-2xl md:text-4xl bg-white py-4 pl-6 pr-3 font-bold rounded-tr-lg rounded-br-lg flex items-center space-x-2">
                <div>{{ props.prefix ?? `ระบบ` }}<span class="color-primary">{{ props.title }}</span></div> <Icon v-if="props.icon" :name="props.icon" />
            </div>
            <NuxtLink target="_blank" :to="props.export" v-if="props.export" class="text-xl font-bold rounded-lg px-4 py-2 bg-[#FFA133] flex space-x-2 items-center">
                <span>Export</span>
                <Icon name="i-uil-file-export" size="25" />
            </NuxtLink>
            <button v-if="props.share == ''" @click="emit('share')" class="text-xl font-bold rounded-lg px-4 py-2 bg-[#FFA133]">
                แบ่งปัน
            </button>
        </div>
        <div class="mt-4 md:mr-8 mx-auto">
            <ul class="font-bold text-xl flex space-x-4 place-content-center">
                <li>
                    <NuxtLink :to="`${props.back ? props.back : `/`}`" class="ml-8 md:ml-0" v-if="props.back !== undefined"><Icon name="i-mdi-arrow-left-circle" class="text-[#FFA133]" size="40" /></NuxtLink>
                </li>
                <li class="bg-white py-1 px-4 rounded-full shadow-primary" v-if="props.back === undefined && props.create !== undefined">
                    <NuxtLink to="/lists">รายการของฉัน</NuxtLink>
                </li>
                <li class="bg-white py-1 px-4 rounded-full shadow-primary" v-if="props.create !== undefined" >
                    <FormCreate />
                </li>
            </ul>
        </div>
    </div>
    
</template>

<script setup>
    const props = defineProps(['title', 'icon', 'back', 'prefix', 'export', 'share', 'create'])
    const emit = defineEmits(['share'])
    

</script>

<style lang="scss" scoped>

</style>