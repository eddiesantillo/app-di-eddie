import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body style={{ backgroundColor: '#1a1a1a', color: '#ffffff', fontFamily: 'sans-serif' }}>
        <header style={{ padding: '20px', textAlign: 'center' }}>
          <img 
            src="/logo.png" 
            alt="Logo Eddie Santillo" 
            style={{ width: '150px', margin: 'auto', display: 'block' }} 
          />
          <h1 style={{ marginTop: '10px' }}>Eddie Santillo</h1>
        </header>

        <main style={{ padding: '20px' }}>
          {children}
        </main>
      </body>
    </html>
  )
}