<script setup lang="ts">
const props = defineProps<{
  show: boolean
  onClick: () => void
}>()
</script>
<template>
  <div
    class="absolute bottom-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/40 bg-black/10 transition-all duration-300 hover:opacity-90 dark:border-white/40 dark:bg-white/10"
    :class="[
      show ? 'opacity-50' : 'pointer-events-none translate-y-4 opacity-0'
    ]"
    @click="onClick"
  >
    <Icon name="lucide:arrow-down" />
  </div>
</template>
