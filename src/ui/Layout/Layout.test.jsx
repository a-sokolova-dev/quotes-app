import { render, screen } from '@testing-library/react'

import { Layout } from './Layout'

describe('Layout', () => {
  it('renders children', async () => {
    render(
      <Layout>
        <div>child</div>
      </Layout>
    )
    
    const child = await screen.findByText('child')
    expect(child).toBeInTheDocument()
  })
})
