<template>
    <header class="flex w-full justify-between px-2 py-2 shadow-primary border-b border-black bg-white">
        <nav
            class="
            flex
            items-center
            gap-x-8
            2xl:gap-x-0
            justify-between
            w-full
            md:py-0
            text-lg text-gray-700
            bg-white
            "
        >
            <div>
                <a href="/" class="flex justify-center items-center">
                    <img src="~/assets/images/logo.png" class="w-[70px]" alt="E-Booking Logo">
                    <div class="text-lg 2xl:text-xl ml-4">
                        <div>ระบบโหวตและแบบสอบถาม</div> 
                        <div class="text-[#FFA133]">กรมป้องกันและบรรเทาสาธารณภัย</div> 
                    </div>
                </a>
            </div>
            <div class="flex space-x-2 relative">
                <NuxtLink to="/" class="relative">
                    <Icon name="i-mdi:home" color="#FFA133" size="40"/>
                </NuxtLink>
                
                <button type="button" class="flex justify-center items-center space-x-4 relative" @click="toggleMenuBar"  ref="buttonProfileRef">

                    <Icon name="i-mdi:account-circle" color="#FFA133" size="35"/>
                    <ClientOnly>

                        <div class="hidden xl:block">{{ auth.username }}</div>
                    </ClientOnly>
                    <div class="hidden xl:block">
                        <Icon name="i-material-symbols:arrow-drop-down" size="40" color="#3E3E3E"/>
                    </div>

                    <MenuProfile  v-if="menuBar"/>
                </button>
               
            </div>
        </nav>
        
    </header>
</template>

<style>
    .nav-header-li {
        @apply px-2 2xl:px-8 py-2 block hover:bg-[#FFA800] hover:text-white rounded-[20px] transition delay-100;
    }
</style>

<script setup>

    const menuBar = ref(false)
    const notificationBar = ref(false)
    const buttonProfileRef = ref(null);

    const auth = useAuthStore();

    onClickOutside(
        buttonProfileRef,
        (event) => {
            menuBar.value = false
        },
    )

    const toggleMenuBar = () => {
        menuBar.value = !menuBar.value
        notificationBar.value = false
    }

  
</script>