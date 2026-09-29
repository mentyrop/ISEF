import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/manrope'
import '@fontsource-variable/unbounded'
import Concepts from './Concepts'
import './concepts.css'

createRoot(document.getElementById('root')!).render(<StrictMode><Concepts /></StrictMode>)
