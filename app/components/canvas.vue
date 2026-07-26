<script setup lang="ts">
import { getRandomColor, hexToRgb, rgbToString, lerp } from '~~/utils/colors'
const canvas = ref<HTMLCanvasElement | null>(null)

const blockSize = 5
let animationFrameId = 0
let cleanup: (() => void) | undefined

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
    x: Math.random() * canvasEl.width,
    y: Math.random() * canvasEl.height,
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

      if (block.x <= 0) {
        block.x = 0
        block.velocity.x *= -0.8
      } else if (block.x + blockSize >= canvasEl.width) {
        block.x = canvasEl.width - blockSize
        block.velocity.x *= -0.8
      }

      if (block.y <= 0) {
        block.y = 0
        block.velocity.y *= -0.8
      } else if (block.y + blockSize >= canvasEl.height) {
        block.y = canvasEl.height - blockSize
        block.velocity.y *= -0.8
      }

      ctx.beginPath()
      ctx.arc(
        block.x + blockSize / 2,
        block.y + blockSize / 2,
        blockSize / 2,
        0,
        Math.PI * 2
      )
      ctx.fill()
    })

    animationFrameId = requestAnimationFrame(loop)
  }

  loop()

  const handleMouseMove = (event: MouseEvent) => {
    const rect = canvasEl.getBoundingClientRect()

    mouse.x = event.clientX - rect.left
    mouse.y = event.clientY - rect.top
  }

  const handleMouseDown = () => {
    targetColor = hexToRgb(getRandomColor())
  }

  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mousedown', handleMouseDown)

  cleanup = () => {
    cancelAnimationFrame(animationFrameId)
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mousedown', handleMouseDown)
  }
})

onBeforeUnmount(() => {
  cleanup?.()
})
</script>
<template>
  <canvas ref="canvas" class="absolute inset-0 h-full w-full rounded-xl" />
</template>
