import { render, screen } from '@testing-library/react'

import { Layout } from './Layout'

describe('Layout', () => {
  it('renders children correctly', () => {
    render(
      <Layout>
        <div data-testid="child">Test Child</div>
      </Layout>
    )

    const child = screen.getByTestId('child')
    expect(child).toBeInTheDocument()
    expect(child).toHaveTextContent('Test Child')
  })

  it('applies correct styles', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    )

    const container = screen.getByText('Test Content').parentElement
    expect(container).toHaveStyle({
      margin: '0 auto',
      maxWidth: '960px',
      padding: '40px 0px 60px',
      textAlign: 'center'
    })
  })
})
