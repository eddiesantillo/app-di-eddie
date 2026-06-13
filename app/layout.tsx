'use client';
import './globals.css';
import { usePathname } from 'next/navigation';
import InstallBanner from './components/InstallBanner'; // 1. AGGIUNGI QUESTO IMPORT

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isHome = pathname === '/';
  const isSocialPage = pathname === '/social';
  const showHeader = !isHome && !isSocialPage;

  return (
    <html lang="it">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1a1a1a" />
      </head>
      <body style={{ backgroundColor: '#1a1a1a', color: '#ffffff', fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
        
        <InstallBanner /> {/* 2. AGGIUNGI QUESTO QUI */}
        
        {showHeader && (
          <header style={{ padding: '40px 20px', textAlign: 'center' }}>
            <img src="/logo.png" alt="Logo Eddie Santillo" style={{ width: '150px', display: 'block', margin: '0 auto' }} />
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