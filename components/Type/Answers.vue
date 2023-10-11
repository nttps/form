<template>
    <div for="" v-for="(answer, index) in props.answers" :key="answer.position" class="flex items-center py-2 space-x-4 group list-group-item">
        
    </div>
</template>

<script setup>
    const props = defineProps(['answers'])
</script>

<style lang="scss" scoped>

</style>