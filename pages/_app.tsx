// pages/_app.tsx
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@/components/theme-provider'
import '@/app/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}