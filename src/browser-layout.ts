type TelegramBrowserBridge = {
  TelegramWebviewProxy?: { postEvent?: unknown }
  webkit?: { messageHandlers?: { performAction?: { postMessage?: unknown } } }
}

// Telegram's regular iOS browser injects this bridge at document start, but uses
// a Safari user agent. Read the bridge signature only; never call native methods.
// https://github.com/TelegramMessenger/Telegram-iOS/blob/master/submodules/BrowserUI/Sources/BrowserWebContent.swift
export function isTelegramIosBrowser(host: object): boolean {
  const bridge = host as TelegramBrowserBridge
  try {
    return typeof bridge.TelegramWebviewProxy?.postEvent === 'function'
      && typeof bridge.webkit?.messageHandlers?.performAction?.postMessage === 'function'
  } catch {
    return false
  }
}
