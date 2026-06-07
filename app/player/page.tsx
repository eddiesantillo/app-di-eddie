'use client'

export default function PlayerPage() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      width: '100%' 
    }}>
      <h2 style={{ color: '#ff4444', marginBottom: '20px' }}>Radio Eddie</h2>
      
      <audio 
        controls 
        autoPlay 
        style={{ width: '300px' }}
      >
        {/* Usiamo il percorso corretto basato sul tuo file */}
        <source src="/api/stream" type="audio/mpeg" />
        Il tuo browser non supporta lo streaming.
      </audio>
    </div>
  )
}