import { render, screen } from '@testing-library/react'

import { Layout } from './Layout.tsx'

describe('Layout', () => {
  it('applies correct styles', () => {
    render(
      <Layout>
        <div data-testid="child">Test Child</div>
      </Layout>
    )

    const child = screen.getByTestId('child')
    const container = child.parentElement
    expect(container).toHaveStyle({
      margin: '0 auto',
      maxWidth: '960px',
      padding: '40px 0px 60px',
      textAlign: 'center'
    })
  })
})
