import Link from 'next/link';
import { New_Rocker } from 'next/font/google';

const newRocker = New_Rocker({ weight: '400', subsets: ['latin'] });

export default function Home() {
  const iconStyle = { 
    width: '100%', 
    height: 'auto', 
    aspectRatio: '1/1', 
    objectFit: 'contain' as const, 
    borderRadius: '12px', 
    display: 'block' 
  };

  return (
    <main style={{ 
      display: 'flex', flexDirection: 'column', alignItems: 'center', 
      minHeight: '100vh', background: '#000', color: '#fff',
      padding: '20px', textAlign: 'center'
    }}>
      
      {/* Testo in stile AC/DC, ridotto */}
      <p className={newRocker.className} style={{ 
        fontSize: '1rem', 
        color: '#dca355', 
        marginBottom: '20px', 
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        textShadow: '1px 1px 0px #000',
        maxWidth: '400px',
        lineHeight: '1.4'
      }}>
        Dalle radici del blues alle vette dell'hard rock:<br/>
        un viaggio live tra grandi classici e nuove storie.
      </p>

      {/* Immagine */}
      <div style={{ marginBottom: '25px', width: '100%', maxWidth: '350px' }}>
        <img 
          src="/eddie.jpeg" 
          alt="Eddie Santillo" 
          style={{ 
            width: '100%', 
            borderRadius: '12px', 
            border: '2px solid #dca355' 
          }} 
        />
      </div>

      {/* Griglia Icone */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '12px', 
        width: '100%', 
        maxWidth: '350px' 
      }}>
        <Link href="/biografia"><img src="/bio.jpeg" alt="Biografia" style={iconStyle} /></Link>
        <Link href="/appuntamenti"><img src="/appuntamenti.jpeg" alt="Appuntamenti" style={iconStyle} /></Link>
        <Link href="/player"><img src="/radio.jpeg" alt="Radio" style={iconStyle} /></Link>
        <Link href="/social"><img src="/social.jpeg" alt="Social" style={iconStyle} /></Link>
        <Link href="/music-shop" style={{ gridColumn: 'span 2' }}>
          <img src="/music_shop.jpeg" alt="Music Shop" style={{...iconStyle, maxWidth: '170px', margin: '0 auto'}} />
        </Link>
      </div>
    </main>
  );
}