export interface Author {
  a: string
  i: string
  l: string
  t: string
}

export type AuthorTagMap = Map<Author['a'], Author['t']>
