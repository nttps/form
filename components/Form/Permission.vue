<template>
    <div class="px-4">
        <div class="text-lg font-bold mb-2">กลุ่มที่สามารถมองเห็น</div>
        <div v-for="permissionType in props.permissions" class="mb-2 px-5 text-base">
            <div class="flex space-x-4 items-center mb-2">
                <div class="font-bold">{{ permissionType.permission_type }}</div>
                <UButton label="เพิ่มสิทธิ์" @click="addPermission(permissionType.permission_type)" v-if="!permissionType.permission.some(p => p.permission_value === 'ทั้งหมด')"/>
                <div class="text-red-600 text-sm" v-else>* สิทธิ์ปัจจุบันของคุณกำหนดถูกกำหนดเป็นทั้งหมดแล้ว ถ้าต้องการกำหนดเฉพาะสิทธิ์ให้ลบสิทธิ์ทั้งหมดออกก่อน</div>
            </div>
        
            <div v-for="(permission, index) in permissionType.permission">
                <div class="pl-2 flex items-center space-x-2 mb-2"> 
                    <div>- {{ permission.permission_value }} </div>
                    <UButton icon="i-heroicons-archive-box-x-mark" @click="deletePermissionToggle(permissionType.permission_type,permission.permission_value)" size="xs" color="red" square variant="solid" />
                </div>
            </div>
            <div v-if="permissionType.permission_type == 'หน่วยงาน'">
                <div v-for="(permission, index) in props.departmentPermissions" class="mt-4">
                    <USelectMenu v-model="permission.permission_value" value-attribute="dep_name" option-attribute="dep_name" :options="departments" searchable searchable-placeholder="หน่วยงาน" placeholder="เลือกหน่วยงาน" />
                </div>
            </div>
            <div v-if="permissionType.permission_type == 'ตำแหน่ง'">
                <div v-for="(permission, index) in props.jobsTypePermissions" class="mt-4">
                    <USelectMenu v-model="permission.permission_value" value-attribute="type_name" option-attribute="type_name" :options="jobsType" searchable searchable-placeholder="ตำแหน่ง" placeholder="เลือกตำแหน่ง" />
                </div>
            </div>
            <div v-if="permissionType.permission_type == 'ระดับ'">
                <div v-for="(permission, index) in props.jobsLevelPermissions" class="mt-4">
                    <USelectMenu v-model="permission.permission_value" value-attribute="level_name" option-attribute="level_name" :options="jobsLevel" searchable searchable-placeholder="ระดับ" placeholder="เลือกระดับ" />
                </div>
                
            </div>
        </div>

        <div class="text-lg font-bold mb-2">ปิดกั้นบุคคล</div>
        <div v-for="(permission, index) in userPermis">
            <div class="pl-2 flex items-center space-x-2 mb-2 text-base"> 
                <div>- {{ permission.permission_value }} </div>
                <UButton icon="i-heroicons-archive-box-x-mark" @click="deletePermissionToggle('ปิดกั้นบุคคล', index)" size="xs" color="red" square variant="solid" />
            </div>
        </div>


        <div class="relative text-base">
            <label for="username">เลือกยูสเซอร์ หรือ ชื่อ - นามสกุล</label>
            <UInput icon="i-heroicons-magnifying-glass-20-solid" @input="fetchUser" v-model="searchUsername" placeholder="ค้นหาจาก Username หรือ ชื่อ - นามสกุล" class="!rounded-[20px] w-full" size="lg" color="white" trailing />
            <div class="cursor-pointer px-2 py-1 mb-1 hover:bg-black/5 border" v-for="user in users.slice(0, 9)" @click="selectUser(user.username, user.fullName)">
                {{ user.fullName }} ({{ user.username }})
            </div>
        </div>
    </div>

    <UModal v-model="deletePermssionAlert" prevent-close>
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="text-center">แจ้งเตือนการยืนยัน</div>
            </template>

            <div class="font-bold text-xl">ต้องการยกเลิกสิทธิ์ {{ dataDeletePermissions.permission_type }} {{ dataDeletePermissions.permission_value }} ใช่หรือไม่</div>

            <template #footer>
                <div class="flex justify-between">
                    <button type="button" class="px-4 py-2 bg-red-600 text-base rounded-[5px] text-white" @click="deletePermission">ยืนยัน</button>
                    <button type="button" class="px-4 py-2 bg-gray-500 text-base rounded-[5px] text-white" @click="deletePermssionAlert = false">ยกเลิก</button>
                </div>
            </template>
        </UCard>
    </UModal>

    <UModal v-model="deletePermssionUser">
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="text-center">แจ้งเตือนการยืนยัน</div>
            </template>

            <div class="font-bold text-xl">ต้องการปิดกั้น {{ dataUserName }} ใช่หรือไม่</div>

            <template #footer>
                <div class="flex justify-between">
                    <button type="button" class="px-4 py-2 bg-red-600 text-base rounded-[5px] text-white" @click="addPermissionUser">ยืนยัน</button>
                    <button type="button" class="px-4 py-2 bg-gray-500 text-base rounded-[5px] text-white" @click="deletePermssionUser = false">ยกเลิก</button>
                </div>
            </template>
        </UCard>
    </UModal>

    <UModal v-model="hasPermission">
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="text-center">แจ้งเตือนการยืนยัน</div>
            </template>

            <div class="font-bold text-xl">{{ responseDeleted }}</div>

        </UCard>
    </UModal>
</template>

<script setup>
    const props = defineProps(['permissions','userPermissions', 'departmentPermissions', 'jobsTypePermissions', 'jobsLevelPermissions', 'urlDelete', 'urlAdd'])

    const emit = defineEmits(['fetchData'])
    const route = useRoute()
    const { username } = useAuthStore();


    const userPermis = computed(() =>  props.userPermissions[0].permission)


    const users = ref([])
    const departments = ref([])
    const jobsType = ref([])
    const jobsLevel = ref([])

    const deletePermssionAlert = ref(false)
    const dataDeletePermissions = ref({
        survey_id: route.params.id,
        permission_type: null,
        permission_value: null,
        modified_by: username,

    })

    const searchUsername = ref('')
    const deletePermssionUser = ref(false)
    const dataUserName = ref(null)

    const hasPermission = ref(false)
    const responseDeleted = ref(null)

    onMounted(() => {
        fetchDepartment()
        fetchJobType()
        fetchJobLevel()
    });

    const fetchDepartment = async () => {
        const res = await getDataMaster('DEPARTMENT')

        departments.value = res
    }

    const fetchJobLevel = async () => {
        const res = await getDataMaster('JOB LEVEL')

        jobsLevel.value = res
    }

    const fetchJobType = async () => {
        const res = await getDataMaster('JOB POSITION')

        jobsType.value = res
    }

    const getDataMaster = async (type) => {
        return await useApi(`/api/MasterType/ListData`, 'POST', {
            MasterTypeID: type,//JOB LEVEL , JOB POSITION ,DEPARTMENT
            SearchText:"",//ค้นหาใน MasterTypeID ,Description1 ,Description2 ,ค่าว่างค้นหาทั้งหมด 
            ShowSelectAll: true//แสดงตัวเลือก "ทั้งหมด"
        });
    }

    const selectUser = (username, name) => {
        deletePermssionUser.value = true
        dataUserName.value = name
        dataDeletePermissions.value.permission_type = 'ปิดกั้นบุคคล'
        dataDeletePermissions.value.permission_value = username
        dataDeletePermissions.value.modified_by = username
    }

    const addPermission = (permission) => {

        if(permission == 'หน่วยงาน') {
            props.departmentPermissions.push({
                'survey_id': route.params.id,
                'permission_type':'หน่วยงาน',//มีได้ 3 ค่าคือ หน่วยงาน , ระดับ , ตำแหน่ง 
                'permission_value':'',//ให้เลือกจาก dropdown โดยใช้ API จาก JobType,JobLevel,Department(ให้โดยคำว่า 'ทั้งหมด' สำหรับการมองเห็นทั้งหมด
                'modified_by': username//current user login
            })

        }
        if(permission == 'ตำแหน่ง') {
            props.jobsTypePermissions.push({
                'survey_id': route.params.id,
                'permission_type':'ตำแหน่ง',//มีได้ 3 ค่าคือ หน่วยงาน , ระดับ , ตำแหน่ง 
                'permission_value':'',//ให้เลือกจาก dropdown โดยใช้ API จาก JobType,JobLevel,Department(ให้โดยคำว่า 'ทั้งหมด' สำหรับการมองเห็นทั้งหมด
                'modified_by': username//current user login
            })

        }
        if(permission == 'ระดับ') {
            props.jobsLevelPermissions.push({
                'survey_id': route.params.id,
                'permission_type':'ระดับ',//มีได้ 3 ค่าคือ หน่วยงาน , ระดับ , ตำแหน่ง 
                'permission_value':'',//ให้เลือกจาก dropdown โดยใช้ API จาก JobType,JobLevel,Department(ให้โดยคำว่า 'ทั้งหมด' สำหรับการมองเห็นทั้งหมด
                'modified_by': username//current user login
            })
        }
        
    }

    const deletePermissionToggle = (type, value) => {
        if(type !== 'ปิดกั้นบุคคล') {
            dataDeletePermissions.value.permission_value = value
        }else {
            const data = props.userPermissions.find(p => p.permission_type == type).permission.find((p,i) => i == value)
            dataDeletePermissions.value.permission_value = data.permission_value
        }
        dataDeletePermissions.value.permission_type = type
        deletePermssionAlert.value = true
    
    }

    const addPermissionUser = async () => {

        const res = await useApi(`/api/servey/ServeyInfo/AddPermission`, 'POST', dataDeletePermissions.value);
        if(res.outputAction.result == 'fail') {
            hasPermission.value = true
            responseDeleted.value = json.outputAction.message1

            return
        }
        deletePermssionUser.value = false
        users.value = []
        searchUsername.value = null
        emit('fetchData')

    }


    const deletePermission = () => {
        if(dataDeletePermissions.value.permission_type == 'ปิดกั้นบุคคล') {
            deleteUserPermission()
        }else {
            deletePermissionAll()
        }

        dataDeletePermissions.value = {
            survey_id: route.params.id,
            permission_type: null,
            permission_value: null,
            modified_by: username,
        }
    }

    const deletePermissionAll = async () => {

        const res = await useApi(`/api/servey/ServeyInfo/DeletePermission`, 'POST', dataDeletePermissions.value);

        const permissionIndex = props.permissions.findIndex(p => p.permission_type == dataDeletePermissions.value.permission_type)
        const permissionValueIndex = props.permissions[permissionIndex].permission.findIndex(v => v.permission_value == dataDeletePermissions.value.permission_value)
        props.permissions[permissionIndex].permission.splice(permissionValueIndex, 1)
        deletePermssionAlert.value = false
    }

   

    const deleteUserPermission = async () => {

        const res = await useApi(`/api/servey/ServeyInfo/DeletePermission`, 'DELETE', dataDeletePermissions.value);
        deletePermssionAlert.value = false
        users.value = []
        searchUsername.value = null
        emit('fetchData')

    }

    const fetchUser = async (e) => {


        if( e && e.target.value.length > 0 ) {
             const res = await useApi(`/api/Person/ListUserInfo`, 'POST', {
                "Search": e ? e.target.value : "",
            });

            users.value = res

        }else {
            users.value = []
        }
       
       
    }
</script>

<style lang="scss" scoped>

</style>