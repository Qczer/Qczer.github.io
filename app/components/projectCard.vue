<script setup lang="ts">
const props = defineProps<{
  name: string
  technology: string[]
  desc: string
  link: string
}>()

const goToPage = () => {
  navigateTo(props.link, {
    open: {
      target: '_blank'
    }
  })
}
</script>
<template>
  <div
    class="group relative flex cursor-pointer items-center justify-between gap-2 border-b border-b-gray-300 p-2 select-none dark:border-b-zinc-800"
    @click="goToPage"
  >
    <div class="flex min-w-0 flex-col gap-1 md:gap-2">
      <div class="flex gap-4">
        <h3 class="max-sm:text-md text-lg font-normal">
          {{ name }}
        </h3>
        <div
          class="flex items-center gap-1 text-xs text-zinc-600 dark:text-zinc-400"
        >
          <template v-for="(t, i) in technology">
            <span class="text-[10px] max-md:tracking-wide md:text-xs">
              {{ t }}
            </span>
            <span v-if="i !== technology.length - 1">-</span>
          </template>
        </div>
      </div>
      <p
        class="text-left text-sm text-zinc-500 max-sm:text-xs dark:text-zinc-400"
      >
        {{ desc }}
      </p>
    </div>
    <Icon
      name="lucide:external-link"
      size="24"
      class="shrink-0 transition-transform group-hover:translate-x-2 group-active:translate-x-2"
    />
    <div
      class="absolute bottom-0 left-1/2 h-px w-full -translate-x-1/2 scale-x-0 bg-black transition-transform duration-300 ease-out group-hover:scale-x-100 group-active:scale-x-100 dark:bg-white"
    />
  </div>
</template>
