<template>
    <div class="rounded-lg bg-white pb-4 transition-all delay-75 border-2 border-transparent hover:border-black overflow-hidden flex flex-col justify-between relative group">
        <div class="absolute right-4 py-1 rounded-full select-none px-3 text-sm bg-blue-500 text-white top-4 z-10">{{ props.item.survey_type }}</div>
        <div class="h-[200px]">
            <img :src="`${props.item.photo_cover ? props.item.photo_cover_url : `/images/no-cover.jpg`}`" class="w-full h-[200px] object-cover group-hover:scale-90 transition-all" :alt="props.item.survey_name">
        </div>
        <div class="px-4 pt-2">
            <h2 class="text-xl font-bold">{{ props.item.survey_name  }}</h2>
            <div>{{ props.item.description ? props.item.description.replace(/<\/?[^>]+(>|$)/g, "") : `&nbsp;` }}</div>
        </div>
        <div class="text-right px-4 pt-2">
            <NuxtLink :to="`/forms/${props.item.survey_id}`" class="bg-[#FFA800] transition-all px-3 py-1 rounded-full hover:border border-[#FFA800] hover:bg-white hover:text-[#FFA800]">เข้าร่วม</NuxtLink>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps(['item'])
</script>

<style lang="scss" scoped>
   
</style>