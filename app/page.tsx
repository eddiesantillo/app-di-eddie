import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ 
      display: 'flex', flexDirection: 'column', alignItems: 'center', 
      justifyContent: 'center', minHeight: '100vh', background: '#111', color: '#fff',
      padding: '20px'
    }}>
      
      {/* Container principale con tutti i pulsanti - Aggiunto marginTop per bilanciare lo spazio */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginTop: '40px' }}>
        
        {/* Pulsante Biografia */}
        <Link href="/biografia">
          <img src="/bio.jpeg" alt="Biografia" style={{ width: '150px', height: '150px', objectFit: 'contain', borderRadius: '10px', display: 'block' }} />
        </Link>

        {/* Pulsante Appuntamenti */}
        <Link href="/appuntamenti">
          <img src="/appuntamenti.jpeg" alt="Appuntamenti" style={{ width: '150px', height: '150px', objectFit: 'contain', borderRadius: '10px', display: 'block' }} />
        </Link>

        {/* Pulsante Radio */}
        <Link href="/player">
          <img src="/radio.jpeg" alt="Radio" style={{ width: '150px', height: '150px', objectFit: 'contain', borderRadius: '10px', display: 'block' }} />
        </Link>

        {/* Pulsante Social */}
        <Link href="/social">
          <img src="/social.jpeg" alt="Social" style={{ width: '150px', height: '150px', objectFit: 'contain', borderRadius: '10px', display: 'block' }} />
        </Link>

        {/* Pulsante Music Shop */}
        <Link href="/music-shop">
          <img src="/music_shop.jpeg" alt="Music Shop" style={{ width: '150px', height: '150px', objectFit: 'contain', borderRadius: '10px', display: 'block' }} />
        </Link>

      </div>
    </main>
  );
}