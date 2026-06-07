export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Benvenuti nel sito ufficiale di Eddie Santillo</h1>
      <p>Il rocker che spacca, tra realtà e metaverso.</p>
      
      <div style={{ marginTop: '40px' }}>
        <nav style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <a href="/bio" style={{ color: '#ff4444', fontSize: '1.2rem' }}>Biografia</a>
          <a href="/events" style={{ color: '#ff4444', fontSize: '1.2rem' }}>Appuntamenti</a>
          <a href="/player" style={{ color: '#ff4444', fontSize: '1.2rem' }}>Radio</a>
        </nav>
      </div>
    </div>
  )
}