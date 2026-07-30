<script setup lang="ts">
import { getRandomColor, hexToRgb, rgbToString, lerp } from '~~/utils/colors'

const isLoaded = useCanvas()

interface block {
  x: number
  y: number
  velocity: {
    x: number
    y: number
  }
  size: number
  history: { x: number; y: number }[]
  phase: number
  flickerSpeed: number
  maxOpacity: number
}

const canvas = ref<HTMLCanvasElement | null>(null)

let blocksCount = 30
let animationFrameId = 0
let cleanup: (() => void) | undefined

const BASE_REPEL_RADIUS = 80
const BASE_REPEL_FORCE = 2
const BASE_MIN_SPEED = 0.2
const BASE_MAX_SPEED = 2
const TRAIL_LENGTH = 30

onMounted(() => {
  const canvasEl = canvas.value as HTMLCanvasElement
  if (!canvasEl) return

  canvasEl.width = canvasEl.clientWidth
  canvasEl.height = canvasEl.clientHeight

  const createBlock = (): block => {
    const maxOpacity = 0.3 + Math.random() * 0.7
    return {
      x: Math.random() * canvasEl.width,
      y: Math.random() * canvasEl.height,
      velocity: {
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1
      },
      size: 2 + Math.random() * 5,
      history: [],
      phase: Math.random() * Math.PI * 2,
      flickerSpeed: 0.005 + Math.random() * 0.015,
      maxOpacity: maxOpacity
    }
  }

  const ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D

  let color = hexToRgb(getRandomColor())
  let targetColor = color
  const mouse = {
    x: -1000,
    y: -1000
  }
  const blocks: block[] = []

  let repelRadius = BASE_REPEL_RADIUS
  let repelForce = BASE_REPEL_FORCE
  let minSpeed = BASE_MIN_SPEED
  let maxSpeed = BASE_MAX_SPEED
  let friction = 0.96

  function loop() {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)

    color = {
      r: lerp(color.r, targetColor.r, 0.02),
      g: lerp(color.g, targetColor.g, 0.02),
      b: lerp(color.b, targetColor.b, 0.02)
    }

    const colorStr = rgbToString(color)

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
      block.phase += block.flickerSpeed

      if (block.x <= 0) {
        block.x = 0
        block.velocity.x *= -0.8
      } else if (block.x + block.size >= canvasEl.width) {
        block.x = canvasEl.width - block.size
        block.velocity.x *= -0.8
      }

      if (block.y <= 0) {
        block.y = 0
        block.velocity.y *= -0.8
      } else if (block.y + block.size >= canvasEl.height) {
        block.y = canvasEl.height - block.size
        block.velocity.y *= -0.8
      }

      const pulse = 0.6 + Math.sin(block.phase) * 0.4
      const currentAlpha = pulse * block.maxOpacity

      block.history.push({ x: block.x, y: block.y })

      if (block.history.length > TRAIL_LENGTH) {
        block.history.shift()
      }

      ctx.shadowBlur = 1
      ctx.shadowColor = colorStr
      ctx.fillStyle = colorStr
      block.history.forEach((pos, index) => {
        const isLast = index === block.history.length - 1
        const ratio = index / (block.history.length - 1)
        const centerX = pos.x + block.size / 2
        const centerY = pos.y + block.size / 2

        if (isLast) {
          ctx.globalAlpha = currentAlpha

          ctx.beginPath()
          ctx.arc(centerX, centerY, block.size / 2.5, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.globalAlpha = ratio * currentAlpha * 0.5
          const tailSize = (block.size / 2) * (0.4 + ratio * 0.6)

          ctx.beginPath()
          ctx.arc(centerX, centerY, tailSize, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      ctx.globalAlpha = 1.0
      ctx.shadowBlur = 0
    })

    animationFrameId = requestAnimationFrame(loop)
  }
  loop()

  const updateBlocksCount = () => {
    blocksCount = Math.floor((canvasEl.width * canvasEl.height) / 60000)
    blocksCount = Math.max(5, blocksCount)
    blocksCount = Math.min(30, blocksCount)

    const diffCount = blocksCount - blocks.length

    if (diffCount > 0) {
      blocks.push(...Array.from({ length: diffCount }, createBlock))
    } else if (diffCount < 0) {
      blocks.splice(blocksCount)
    }
  }
  updateBlocksCount()

  const updateScaling = () => {
    // Obliczamy skalę. 1000px to nasz punkt odniesienia (możesz to dostosować)
    // Używamy Math.sqrt(w * h), aby skala rosła proporcjonalnie do powierzchni/rozdzielczości
    const reference = 1000
    const currentRes = Math.sqrt(canvasEl.width * canvasEl.height)
    const scaleFactor = currentRes / reference

    repelRadius = BASE_REPEL_RADIUS * scaleFactor
    repelForce = BASE_REPEL_FORCE * scaleFactor
    minSpeed = BASE_MIN_SPEED * scaleFactor
    maxSpeed = BASE_MAX_SPEED * scaleFactor
  }

  const handlePointerMove = (event: PointerEvent) => {
    const rect = canvasEl.getBoundingClientRect()

    mouse.x = event.clientX - rect.left
    mouse.y = event.clientY - rect.top
  }

  const handlePointerDown = (event: PointerEvent) => {
    const rect = canvasEl.getBoundingClientRect()

    mouse.x = event.clientX - rect.left
    mouse.y = event.clientY - rect.top

    targetColor = hexToRgb(getRandomColor())
  }

  const handlePointerUp = () => {
    mouse.x = -1000
    mouse.y = -1000
  }

  const handleResize = () => {
    const oldWidth = canvasEl.width
    const oldHeight = canvasEl.height

    canvasEl.width = canvasEl.clientWidth
    canvasEl.height = canvasEl.clientHeight

    const scaleX = canvasEl.width / oldWidth
    const scaleY = canvasEl.height / oldHeight

    blocks.forEach((b) => {
      b.x *= scaleX
      b.y *= scaleY
    })

    updateBlocksCount()
    updateScaling()
  }

  window.addEventListener('pointermove', handlePointerMove)
  window.addEventListener('pointerdown', handlePointerDown)
  window.addEventListener('pointerup', handlePointerUp)
  window.addEventListener('resize', handleResize)

  cleanup = () => {
    cancelAnimationFrame(animationFrameId)
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerdown', handlePointerDown)
    window.removeEventListener('pointerup', handlePointerUp)
    window.removeEventListener('resize', handleResize)
  }

  isLoaded.value = true
})

onBeforeUnmount(() => {
  cleanup?.()
})
</script>
<template>
  <canvas
    ref="canvas"
    class="absolute inset-0 z-0 h-full w-full touch-none rounded-xl"
  />
</template>
