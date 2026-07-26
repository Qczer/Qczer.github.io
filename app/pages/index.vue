<script setup lang="ts">
import contact from '~~/data/contact.json'
import skills from '~~/data/skills.json'
import projects from '~~/data/projects.json'
import Section from '~/components/section.vue'
import ContactCard from '~/components/contactCard.vue'

const { t } = useI18n()

const contactRef = ref<HTMLElement | null>(null)
const skillsRef = ref<HTMLElement | null>(null)
const animate = ref(false)
const animationLength = 400
const delay = animationLength / 2
const showScrollButton = ref(true)

const scrollTo = (element: HTMLElement | null) => {
  element?.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
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
          (contact.length - 1) * delay + animationLength
        )
      }
    },
    { threshold: 0.5 }
  )

  if (contactRef.value) {
    observer.observe(contactRef.value)
  }
})
</script>

<template>
  <div class="h-screen w-screen md:p-12">
    <div
      class="relative h-full w-full rounded-xl border-black md:border dark:border-white"
    >
      <Canvas />
      <div
        class="scroll-container relative z-20 flex h-full w-full flex-col items-center gap-15 overflow-auto scroll-smooth text-center"
      >
        <Page class="relative">
          <Section name="AboutMe" />
          <Section name="HireMe">
            <a
              @click="scrollTo(contactRef)"
              class="cursor-pointer font-semibold underline transition-colors hover:text-zinc-400"
            >
              {{ t('HireMe.contactMe') }}
            </a>
          </Section>
          <ScrollDownBtn
            :show="showScrollButton"
            :onClick="() => scrollTo(skillsRef)"
          />
        </Page>
        <Page>
          <Section name="Skills">
            <div
              ref="skillsRef"
              class="grid h-full grow grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4"
            >
              <SkillCard v-for="s in skills" :text="s" />
            </div>
            <div
              class="h-1 w-full rounded-lg border-t border-black transition-colors max-md:hidden dark:border-white"
            ></div>
          </Section>
        </Page>
        <Page>
          <Section name="Projects">
            <ProjectCard
              v-for="p in projects"
              :name="p.name"
              :technology="p.technology"
              :desc="p.desc"
              :link="p.link"
            />
          </Section>
        </Page>
        <Page>
          <Section name="Contact">
            <div
              ref="contactRef"
              class="grid grow grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4"
            >
              <ContactCard
                v-for="(s, i) in contact"
                :key="s.header"
                :header="s.header"
                :text="s.text"
                :link="s.link"
                :icon="s.icon"
                :style="{ '--delay': `${i * delay}ms` }"
                :animate="animate"
              />
            </div>
            <div
              class="h-1 w-full rounded-lg border-t border-black transition-colors max-md:hidden dark:border-white"
            ></div>
          </Section>
        </Page>
      </div>
    </div>
  </div>
</template>
