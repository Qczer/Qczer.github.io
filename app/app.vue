<script setup lang="ts">
const switchLocalePath = useSwitchLocalePath()
const { locale } = useI18n()

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'pl', label: 'PL' }
] as const

const otherLocale = computed(() =>
  locale.value === 'en' ? locales[1] : locales[0]
)

const isLoaded = useCanvas()
</script>

<template>
  <NuxtLayout>
    <Transition
      enter-active-class="transition-opacity duration-500"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-500"
      leave-to-class="opacity-0"
    >
      <h1
        v-if="!isLoaded"
        class="font-display absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl"
      >
        Mateusz Kuczera
      </h1>
    </Transition>
    <div
      class="transition-[filter] duration-700"
      :class="{ 'blur-2xl': !isLoaded }"
    >
      <div class="fixed top-4 right-4 z-50 flex gap-2">
        <ColorModeSwitch />
        <NuxtLink
          :to="switchLocalePath(otherLocale.code)"
          class="cursor-pointer rounded-full border bg-black/5 px-2.5 py-1 text-xs font-semibold tracking-[0.2em] text-zinc-600 uppercase transition-colors hover:border-black/50 hover:bg-black/15 hover:text-black dark:border-black/20 dark:border-white/20 dark:bg-white/10 dark:text-zinc-400 dark:hover:border-white/50 dark:hover:bg-white/15 dark:hover:text-white"
        >
          {{ otherLocale.label }}
        </NuxtLink>
      </div>
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>
