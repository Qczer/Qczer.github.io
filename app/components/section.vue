<script setup lang="ts">
const props = defineProps<{
  name: string;
}>();

const { t, te } = useI18n();
</script>
<template>
  <div class="flex max-w-200 flex-col gap-5">
    <h2
      class="text-3xl font-semibold uppercase"
      v-html="t(`${name}.header`)"
    ></h2>
    <p v-if="te(`${name}.text`)" v-html="t(`${name}.text`)"></p>
    <slot />
  </div>
</template>
