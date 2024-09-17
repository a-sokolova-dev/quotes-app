import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import AuthorView from '../pages/author_view/index.tsx'
import { fetchRandomByAuthor } from '../services/random'

vi.mock(import('../services/random'), async importOriginal => {
  const og = await importOriginal()
  return {
    ...og,
    fetchRandomByAuthor: vi.fn().mockImplementation(og.fetchRandomByAuthor)
  }
})

describe('AuthorView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches and displays a random quote by Lao Tzu', async () => {
    render(
      <MemoryRouter initialEntries={['/authors/lao-tzu']}>
        <Routes>
          <Route element={<AuthorView />} path="/authors/:tag" />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Lao Tzu')).toBeInTheDocument()
    })
  })

  it('does not fetch a quote when tag param is not defined', async () => {
    render(
      <MemoryRouter initialEntries={['/authors/']}>
        <Routes>
          <Route element={<AuthorView />} path="/authors/:tag?" />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(fetchRandomByAuthor).not.toHaveBeenCalled()
    })
  })
})
