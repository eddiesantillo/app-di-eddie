import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1a1a1a" />
      </head>
      <body style={{ backgroundColor: '#1a1a1a', color: '#ffffff', fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
        
        {/* Intestazione con logo e tocco di rosso */}
        <header style={{ padding: '40px 20px', textAlign: 'center' }}>
          <img 
            src="/logo.png" 
            alt="Logo Eddie Santillo" 
            style={{ 
              width: '150px', 
              display: 'block', 
              margin: '0 auto',
              filter: 'drop-shadow(0 0 15px rgba(255, 0, 0, 0.5))' 
            }} 
          />
          <h1 style={{ marginTop: '25px', fontSize: '2rem', letterSpacing: '2px' }}>Eddie Santillo</h1>
        </header>

        {/* Contenuto principale */}
        <main style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
          {children}
        </main>
        
        {/* Footer */}
        <footer style={{ marginTop: '50px', textAlign: 'center', fontSize: '0.8rem', opacity: 0.6 }}>
          <p>© {new Date().getFullYear()} Eddie Santillo. Tutti i diritti riservati.</p>
        </footer>

      </body>
    </html>
  )
}