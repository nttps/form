<template>
    <UModal v-model="isOpen" :prevent-close="props.close">
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }" >
            <template #header v-if="props.close">
                <div class="flex justify-between items-center">
                    <div class="text-2xl font-bold text-red-600">{{ props.title }}</div>
                    <div v-if="props.close">
                        <UButton icon="i-heroicons-x-mark" size="sm" color="gray" square variant="link" @click="emit('update:model-value', false)" />
                    </div>
                </div>
            </template>

            <slot />
        </UCard>

        
    </UModal>
</template>

<script setup>
const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    close: {
      type: Boolean,
      default: false
    },
})
const isOpen = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    }
});
const emit = defineEmits(['update:model-value'])

</script>

<style lang="scss" scoped>

</style>