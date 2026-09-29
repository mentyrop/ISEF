import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/unbounded'
import '@fontsource-variable/manrope'
import App from './App'
import { isTelegramIosBrowser } from './browser-layout'
import './styles.css'

document.documentElement.classList.toggle('telegram-browser', isTelegramIosBrowser(window))

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
