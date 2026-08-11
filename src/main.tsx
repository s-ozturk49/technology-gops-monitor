import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TakeoffSparProvider } from '@takeoff-ui/react-spar'
import '@takeoff-design/tokens/css/default/theme.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TakeoffSparProvider colorMode="light">
      <App />
    </TakeoffSparProvider>
  </StrictMode>,
)