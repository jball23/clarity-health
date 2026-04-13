import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      {/* CTA band */}
      <div className="bg-[#007F79] px-6 py-16 text-center text-white">
        <h2 className="text-2xl font-bold md:text-3xl">Ready to start your recovery journey?</h2>
        <p className="mx-auto mt-3 max-w-md text-white/75">
          Connect with a licensed clinician within 48 hours. In-network with most major insurers.
        </p>
        <Link
          href="/get-started"
          className="mt-7 inline-block rounded-full bg-[#FFC52E] px-8 py-3 text-sm font-semibold text-gray-900 hover:bg-[#FFD45E]"
        >
          Get Started Today
        </Link>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-md bg-[#007F79]" />
              <span className="font-bold text-gray-900">ClarityHealth</span>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Evidence-based virtual mental health care, built around you.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Programs</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {['Anxiety & Depression', 'Eating Disorders', 'Trauma & PTSD', 'OCD Support'].map((l) => (
                <li key={l}><Link href="/programs" className="hover:text-[#007F79]">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {[['About', '/about'], ['Our Team', '/team'], ['Blog', '/blog'], ['Careers', '/careers']].map(([l, h]) => (
                <li key={l}><Link href={h} className="hover:text-[#007F79]">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {[['Privacy Policy', '/privacy'], ['Terms of Use', '/terms'], ['HIPAA Notice', '/hipaa']].map(([l, h]) => (
                <li key={l}><Link href={h} className="hover:text-[#007F79]">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Clarity Health, Inc. All rights reserved. This is a demo project.
        </div>
      </div>
    </footer>
  )
}
