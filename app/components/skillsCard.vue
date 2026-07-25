<script setup lang="ts">
const props = defineProps<{
  text: string
}>()
</script>
<template>
  <div
    class="group relative flex flex-1 cursor-pointer justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-center transition-all duration-300"
  >
    <h3
      class="font-medium text-white/80 transition-colors group-hover:text-white"
    >
      {{ text }}
    </h3>
    <div
      class="transition-[opacity, transform] absolute inset-0 z-10 h-full w-full scale-x-0 rounded-xl border-b border-gray-300 opacity-0 duration-300 ease-in-out group-hover:scale-x-100 group-hover:opacity-100"
    />
  </div>
</template>
