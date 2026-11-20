const pixelId = import.meta.env.VITE_META_PIXEL_ID?.trim()

export function initializeMetaPixel() {
  if (!pixelId || window.__pilatesPixelInitialized) return

  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) {
      fbq.callMethod(...args)
    } else {
      fbq.queue?.push(args)
    }
  }) as typeof window.fbq & {
    callMethod?: (...args: unknown[]) => void
    queue?: unknown[][]
    loaded?: boolean
    version?: string
  }

  fbq.queue = []
  fbq.loaded = true
  fbq.version = '2.0'
  window.fbq = fbq
  window._fbq = fbq
  window.__pilatesPixelInitialized = true

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/pt_BR/fbevents.js'
  document.head.appendChild(script)

  fbq('init', pixelId)
  fbq('track', 'PageView')
  fbq('track', 'ViewContent', { content_name: 'Quiz Pilates na Parede' })
}

export function trackPixelEvent(name: string, options?: Record<string, string | number>) {
  if (!pixelId || !window.fbq) return
  const command = name === 'ViewContent' || name === 'InitiateCheckout' ? 'track' : 'trackCustom'
  window.fbq(command, name, options)
}