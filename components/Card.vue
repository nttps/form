<template>
    <div class="rounded-lg bg-white pb-4">
        <div class="h-[200px]">
            <img :src="`/images/items/${props.item.image}`" class="w-full h-full" :alt="props.item.title">
        </div>
        <div class="px-4 pt-2">
            <h2 class="text-xl font-bold">{{ props.item.title  }}</h2>
            <div>{{ props.item.description }}</div>
            <div class="text-right">
                <NuxtLink :to="`/forms/${props.item.id}`" class="bg-[#FFA800] px-3 py-1 rounded-full">เข้าร่วม</NuxtLink>
            </div>
        </div>
        
    </div>
</template>

<script setup>
    const props = defineProps(['item'])
</script>

<style lang="scss" scoped>

</style>