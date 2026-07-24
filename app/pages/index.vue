<script setup lang="ts">
import socials from '~~/data/socials.json'
import Section from '~/components/section.vue'
import SocialsCard from '~/components/socialsCard.vue'

const socialsRef = ref<HTMLElement | null>(null)
const animate = ref(false)
const animationLength = 400
const delay = animationLength / 2
const showScrollButton = ref(true)

const scrollDown = () => {
  socialsRef.value?.scrollIntoView({
    behavior: 'smooth'
  })
}

onMounted(() => {
  const container = document.querySelector('.scroll-container')

  container?.addEventListener('scroll', () => {
    showScrollButton.value = container.scrollTop < 100
  })

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry) return

      if (entry.isIntersecting) {
        animate.value = true
        setTimeout(
          () => (animate.value = false),
          (socials.length - 1) * delay + animationLength
        )
      }
    },
    { threshold: 0.5 }
  )

  if (socialsRef.value) {
    observer.observe(socialsRef.value)
  }
})
</script>

<template>
  <div class="h-screen w-screen p-12">
    <div class="relative h-full w-full rounded-xl border border-white">
      <Canvas />
      <div
        class="scroll-container relative z-20 flex h-full w-full flex-col items-center gap-15 overflow-auto scroll-smooth p-10 text-center"
      >
        <Page class="relative">
          <Section name="AboutMe" />
          <Section name="HireMe">
            <a
              @click="scrollDown"
              class="cursor-pointer font-semibold underline transition-colors hover:text-zinc-400"
            >
              Contact me
            </a>
          </Section>
          <div
            class="absolute bottom-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-white/10 transition-all duration-300 hover:opacity-90"
            :class="[
              showScrollButton
                ? 'opacity-50'
                : 'pointer-events-none translate-y-4 opacity-0'
            ]"
            @click="scrollDown"
          >
            <Icon name="lucide:arrow-down" />
          </div>
        </Page>
        <Page>
          <Section name="Socials">
            <div ref="socialsRef" class="flex w-full justify-center gap-2">
              <SocialsCard
                v-for="(s, i) in socials"
                :key="s.header"
                :header="s.header"
                :text="s.text"
                :link="s.link"
                :icon="s.icon"
                :style="{ '--delay': `${i * delay}ms` }"
                :animate="animate"
              />
            </div>
            <div class="h-1 w-full rounded-lg border-t border-white"></div>
          </Section>
        </Page>
      </div>
    </div>
  </div>
</template>
