import assert from 'node:assert/strict'
import { test } from 'node:test'
import { languageFromPath, localizedUrl, resolveLanguage } from '../src/language.ts'

const resolve = (options: Partial<Parameters<typeof resolveLanguage>[0]> = {}) => resolveLanguage({
  pathname: '/', search: '', deviceLanguages: [], ...options,
})

test('direct language links override preferences and conflicting legacy queries', () => {
  for (const language of ['ru', 'en', 'es']) {
    for (const path of [`/${language}`, `/${language}/`, `/${language}/index.html`]) {
      assert.equal(resolve({ pathname: path, search: '?lang=en', savedLanguage: 'ru', deviceLanguages: ['en-US'] }), language)
    }
  }
  assert.equal(languageFromPath('/es/unknown'), undefined)
})

test('legacy links and all three saved choices take precedence over device language', () => {
  assert.equal(resolve({ search: '?lang=es', savedLanguage: 'ru', deviceLanguages: ['en'] }), 'es')
  for (const savedLanguage of ['ru', 'en', 'es']) {
    assert.equal(resolve({ savedLanguage, deviceLanguages: ['es-MX'] }), savedLanguage)
  }
})

test('device locale variants are matched in preference order, with English as fallback', () => {
  for (const locale of ['es-MX', 'es-ES', 'ES-ar', 'es']) assert.equal(resolve({ deviceLanguages: [locale] }), 'es')
  assert.equal(resolve({ deviceLanguages: ['ru-RU', 'en-US'] }), 'ru')
  assert.equal(resolve({ deviceLanguages: ['fr-FR', 'es-MX', 'en-US'] }), 'es')
  assert.equal(resolve({ deviceLanguages: ['en-GB', 'ru'] }), 'en')
  assert.equal(resolve({ deviceLanguages: ['zh-CN'], savedLanguage: 'invalid', search: '?lang=de' }), 'en')
  assert.equal(resolve(), 'en')
})

test('switching languages preserves the section and unrelated query parameters', () => {
  assert.equal(localizedUrl('https://isef.pro/es/?lang=es&utm_source=invite#team', 'ru').href,
    'https://isef.pro/ru/?utm_source=invite#team')
})
