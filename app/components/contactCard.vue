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
    class="group flex flex-1 cursor-pointer gap-2 rounded-xl border border-black/10 px-4 py-3 text-left transition-all duration-400 select-none hover:-translate-y-1 hover:border-black/40 hover:bg-black/5 active:-translate-y-1 active:border-black/40 active:bg-black/5 dark:border-white/10 dark:hover:border-white/40 dark:hover:bg-white/5 dark:active:border-white/40 dark:active:bg-white/5"
    :class="{ 'animate-card': animate }"
  >
    <div
      class="icon flex h-full items-center justify-center text-xl text-zinc-500 transition-colors duration-400 group-hover:text-black group-active:text-black dark:text-zinc-400 dark:group-hover:text-white dark:group-active:text-white"
    >
      <Icon :name="icon ?? `simple-icons:${header.toLowerCase()}`" size="20" />
    </div>
    <div class="flex flex-col">
      <h3
        class="leading-tight font-medium text-zinc-600 transition-colors duration-400 group-hover:text-black group-active:text-black dark:text-zinc-300 dark:group-hover:text-white dark:group-active:text-white"
      >
        {{ header }}
      </h3>
      <p
        v-if="text"
        class="text-xs leading-tight text-zinc-500 transition-colors duration-400 group-hover:text-zinc-700 group-active:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-300 dark:group-active:text-zinc-300"
      >
        {{ text }}
      </p>
    </div>
  </a>
</template>
<style scoped>
:global(.light) .animate-card {
  --pop-border: rgba(0, 0, 0, 0.4);
  --pop-background: rgba(0, 0, 0, 0.05);
  --pop-title: black;
  --pop-text: #3f3f46;
  --pop-icon: black;
}

:global(.dark) .animate-card {
  --pop-border: rgba(255, 255, 255, 0.4);
  --pop-background: rgba(255, 255, 255, 0.05);
  --pop-title: white;
  --pop-text: #d4d4d8;
  --pop-icon: white;
}

.animate-card,
h3,
p,
.icon {
  animation-fill-mode: none !important;
}

.animate-card {
  animation: card-pop 400ms ease-out forwards;
  animation-delay: var(--delay);
}

.animate-card h3 {
  animation: title-highlight 400ms ease-out forwards;
  animation-delay: var(--delay);
}

.animate-card p {
  animation: text-highlight 400ms ease-out forwards;
  animation-delay: var(--delay);
}

.animate-card .icon {
  animation: icon-highlight 400ms ease-out forwards;
  animation-delay: var(--delay);
}

@keyframes card-pop {
  50% {
    transform: translateY(-4px);
    border-color: var(--pop-border);
    background-color: var(--pop-background);
  }
}

@keyframes title-highlight {
  50% {
    color: var(--pop-title);
  }
}

@keyframes text-highlight {
  50% {
    color: var(--pop-text);
  }
}

@keyframes icon-highlight {
  50% {
    color: var(--pop-icon);
  }
}
</style>
