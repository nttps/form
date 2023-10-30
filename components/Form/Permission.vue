<template>
    <div class="px-6 py-4 bg-white rounded-lg mb-4">
        <div class="font-bold text-xl mb-2">{{ item.label }}</div>
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
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>