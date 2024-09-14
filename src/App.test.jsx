import { render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
  it('renders the App component', async () => {
    render(<App />)
    
    const heading = await screen.findByRole('heading')
    expect(heading).toHaveTextContent('Vite + React')
  })
})