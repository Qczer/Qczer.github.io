<script setup lang="ts">
const props = defineProps<{
  name: string
}>()

const { t, te } = useI18n()
</script>
<template>
  <div class="flex w-full flex-col gap-5" :id="name">
    <h2
      class="text-3xl font-medium tracking-wider uppercase"
      v-html="t(`${name}.header`)"
    />
    <p v-if="te(`${name}.text`)" v-html="t(`${name}.text`)" />
    <slot />
  </div>
</template>
