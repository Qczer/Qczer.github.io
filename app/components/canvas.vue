<script setup lang="ts">
import { getRandomColor, hexToRgb, rgbToString, lerp } from '~~/utils/colors'
const canvas = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  const canvasEl = canvas.value as HTMLCanvasElement
  if (!canvasEl) return

  canvasEl.width = canvasEl.clientWidth
  canvasEl.height = canvasEl.clientHeight

  const ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D

  let color = hexToRgb(getRandomColor())
  let targetColor = color
  const mouse = {
    x: -1000,
    y: -1000
  }
  const blocks = Array.from({ length: 30 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    velocity: {
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1
    }
  }))

  const repelRadius = 120
  const repelForce = 2
  const friction = 0.96
  const minSpeed = 0.5
  const maxSpeed = 3

  function loop() {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)

    const r = Math.round(lerp(color.r, targetColor.r, 0.05))
    const g = Math.round(lerp(color.g, targetColor.g, 0.05))
    const b = Math.round(lerp(color.b, targetColor.b, 0.05))

    color = {
      r: lerp(color.r, targetColor.r, 0.02),
      g: lerp(color.g, targetColor.g, 0.02),
      b: lerp(color.b, targetColor.b, 0.02)
    }

    ctx.fillStyle = rgbToString(color)

    blocks.forEach((block) => {
      const dx = block.x - mouse.x
      const dy = block.y - mouse.y

      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < repelRadius && distance > 0) {
        const force = (1 - distance / repelRadius) * repelForce

        block.velocity.x += (dx / distance) * force
        block.velocity.y += (dy / distance) * force
      }

      block.velocity.x *= friction
      block.velocity.y *= friction

      const speed = Math.sqrt(block.velocity.x ** 2 + block.velocity.y ** 2)

      if (speed < minSpeed && speed > 0) {
        block.velocity.x = (block.velocity.x / speed) * minSpeed
        block.velocity.y = (block.velocity.y / speed) * minSpeed
      } else if (speed > maxSpeed) {
        block.velocity.x = (block.velocity.x / speed) * maxSpeed
        block.velocity.y = (block.velocity.y / speed) * maxSpeed
      }

      block.x += block.velocity.x
      block.y += block.velocity.y

      if (block.x >= canvasEl.width || block.x <= 0) block.velocity.x *= -1
      if (block.y >= canvasEl.height || block.y <= 0) block.velocity.y *= -1

      ctx.fillRect(block.x, block.y, 5, 5)
    })

    requestAnimationFrame(loop)
  }

  loop()

  window.addEventListener('mousemove', (event) => {
    const rect = canvasEl.getBoundingClientRect()

    mouse.x = event.clientX - rect.left
    mouse.y = event.clientY - rect.top
  })

  window.addEventListener('mousedown', () => {
    targetColor = hexToRgb(getRandomColor())
  })
})
</script>
<template>
  <canvas ref="canvas" class="absolute inset-0 h-full w-full rounded-xl" />
</template>
