<script setup lang="ts">
const props = defineProps<{
  color: string
  isDark: boolean
}>()

const canAnimate = ref(false)

watch(
  () => props.isDark,
  () => {
    if (!canAnimate.value) {
      canAnimate.value = true
    }
  }
)

const rays = [0, 45, 90, 135, 180, 225, 270, 315]
</script>

<template>
  <svg
    viewBox="-15 -15 30 30"
    :class="[
      'sun-moon-svg',
      isDark ? 'is-moon' : 'is-sun',
      { 'can-animate': canAnimate }
    ]"
  >
    <circle id="main-body" r="9" :fill="color" mask="url(#moon-mask)" />
    <defs>
      <mask id="moon-mask">
        <rect x="-15" y="-15" width="30" height="30" fill="white" />
        <circle id="mask-circle" r="9" cx="6" cy="-6" fill="black" />
      </mask>
    </defs>
    <g id="rays-group" :stroke="color" stroke-width="2" stroke-linecap="round">
      <path
        v-for="r in rays"
        :key="r"
        d="M0,9 L0,12"
        class="ray"
        :transform="`rotate(${r})`"
      />
    </g>
  </svg>
</template>
<style scoped>
.sun-moon-svg {
  transition: transform 0.5s ease-in-out;
}

#main-body {
  transform: scale(0.66);
}
#mask-circle {
  transform: scale(0);
}
.ray {
  opacity: 1;
}

.is-moon #main-body {
  transform: scale(1);
}
.is-moon #mask-circle {
  transform: scale(1);
}
.is-moon .ray {
  opacity: 0;
}

.can-animate.is-sun #main-body {
  animation: makeBodySmaller 0.5s forwards;
}
.can-animate.is-sun #mask-circle {
  animation: hideMask 0.5s forwards;
}
.can-animate.is-sun .ray {
  animation: showRays 0.5s forwards;
}

.can-animate.is-moon #main-body {
  animation: makeBodyBigger 0.5s forwards;
}
.can-animate.is-moon #mask-circle {
  animation: showMask 0.5s forwards;
}
.can-animate.is-moon .ray {
  animation: hideRays 0.5s forwards;
}

@keyframes makeBodyBigger {
  0% {
    transform: scale(0.66);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes makeBodySmaller {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.66);
  }
}

@keyframes showMask {
  0% {
    transform: scale(0) translate(0, 0);
  }
  100% {
    transform: scale(1) translate(0, 0);
  }
}
@keyframes hideMask {
  0% {
    transform: scale(1) translate(0, 0);
  }
  100% {
    transform: scale(0) translate(0, 0);
  }
}

@keyframes hideRays {
  0% {
    d: path('M0,9 L0,12');
    opacity: 1;
  }
  100% {
    d: path('M0,0 L0,0');
    opacity: 0;
  }
}
@keyframes showRays {
  0% {
    d: path('M0,0 L0,0');
    opacity: 0;
  }
  100% {
    d: path('M0,9 L0,12');
    opacity: 1;
  }
}
</style>
