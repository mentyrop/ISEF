import type { Language } from './content'

export const supportedLanguages = ['ru', 'en', 'es'] as const

export function isLanguage(value: string | null | undefined): value is Language {
  return supportedLanguages.some(language => language === value)
}

export function languageFromPath(pathname: string): Language | undefined {
  const segment = pathname.replace(/\/index\.html$/, '').replace(/\/+$/, '').slice(1)
  return isLanguage(segment) ? segment : undefined
}

export function resolveLanguage({ pathname, search, savedLanguage, deviceLanguages }: {
  pathname: string
  search: string
  savedLanguage?: string | null
  deviceLanguages: readonly string[]
}): Language {
  const pathLanguage = languageFromPath(pathname)
  if (pathLanguage) return pathLanguage
  const queryLanguage = new URLSearchParams(search).get('lang')
  if (isLanguage(queryLanguage)) return queryLanguage
  if (isLanguage(savedLanguage)) return savedLanguage
  for (const locale of deviceLanguages) {
    const language = locale.trim().toLowerCase().split(/[-_]/)[0]
    if (isLanguage(language)) return language
  }
  return 'en'
}

export function localizedUrl(currentUrl: string, language: Language): URL {
  const url = new URL(currentUrl)
  url.pathname = `/${language}/`
  url.searchParams.delete('lang')
  return url
}

export function initialLanguage(): Language {
  let savedLanguage: string | null = null
  try { savedLanguage = localStorage.getItem('isef-language') } catch { /* Storage is optional. */ }
  return resolveLanguage({
    pathname: window.location.pathname,
    search: window.location.search,
    savedLanguage,
    deviceLanguages: navigator.languages?.length ? navigator.languages : [navigator.language],
  })
}
