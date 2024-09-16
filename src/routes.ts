import { lazy } from 'react'
import type React from 'react'

type RouteItem = {
  Component: React.FC
  path: string
}

enum UI_ROUTES_ENUM {
  AUTHORS = '/authors',
  KEYWORDS = '/keywords',
  QUOTES = '/'
}

export const ROUTES: RouteItem[] = [
  {
    Component: lazy(() => import('./pages/quotes/index.tsx')),
    path: UI_ROUTES_ENUM.QUOTES
  },
  {
    Component: lazy(() => import('./pages/author_view/index.tsx')),
    path: routePath(UI_ROUTES_ENUM.AUTHORS)
  },
  {
    Component: lazy(() => import('./pages/keyword_view/index.tsx')),
    path: routePath(UI_ROUTES_ENUM.KEYWORDS)
  }
]

export const navigation = {
  author: (tag: string) => navigateWithTag(UI_ROUTES_ENUM.AUTHORS, tag),
  keyword: (tag: string) => navigateWithTag(UI_ROUTES_ENUM.AUTHORS, tag)
}

function navigateWithTag(path: UI_ROUTES_ENUM, tag: string): string {
  return `${path}/${tag}`
}

function routePath(path: UI_ROUTES_ENUM): string {
  return `${path}/:tag`
}
