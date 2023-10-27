<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :throttle="0" />
    <NuxtPage />
  </NuxtLayout>

  <UNotifications/>
</template>


<script setup>
useHead({
  htmlAttrs: {
    lang: 'th',
  },
  charset: 'utf-8',
  title: 'DDPM Questionnaire',
  titleTemplate: title => title !== 'DDPM Questionnaire' ? `${title} - DDPM Questionnaire` : title,
  meta: [
    { name: 'description', content: 'DDPM Questionnaire' },
    { property: 'og:image', content: 'https://movies.nuxt.space/social-card.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@nuxt_js' },
    { name: 'twitter:creator', content: '@nuxt_js' },
  ],
})
</script>
<style>

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
