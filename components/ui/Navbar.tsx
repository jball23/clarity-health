'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV_LINKS = [
  { label: 'Programs', href: '/programs' },
  { label: 'Our Team', href: '/team' },
  { label: 'Resources', href: '/blog' },
  { label: 'About', href: '/about' },
]

export function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-lg bg-[#007F79]" />
          <span className="text-lg font-bold tracking-tight text-gray-900">
            Clarity<span className="text-[#007F79]">Health</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname?.startsWith(link.href)
            return (
              <Link key={link.href} href={link.href} className="relative text-sm font-medium text-gray-600 hover:text-gray-900">
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-[#007F79]"
                  />
                )}
              </Link>
            )
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Log in
          </Link>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/get-started"
              className="rounded-full bg-[#007F79] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#005F5A]"
            >
              Get Started
            </Link>
          </motion.div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="Toggle menu"
        >
          <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} className="block h-0.5 w-5 bg-gray-700" />
          <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block h-0.5 w-5 bg-gray-700" />
          <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} className="block h-0.5 w-5 bg-gray-700" />
        </button>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: menuOpen ? 'auto' : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden border-t border-gray-100 md:hidden"
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/get-started"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-full bg-[#007F79] px-5 py-2.5 text-center text-sm font-semibold text-white"
          >
            Get Started
          </Link>
        </div>
      </motion.div>
    </header>
  )
}
