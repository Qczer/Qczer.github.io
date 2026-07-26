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
    class="group flex flex-1 cursor-pointer gap-2 rounded-xl border border-black/10 px-4 py-3 text-left transition-all duration-300 hover:-translate-y-1 hover:border-black/40 hover:bg-black/5 dark:border-white/10 dark:hover:border-white/40 dark:hover:bg-white/5"
    :class="{ 'animate-card': animate }"
  >
    <div
      class="icon flex h-full items-center justify-center text-xl opacity-60 transition-opacity group-hover:opacity-100"
    >
      <Icon :name="icon ?? `simple-icons:${header.toLowerCase()}`" size="20" />
    </div>
    <div class="flex flex-col">
      <h3
        class="leading-tight font-medium text-black/80 transition-colors group-hover:text-black dark:text-white/80 dark:group-hover:text-white"
      >
        {{ header }}
      </h3>
      <p
        v-if="text"
        class="text-sm leading-tight font-light text-black/50 transition-colors group-hover:text-black/70 dark:text-white/50 dark:group-hover:text-white/70"
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
  --pop-text: rgba(0, 0, 0, 0.7);
}

:global(.dark) .animate-card {
  --pop-border: rgba(255, 255, 255, 0.4);
  --pop-background: rgba(255, 255, 255, 0.05);
  --pop-title: white;
  --pop-text: rgba(255, 255, 255, 0.7);
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
    opacity: 1;
  }
}
</style>
