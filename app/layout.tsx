'use client';
import './globals.css';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  // Logica forzata: se siamo esattamente in '/' allora è Home.
  const isHome = pathname === '/';

  return (
    <html lang="it">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1a1a1a" />
      </head>
      <body style={{ backgroundColor: '#1a1a1a', color: '#ffffff', fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
        
        {/* Mostra header solo se NON è la home */}
        {!isHome && (
          <header style={{ padding: '40px 20px', textAlign: 'center' }}>
            <img 
              src="/logo.png" 
              alt="Logo Eddie Santillo" 
              style={{ width: '150px', display: 'block', margin: '0 auto' }} 
            />
            <h1 style={{ marginTop: '25px', fontSize: '2rem' }}>Eddie Santillo</h1>
          </header>
        )}

        <main style={{ maxWidth: '800px', margin: '0 auto' }}>
          {children}
        </main>
        
        <footer style={{ marginTop: '50px', textAlign: 'center', fontSize: '0.8rem', opacity: 0.6 }}>
          <p>© {new Date().getFullYear()} Eddie Santillo. Tutti i diritti riservati.</p>
        </footer>
      </body>
    </html>
  )
}