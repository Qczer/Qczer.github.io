<script setup lang="ts">
const props = defineProps<{
  text: string
}>()
</script>
<template>
  <div
    class="group relative flex flex-1 cursor-pointer justify-center gap-2 rounded-xl border border-black/15 px-4 py-3 text-center select-none dark:border-white/15"
  >
    <h3
      class="font-medium text-zinc-600 transition-colors duration-200 group-hover:text-black max-sm:text-sm dark:text-zinc-400 dark:group-hover:text-white"
    >
      {{ text }}
    </h3>
    <div
      class="transition-[opacity, transform] absolute right-3 -bottom-0.5 left-3 z-10 h-1 scale-x-0 border-b-2 border-zinc-800 opacity-0 duration-150 ease-in-out group-hover:scale-x-100 group-hover:opacity-100 group-active:scale-x-100 group-active:opacity-100 dark:border-gray-300"
    />
  </div>
</template>
