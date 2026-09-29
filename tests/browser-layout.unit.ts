import assert from 'node:assert/strict'
import { test } from 'node:test'
import { isTelegramIosBrowser } from '../src/browser-layout.ts'

test('regular Telegram iOS browser is recognised without calling its bridge', () => {
  const nativeCall = () => { throw new Error('Native bridge must not be called') }
  assert.equal(isTelegramIosBrowser({
    TelegramWebviewProxy: { postEvent: nativeCall },
    webkit: { messageHandlers: { performAction: { postMessage: nativeCall } } },
  }), true)
})

test('Safari, desktop, Android Telegram and unrelated WebViews keep normal scrolling', () => {
  for (const host of [
    {},
    { webkit: {} },
    { TelegramWebviewProxy: { postEvent() {} } },
    { webkit: { messageHandlers: { performAction: { postMessage() {} } } } },
    { TelegramWebviewProxy: {}, webkit: { messageHandlers: { performAction: {} } } },
  ]) assert.equal(isTelegramIosBrowser(host), false)
})

test('an inaccessible native bridge cannot prevent page startup', () => {
  assert.equal(isTelegramIosBrowser({ get webkit() { throw new Error('Denied') }, TelegramWebviewProxy: { postEvent() {} } }), false)
})
