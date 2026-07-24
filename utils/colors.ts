export const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0')}`
}

export const hexToRgb = (hex: string) => {
  const value = hex.replace('#', '')

  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16)
  }
}

export const rgbToString = (color: { r: number; g: number; b: number }) => {
  return `rgb(${color.r}, ${color.g}, ${color.b})`
}

export const lerp = (a: number, b: number, t: number) => {
  return a + (b - a) * t
}
