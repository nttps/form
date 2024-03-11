<template>
    <div>
        <div v-if="!register && !reset" class="py-16">
            <div class="text-center text-3xl font-bold mb-24">เข้าสู่ระบบ</div>
            <form @submit.prevent="login" method="POST">
                <div class="mb-8">
                    <UInput placeholder="ชื่อผู้ใช้งาน" v-model="loginForm.username" required/>
                </div>
            
                <div>
                    <UInput type="password" placeholder="รหัสผ่าน" v-model="loginForm.password" required/>
                </div>
                
                <div class="text-center">
                    <UButton type="submit" :loading="waitingLogin" size="xl" class="mt-4 text-center">เข้าสู่ระบบ</UButton>
                </div>
            </form>
        </div>
        
        <UModal v-model="isFail">
            <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <div class="font-bold text-xl text-red-600 text-center">{{ messageError }}</div>
            </UCard>
            
        </UModal>
    </div>
   
</template>

<script setup>

const router = useRouter();
const user = useAuthStore();
const isFail = ref(false)
const messageError = ref('')
const waitingLogin = ref(false)

definePageMeta({ 
    layout: 'auth',
})

const loginForm = ref({
  username: "",
  password: "",
  AppsID: "SURVEY"
})

const register = ref(false)
const reset = ref(false)


function login() {

    waitingLogin.value = true
  user
    .login(JSON.stringify(loginForm.value))
    .then((_response) => router.push("/"))
    .catch((error) => {
        isFail.value = true
        waitingLogin.value = false
        messageError.value = error
    });
}


const resetPassword = () => {
    reset.value = true
}

</script>

<style lang="scss" scoped>

</style>