export default defineAppConfig({
    ui: {
        primary: "amber",
        modal: {
            width: "sm:max-w-3xl",
        },
        table: {
            wrapper: "relative overflow-x-auto rounded-2xl",
            divide: "divide-[#FFA800]",
            tbody: "divide-[#FFA800]",
            thead: "divide-[#FFA800] bg-[#FFA800]",
            th: {
                base: "bg-[#FFA800] text-center",
                size: "text-base",
            },
            td: {
                size: "text-base",
                padding: "px-3 py-3",
            },
        },
        checkbox: {
            color: "text-black dark:text-white",
            ring: "focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900",

        },
        loadingState: {
            label: "กำลังโหลด...",
        },
        emptyState: {
            label: "ไม่มีข้อมูล",
        },
    },
});
