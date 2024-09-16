import { CircularProgress } from '@mui/material'
import { type JSX, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { ROUTES } from '../../routes.ts'

export const Router = (): JSX.Element => {
  return (
    <Routes>
      {ROUTES.map(({ Component, path }) => (
        <Route
          element={
            <Suspense fallback={<CircularProgress />}>
              <Component />
            </Suspense>
          }
          key={path}
          path={path}
        />
      ))}
    </Routes>
  )
}
