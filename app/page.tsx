import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main style={{ 
      display: 'flex', flexDirection: 'column', alignItems: 'center', 
      justifyContent: 'center', height: '100vh', background: '#111', color: '#fff' 
    }}>
      <h1 style={{ marginBottom: '40px' }}>Eddie Santillo</h1>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        
        {/* Pulsante Bio (Testuale per ora) */}
        <Link href="/biografia" style={{ color: '#ff4444', fontSize: '20px', textDecoration: 'none' }}>
          Biografia
        </Link>

        {/* Pulsante Appuntamenti (Testuale per ora) */}
        <Link href="/appuntamenti" style={{ color: '#ff4444', fontSize: '20px', textDecoration: 'none' }}>
          Appuntamenti
        </Link>

        {/* Pulsante Radio con Immagine */}
        <Link href="/player">
          <Image 
            src="/radio.jpeg" 
            alt="Radio" 
            width={200} 
            height={100} 
            style={{ cursor: 'pointer', borderRadius: '10px' }} 
          />
        </Link>

      </div>
    </main>
  );
}