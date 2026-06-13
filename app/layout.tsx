import './globals.css';
import InstallBanner from './components/InstallBanner';
import HeaderWrapper from './components/HeaderWrapper'; // Nuovo componente

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1a1a1a" />
      </head>
      <body style={{ backgroundColor: '#1a1a1a', color: '#ffffff', fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
        <InstallBanner />
        <HeaderWrapper />
        <main style={{ maxWidth: '800px', margin: '0 auto' }}>
          {children}
        </main>
        <footer style={{ marginTop: '50px', textAlign: 'center', fontSize: '0.8rem', opacity: 0.6 }}>
          <p>© {new Date().getFullYear()} Eddie Santillo. Tutti i diritti riservati.</p>
        </footer>
      </body>
    </html>
  );
}