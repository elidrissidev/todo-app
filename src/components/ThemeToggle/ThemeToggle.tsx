import './ThemeToggle.css'
import IconMoon from '@/assets/icon-moon.svg'
import IconSun from '@/assets/icon-sun.svg'
import useTheme from '@/hooks/useTheme'

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()
  return (
    <button
      type="button"
      className="ThemeToggle"
      onClick={toggleTheme}
      aria-pressed={isDark}
    >
      <img src={isDark ? IconSun : IconMoon} alt="" />
      <span className="visually-hidden">Toggle dark theme</span>
    </button>
  )
}
