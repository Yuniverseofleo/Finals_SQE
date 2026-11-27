// @vitest-environment jsdom

import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import App from '../App'

describe('SQE Final Project App', () => {
  it('renders the application successfully', () => {
    const { container } = render(<App />)

    expect(container.firstChild).not.toBeNull()
  })
})