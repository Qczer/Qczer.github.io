<script setup lang="ts">
const props = defineProps<{
  name: string
  technology: string[]
  desc: string
  link: string
}>()

const goToPage = () => {
  navigateTo(props.link)
}
</script>
<template>
  <div
    class="group relative flex cursor-pointer items-center justify-between gap-2 border-b border-b-zinc-800 p-2"
    @click="goToPage"
  >
    <div class="flex flex-col gap-2">
      <div class="flex gap-4">
        <h3 class="text-lg font-medium">
          {{ name }}
        </h3>
        <div class="flex items-center gap-1 text-xs opacity-60">
          <template v-for="(t, i) in technology">
            <span>{{ t }}</span>
            <span
              v-if="i !== technology.length - 1"
              class="h-1 w-1 rounded-full bg-white"
            />
          </template>
        </div>
      </div>
      <p class="text-left text-sm opacity-60">
        {{ desc }}
      </p>
    </div>
    <Icon
      name="lucide:external-link"
      size="24"
      class="shrink-0 transition-transform group-hover:translate-x-2"
    />
    <div
      class="absolute bottom-0 left-1/2 h-px w-full -translate-x-1/2 scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100"
    />
  </div>
</template>
