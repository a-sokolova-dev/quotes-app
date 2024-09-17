export interface Quote {
  a: string
  c: string
  h: string
  i: string
  q: string
}

export interface QuoteWithTag extends Quote {
  t: string
}
