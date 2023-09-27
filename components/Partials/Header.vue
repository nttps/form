<template>
    <header class="flex w-full justify-between px-2 lg:py-4 shadow-md">
        <nav
            class="
            flex
            items-center
            gap-x-8
            2xl:gap-x-0
            justify-between
            w-full
            py-4
            md:py-0
            2xl:px-4
            text-lg text-gray-700
            bg-white
            "
        >
            <div>
                <a href="#" class="flex justify-center items-center">
                    <img src="~/assets/images/logo.png" class="w-[50px]" alt="E-Learning Logo">
                    <div class="text-lg 2xl:text-2xl ml-4">
                        <div class="font-semibold">ระบบงานดิจิทัล</div> 
                        <div class="text-[#FFA133]">กรมป้องกันและบรรเทาสาธารณภัย</div> 
                    </div>
                </a>
            </div>
            <div class="flex space-x-2 relative">
                <button type="button" class="relative">
                    <Icon name="i-mdi:home" color="#FFA133" size="40"/>
                </button>
                <button type="button" class="relative" @click="notificationBar = true" ref="buttonNotificationRef">
                    <Icon name="i-mdi:bell" color="#FFA133" size="35"/>
                </button>

                <USlideover v-model="notificationBar">
                    Noti
                </USlideover>
                
                <button type="button" class="flex justify-center items-center space-x-4 relative" @click="toggleMenuBar"  ref="buttonProfileRef">

                    <Icon name="i-mdi:account-circle" color="#FFA133" size="35"/>
                    <div>ชื่อ</div>
                    <Icon name="i-material-symbols:arrow-drop-down" size="40" color="#3E3E3E" />

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
    const buttonNotificationRef = ref(null);
    const config = useRuntimeConfig();
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