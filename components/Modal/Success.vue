<template>
    <UModal v-model="props.modelValue">
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex justify-between items-center">
                    <div class="text-xl font-bold text-green-600">{{ props.title }}</div>
                    <div>
                        <UButton icon="i-heroicons-x-mark" size="sm" color="gray" square variant="link" @click="emit('update:model-value', false)" />
                    </div>
                </div>
            </template>

            <slot />
        </UCard>
        
    </UModal>
</template>

<script setup>
const props = defineProps(['modelValue', 'title'])
const emit = defineEmits(['update:model-value'])

</script>

<style lang="scss" scoped>

</style>