<template>
    
    <div id="profile-menu" class="absolute border z-10 text-left top-full -right-1 bg-white text-[#B6B6B6] text-xl w-[250px] rounded-[10px]">
        <ul>
            <!-- <li class="px-4 py-2">
                <MenuLink @click="goToSetting" class="flex items-center">การตั้งค่า</MenuLink>
            </li> -->
            <li class="px-4 py-2">
                <MenuLink @click="logout" class="flex items-center"> ออกจากระบบ</MenuLink>
            </li>
        </ul>
    </div>
</template>

<script setup>

const logout = () => {
}

const goToSetting = () => {

}
</script>

<style lang="scss" scoped>

</style>