import Link from 'next/link';
import { New_Rocker } from 'next/font/google';

const newRocker = New_Rocker({ weight: '400', subsets: ['latin'] });

export default function Home() {
  return (
    <main style={{ 
      display: 'flex', flexDirection: 'column', alignItems: 'center', 
      minHeight: '100vh', background: '#000', padding: '20px', textAlign: 'center' 
    }}>
      
      {/* Testo rimpicciolito e più bilanciato */}
      <p className={newRocker.className} style={{ 
        fontSize: '1.4rem', 
        color: '#dca355', 
        marginBottom: '25px', 
        textTransform: 'uppercase',
        letterSpacing: '1px',
        textShadow: '2px 2px 0px #000',
        maxWidth: '600px',
        padding: '0 10px'
      }}>
        Dalle radici del blues alle vette dell'hard rock:<br/>
        un viaggio live tra grandi classici e nuove storie.
      </p>

      {/* Immagine */}
      <img src="/eddie.jpeg" alt="Eddie" style={{ 
        width: '100%', 
        maxWidth: '380px', 
        borderRadius: '15px', 
        border: '2px solid #dca355', 
        marginBottom: '30px' 
      }} />

      {/* Griglia Icone */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', maxWidth: '380px', width: '100%' }}>
        <Link href="/biografia"><img src="/bio.jpeg" alt="Bio" style={iconStyle} /></Link>
        <Link href="/appuntamenti"><img src="/appuntamenti.jpeg" alt="Eventi" style={iconStyle} /></Link>
        <Link href="/player"><img src="/radio.jpeg" alt="Radio" style={iconStyle} /></Link>
        <Link href="/social"><img src="/social.jpeg" alt="Social" style={iconStyle} /></Link>
        <Link href="/music-shop" style={{ gridColumn: 'span 2' }}>
          <img src="/music_shop.jpeg" alt="Shop" style={{...iconStyle, maxWidth: '180px', margin: '0 auto'}} />
        </Link>
      </div>
    </main>
  );
}

const iconStyle = { width: '100%', height: 'auto', borderRadius: '12px', display: 'block' };