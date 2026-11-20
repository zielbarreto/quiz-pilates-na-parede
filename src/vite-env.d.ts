/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_META_PIXEL_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  fbq?: (...args: unknown[]) => void
  _fbq?: (...args: unknown[]) => void
  __pilatesPixelInitialized?: boolean
  __pilatesPixelEvents?: Set<string>
}
