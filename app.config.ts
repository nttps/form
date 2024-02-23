export default defineAppConfig({
    ui: {
        primary: "amber",
        modal: {
            width: "sm:max-w-3xl",
            container:
                "flex min-h-full items-center justify-center text-center",
        },
        notifications: {
            // Show toasts at the top right of the screen
            position: "bottom-0 right-0",
        },
        notification: {
            title: "text-xl font-bold text-gray-900 dark:text-white",
        },
        toggle: {
            base: "relative inline-flex h-7 w-14 flex-shrink-0 border-2 border-transparent disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none",
            container: {
                base: "pointer-events-none relative inline-block h-6 w-6 rounded-full bg-white dark:bg-gray-900 shadow transform ring-0 transition ease-in-out duration-200",
                active: "translate-x-7 rtl:-translate-x-7",
            },
            icon: {
                on: "h-6 w-6 text-{color}-500 dark:text-{color}-400",
                off: "h-6 w-6 text-gray-400 dark:text-gray-500",
            },
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
        radio: {
            wrapper: "relative flex items-center",
            label: "text-gray-700 dark:text-gray-200 text-base",
        },
        pagination: {
            wrapper: "flex items-center gap-2",
            rounded: "!rounded-full min-w-[32px] justify-center bg-white",
            default: {
                activeButton: {
                    variant: "outline",
                },
            },
        },
        textarea: {
            color: {
                gray: {
                    outline:
                        "shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400",
                },
            },
        },
        checkbox: {
            color: "text-black dark:text-white",
            ring: "focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900",
            wrapper: "relative flex items-center",
            label: "text-gray-700 dark:text-gray-200 text-base",
        },

        skeleton: {
            background: "bg-slate-200 dark:bg-slate-600",
        },
        tabs: {
            list: {
                marker: {
                    background: "bg-[#FFA800] dark:bg-gray-900",
                },
                tab: {
                    active: "text-white bg-[#FFA800]",
                    size: "text-base",
                },
            },
        },
        button: {
            padding: {
                xl: "px-6 py-1.5",
            },
        },
        formGroup: {
            error: "mt-1 text-red-500 dark:text-red-400 text-sm"
        }
    },
});
