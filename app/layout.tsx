import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { SanityLive } from '@/sanity/lib/live'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })

export const metadata: Metadata = {
  title: { default: 'Clarity Health', template: '%s | Clarity Health' },
  description: 'Evidence-based virtual mental health care — anxiety, depression, eating disorders, and trauma support.',
  openGraph: {
    siteName: 'Clarity Health',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-gray-900">
        {children}
        <SanityLive />
      </body>
    </html>
  )
}
