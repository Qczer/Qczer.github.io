<script setup lang="ts">
import Section from "~/components/section.vue";
</script>

<template>
  <div class="h-screen w-screen p-12">
    <div class="h-full w-full rounded-xl border border-white">
      <div
        class="flex h-full w-full flex-col items-center gap-15 overflow-auto p-10 text-center"
      >
        <Page>
          <Section name="AboutMe" />
          <Section name="HireMe">
            <a href="mailto:mkuczera@proton.me" class="font-semibold underline">
              mkuczera@proton.me
            </a>
          </Section>
        </Page>
        <Page>
          <Section name="Socials"></Section>
        </Page>
      </div>
    </div>
  </div>
</template>
