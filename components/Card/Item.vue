<template>
    <div class="rounded-lg bg-white pb-4 transition-all delay-75 border-2 border-transparent hover:border-black overflow-hidden flex flex-col justify-between relative group">
        <div class="absolute right-4 py-1 rounded-full select-none px-3 text-sm bg-blue-500 text-white top-4 z-10">{{ props.item.survey_type }}</div>
        <div class="h-[200px]">
            <img v-if="props.item.photo_cover" :src="props.item.photo_cover_url" class="w-full h-[200px] object-cover group-hover:scale-90 transition-all" :alt="props.item.survey_name">
            <img v-else src="~assets/images/no-cover.jpg" class="w-full h-[200px] object-cover group-hover:scale-90 transition-all" :alt="props.item.survey_name">
        </div>
        <div class="px-4 pt-2">
            <h2 class="text-xl font-bold">{{ props.item.survey_name  }}</h2>
            <div class="line-clamp-2">{{ props.item.description ? props.item.description.replace(/<\/?[^>]+(>|$)/g, "") : `&nbsp;` }}</div>
        </div>
        <div class="flex items-center justify-between px-4 pt-2">
            <div>
                <UBadge :label="props.item.created_by_fullname" color="emerald" />
            </div>
            <div>
                <UButton label="แบ่งปัน" color="blue" :ui="{ rounded: 'rounded-full' }" size="xl" @click="emit('share')"/>
                <NuxtLink :to="`/forms/${props.item.survey_id}/public`" class="ml-2 bg-[#FFA800] transition-all px-5 py-1.5 rounded-full border hover:border border-[#FFA800] hover:bg-white hover:text-[#FFA800]">เข้าร่วม</NuxtLink>
            </div>
        </div>
    </div>

    
</template>

<script setup>
    const props = defineProps(['item'])

    const emit = defineEmits(['share'])
    

</script>

<style lang="scss" scoped>
   
</style>