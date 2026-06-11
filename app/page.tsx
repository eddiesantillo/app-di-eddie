import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ 
      display: 'flex', flexDirection: 'column', alignItems: 'center', 
      justifyContent: 'center', minHeight: '100vh', background: '#111', color: '#fff',
      padding: '20px'
    }}>
      <h1 style={{ marginBottom: '40px' }}>Eddie Santillo</h1>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        
        {/* Pulsante Biografia */}
        <Link href="/biografia">
          <img 
            src="/bio.jpeg" 
            alt="Biografia" 
            style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '10px', display: 'block' }} 
          />
        </Link>

        {/* Pulsante Appuntamenti */}
        <Link href="/appuntamenti">
          <img 
            src="/appuntamenti.jpeg" 
            alt="Appuntamenti" 
            style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '10px', display: 'block' }} 
          />
        </Link>

        {/* Pulsante Radio */}
        <Link href="/player">
          <img 
            src="/radio.jpeg" 
            alt="Radio" 
            style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '10px', display: 'block' }} 
          />
        </Link>

      </div>
    </main>
  );
}