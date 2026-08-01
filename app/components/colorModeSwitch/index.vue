<script setup lang="ts">
import SunAndMoon from './sunAndMoon.vue'

const { isDark, toggleMode } = useTheme()
</script>
<template>
  <ClientOnly>
    <button
      type="button"
      :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      class="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-black/20 bg-black/5 p-[3px] text-black transition-colors duration-300 hover:border-black/40 hover:bg-black/10 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/15"
      @click="toggleMode"
    >
      <SunAndMoon
        :isDark="isDark"
        :color="isDark ? 'white' : 'black'"
        class="h-full w-full"
      />
    </button>
  </ClientOnly>
</template>
