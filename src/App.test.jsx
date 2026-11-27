
import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import App from './App'

afterEach(() => {
  cleanup()
})

describe('App Component', () => {
  it('displays the initial counter value', () => {
    render(<App />)

    expect(
      screen.getByRole('button', { name: 'Count is 0' })
    ).toBeTruthy()
  })

  it('increments the counter when clicked', () => {
    render(<App />)

    const button = screen.getByRole('button', { name: 'Count is 0' })
    fireEvent.click(button)

    expect(
      screen.getByRole('button', { name: 'Count is 1' })
    ).toBeTruthy()
  })

  it('increments the counter multiple times', () => {
    render(<App />)

    const button = screen.getByRole('button', { name: 'Count is 0' })

    fireEvent.click(button)
    fireEvent.click(button)

    expect(
      screen.getByRole('button', { name: 'Count is 2' })
    ).toBeTruthy()
  })

  it('displays the application heading', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Get started' })
    ).toBeTruthy()
  })

  it('displays the documentation section', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Documentation' })
    ).toBeTruthy()
  })
})
