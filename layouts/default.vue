<template>
  <div class="bg-[#EAEAEA] flex flex-col min-h-screen">
    <PartialsHeader />
        <main class="min-h-[calc(100vh-75px)] lg:min-h-[calc(100vh-5rem)] flex flex-col my-4">
          <slot />
        </main>
    <PartialsFooter />
  </div>
</template>


<script setup>
  const route = useRoute()

  const title = route.meta.title ?? `หน้าแรก`
  useHead({
    title: `DDPM Voting - ${title}`,
    meta: [{ property: 'og:title', content: `DDPM E-Learning - ${title}` }]
  })
</script>