<template>
  <div class="bg-gradient-to-r from-white to-[#B2B4B7] flex flex-col min-h-screen">
    <main class="min-h-[calc(100vh-75px)] h-[calc(100vh-75px)] lg:min-h-[calc(100vh-5rem)] lg:h-[calc(100vh-5rem)] flex flex-col">
        <slot />
    </main>
    <PartialsFooter />
  </div>
</template>

