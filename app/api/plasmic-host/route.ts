/**
 * Plasmic app host endpoint.
 * In Plasmic Studio: Settings → Host URL → http://localhost:3000/api/plasmic-host
 */
import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json({ status: 'ok', host: process.env.NEXT_PUBLIC_SITE_URL })
}
