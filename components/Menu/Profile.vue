<template>
    
    <div id="profile-menu" class="absolute border z-10 text-left top-full -right-1 bg-white text-[#B6B6B6] text-2xl py-4 w-[340px] rounded-[10px]">
        <ul>
            <li class="px-8 py-2">
                <MenuLink @click="goToSetting" class="flex items-center">การตั้งค่า</MenuLink>
            </li>
            <li class="px-9 pt-4 border-t border-[#C0C0C0]">
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