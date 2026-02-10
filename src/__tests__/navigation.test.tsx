import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('navigation', () => {
  it('navigates to second page without any router', async () => {
    render(<App />)
    expect(screen.queryByText(/Second Page/i)).toBeNull()
    await userEvent.click(screen.getByLabelText('go-to-second'))
    expect(await screen.findByText(/Second Page/i)).toBeDefined()
  })
})
