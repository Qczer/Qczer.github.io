<script setup lang="ts">
const props = defineProps<{
  header: string
  text?: string
  link?: string
  icon?: string
  animate?: boolean
}>()
</script>
<template>
  <a
    :href="link"
    rel="noopener noreferrer"
    target="_blank"
    class="group flex flex-1 cursor-default gap-2 rounded-xl border border-white/10 px-4 py-3 text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/5"
    :class="{ 'animate-card': animate, 'cursor-pointer': !!link }"
  >
    <div
      class="icon flex h-full items-center justify-center text-xl opacity-60 transition-opacity group-hover:opacity-100"
    >
      <Icon :name="icon ?? `simple-icons:${header.toLowerCase()}`" size="20" />
    </div>
    <div class="flex flex-col">
      <h3
        class="leading-tight font-medium text-white/80 transition-colors group-hover:text-white"
        :class="{ 'animate-text': animate }"
      >
        {{ header }}
      </h3>
      <p
        v-if="text"
        class="text-sm leading-tight font-light text-white/50 transition-colors group-hover:text-white/70"
        :class="{ 'animate-text': animate }"
      >
        {{ text }}
      </p>
    </div>
  </a>
</template>
