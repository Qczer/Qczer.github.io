import { computed } from 'vue'

export const useTheme = () => {
  const colorMode = useColorMode()

  const isDark = computed(() => colorMode.value === 'dark')

  const toggleMode = () => {
    colorMode.preference = isDark.value ? 'light' : 'dark'
  }

  return {
    isDark,
    colorMode,
    toggleMode
  }
}
