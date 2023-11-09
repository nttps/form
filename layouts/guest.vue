<template>
  <div class="bg-[#EAEAEA] flex flex-col min-h-screen">
    <main class="min-h-[calc(100vh-75px)] lg:min-h-[calc(100vh-5rem)] flex flex-col my-4">
        <slot />
    </main>
    <PartialsFooter />
  </div>
</template>

