import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body style={{ backgroundColor: '#1a1a1a', color: '#ffffff', fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
        
        {/* Intestazione con logo e tocco di rosso */}
        <header style={{ padding: '40px 20px', textAlign: 'center' }}>
          <div style={{ 
            display: 'inline-block', 
            padding: '10px', 
            borderRadius: '50%', 
            boxShadow: '0 0 30px rgba(255, 0, 0, 0.4)' 
          }}>
            <img 
              src="/logo.png" 
              alt="Logo Eddie Santillo" 
              style={{ width: '150px', display: 'block', borderRadius: '50%' }} 
            />
          </div>
          <h1 style={{ marginTop: '20px', fontSize: '2rem', letterSpacing: '2px' }}>Eddie Santillo</h1>
        </header>

        {/* Contenuto principale */}
        <main style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
          {children}
        </main>
        
        {/* Footer opzionale */}
        <footer style={{ marginTop: '50px', textAlign: 'center', fontSize: '0.8rem', opacity: 0.6 }}>
          <p>© {new Date().getFullYear()} Eddie Santillo. Tutti i diritti riservati.</p>
        </footer>

      </body>
    </html>
  )
}