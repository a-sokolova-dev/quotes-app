import { lazy } from 'react'
import type React from 'react'

enum UI_ROUTES_ENUM {
  AUTHORS_WITH_TAG = '/authors/:tag',
  QUOTES = '/quotes'
}

type RouteItem<T> = {
  Component: React.FC
  path: T
}

export const ROUTES: RouteItem<UI_ROUTES_ENUM>[] = [
  {
    Component: lazy(() => import('./pages/quotes/index.tsx')),
    path: UI_ROUTES_ENUM.QUOTES
  },
  {
    Component: lazy(() => import('./pages/author_view/index.tsx')),
    path: UI_ROUTES_ENUM.AUTHORS_WITH_TAG
  }
]
