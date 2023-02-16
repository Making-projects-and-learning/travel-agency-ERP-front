/** Libraries */
import { render, screen } from '@testing-library/react'

/** Pages */
import { LoginPage } from '../../src/pages'

test('Renders LoginPage correctly', async () => {
  render(<LoginPage />)
  const title = screen.getByLabelText('loginTitle')
  expect(title.innerHTML).toBe('LoginPage')
})
