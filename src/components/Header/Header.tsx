import './Header.css'
import { ThemeToggle } from '@/components/ThemeToggle'

export function Header() {
  return (
    <header className="Header">
      <h1 className="Header-title">Todo</h1>
      <ThemeToggle />
    </header>
  )
}
