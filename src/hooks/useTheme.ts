import { useCallback, useEffect, useLayoutEffect, useState } from 'react'

const THEME_KEY = 'currentTheme'

function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    const currentTheme = window.localStorage.getItem(THEME_KEY)

    return (currentTheme || 'light') === 'dark'
  })

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = useCallback(() => setIsDark(value => !value), [])

  return { isDark, toggleTheme }
}

export default useTheme
