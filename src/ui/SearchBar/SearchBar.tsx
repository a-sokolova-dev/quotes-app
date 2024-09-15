import SearchIcon from '@mui/icons-material/Search'
import { Box, IconButton } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import React, { type JSX, useState } from 'react'

type SearchBarProps = {
  label: string
  onSearch: (value: string) => void
  options: string[]
}

export const SearchBar = ({
  label,
  onSearch,
  options
}: SearchBarProps): JSX.Element => {
  const [value, setInputValue] = useState('')

  const handleSubmit = (): void => {
    onSearch(value)
  }

  return (
    <Box
      alignItems="center"
      display="flex"
      flex="1"
      gap="4px"
      justifyContent="center"
    >
      <Autocomplete
        freeSolo
        onInputChange={(event: React.SyntheticEvent, newValue: string) => {
          setInputValue(newValue)
        }}
        options={options}
        renderInput={params => <TextField {...params} label={label} />}
        sx={{ width: '100%' }}
        value={value}
      />
      <IconButton
        aria-label="search"
        color="primary"
        onClick={handleSubmit}
        size="large"
      >
        <SearchIcon fontSize="inherit" />
      </IconButton>
    </Box>
  )
}
