import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { Router } from './Router'

vi.mock('../../routes', () => ({
  ROUTES: [
    { Component: () => <div>Quotes Page</div>, path: '/' },
    { Component: () => <div>Authors Page</div>, path: '/authors' },
    { Component: () => <div>Keywords Page</div>, path: '/keywords' }
  ]
}))

describe('Router Component', () => {
  it('renders the correct route for the current path', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Router />
      </MemoryRouter>
    )

    const quotesPage = await screen.findByText('Quotes Page')
    expect(quotesPage).toBeInTheDocument()
  })
})
