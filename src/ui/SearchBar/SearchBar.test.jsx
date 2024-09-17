import { fireEvent, render, screen } from '@testing-library/react'

import { SearchBar } from './SearchBar'

describe('SearchBar', () => {
  const mockOnSearch = vi.fn()
  const options = ['Option 1', 'Option 2', 'Option 3']
  const label = 'Search'

  it('calls onSearch with correct value when search button is clicked', () => {
    render(
      <SearchBar label={label} onSearch={mockOnSearch} options={options} />
    )

    const input = screen.getByLabelText(label)
    fireEvent.change(input, { target: { value: 'test' } })

    const searchButton = screen.getByLabelText(`${label} button`)
    fireEvent.click(searchButton)

    expect(mockOnSearch).toHaveBeenCalledWith('test')
  })
})
