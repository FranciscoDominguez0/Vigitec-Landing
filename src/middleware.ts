import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Intentar obtener la IP real del usuario
  const ip = 
    request.headers.get('x-forwarded-for')?.split(',')[0] ?? 
    request.headers.get('x-real-ip') ?? 
    'unknown'
  
  const method = request.method
  const url = request.nextUrl.pathname

  // Imprimir el registro en la consola (Docker capturará esto en sus logs)
  console.log(`[${new Date().toISOString()}] ${method} ${url} - IP: ${ip} - User-Agent: ${request.headers.get('user-agent') || 'unknown'}`)

  return NextResponse.next()
}

// Configurar en qué rutas se ejecutará este middleware
export const config = {
  matcher: [
    /*
     * Coincidir con todas las rutas excepto:
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico, sitemap.xml, robots.txt (metadatos)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
