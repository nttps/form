<template>
    <PartialsTitle prefix="ระบบ" title="แบบสอบถาม" icon="i-mdi-file-document-plus" back/>

    <div class="px-8 mt-4">
        <h3 class="text-xl md:text-2xl font-bold mb-4 flex items-center space-x-2">
            <div>สร้าง<span class="color-primary">ฟอร์มสมัคร</span></div> 
            <Icon name="i-mdi-pencil" size="25" color="black" />
        </h3>

        <UForm :state="form">
            <div class="px-6 py-4 bg-white rounded-lg mb-4">
                <div class="font-bold text-xl mb-2">ฟอร์มสมัคร</div>
                <UFormGroup label="หัวข้อฟอร์มสมัคร" name="title" size="xl" class="mb-2">
                    <UInput placeholder="กรอกหัวข้อฟอร์มสมัคร" size="md" />
                </UFormGroup>
                <UFormGroup label="รายละเอียด" name="description" size="xl" class="mb-2">
                    <UTextarea :rows="5"/>
                </UFormGroup>
            </div>

            <FormSetting />

            <div class="text-right mt-4">
                <button class="rounded-lg px-6 py-1.5 bg-[#FFA133]" @click="submit">สร้าง</button>
                <NuxtLink to="/" class="ml-4 rounded-lg px-6 py-1.5 border border-gray-400">ยกเลิก</NuxtLink>
            </div>
        </UForm>
    </div>
</template>

<script setup>

    const form = ref({
        title: '',
        type: 'register-form',
        description: '',
    })

    const submit = () => {
        navigateTo('/')
    }
</script>

<style lang="scss" scoped>
    .question-list-move {
        transition: transform 0.5s;
    }

    .answer-list-move {
        transition: transform 0.5s;
    }
    .no-move {
        transition: transform 0s;
    }
    .ghost {
        opacity: 0.5;
        padding: .5rem 0;
        background: #c8ebfb;
    }
</style>