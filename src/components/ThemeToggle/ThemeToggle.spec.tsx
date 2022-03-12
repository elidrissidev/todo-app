import { render, screen, fireEvent } from '@testing-library/react'

import { ThemeToggle } from './ThemeToggle'

beforeEach(() => {
  window.localStorage.clear()
  jest.resetAllMocks()
})

describe('ThemeToggle', () => {
  it('initially sets the theme to light', () => {
    render(<ThemeToggle />)

    expect(document.documentElement.classList).not.toContain('dark')
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')
  })

  it('toggles the theme when clicked', () => {
    render(<ThemeToggle />)

    fireEvent.click(screen.getByRole('button'))

    expect(document.documentElement.classList).toContain('dark')
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
  })

  it('saves the theme in localStorage', () => {
    render(<ThemeToggle />)

    fireEvent.click(screen.getByRole('button'))

    expect(window.localStorage.getItem('currentTheme')).toBe('dark')
  })

  it('loads the theme from localStorage if available', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('dark')

    render(<ThemeToggle />)

    expect(document.documentElement.classList).toContain('dark')
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
  })
})
