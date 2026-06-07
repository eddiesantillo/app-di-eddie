export default function PlayerPage() {
    return (
      <div style={{ 
        textAlign: 'center', 
        marginTop: '50px', 
        color: '#ffffff',
        fontFamily: 'Arial, sans-serif' 
      }}>
        <h2 style={{ color: '#ff4444', fontSize: '2rem' }}>Radio Eddie</h2>
        <p style={{ opacity: 0.8 }}>Streaming in diretta</p>
        
        <div style={{ 
          marginTop: '40px', 
          padding: '30px', 
          backgroundColor: '#1a1a1a', 
          borderRadius: '15px',
          border: '1px solid #333',
          maxWidth: '400px',
          margin: '40px auto'
        }}>
          {/* Player audio configurato per il proxy */}
          <audio controls style={{ width: '100%' }}>
            <source src="/api/stream" type="audio/mpeg" />
            Il tuo browser non supporta lo streaming audio.
          </audio>
          
          <p style={{ fontSize: '0.85rem', marginTop: '15px', opacity: 0.6 }}>
            Premi play per ascoltare il flusso in diretta
          </p>
        </div>
  
        <div style={{ marginTop: '30px' }}>
          <a href="/" style={{ color: '#ff4444', textDecoration: 'underline' }}>
            Torna alla Home
          </a>
        </div>
      </div>
    )
  }