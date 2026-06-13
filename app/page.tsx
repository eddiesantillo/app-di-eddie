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
      
      <p className={newRocker.className} style={{ 
        fontSize: '0.9rem', 
        color: '#dca355', 
        marginBottom: '15px', 
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        textShadow: '1px 1px 0px #000',
        maxWidth: '300px',
        lineHeight: '1.3'
      }}>
        Dalle radici del blues alle vette dell'hard rock:<br/>
        un viaggio live tra grandi classici e nuove storie.
      </p>

      <div style={{ marginBottom: '20px', width: '100%', maxWidth: '300px' }}>
        <img 
          src="/eddy.png" 
          alt="Eddie Santillo" 
          style={{ 
            width: '100%', 
            borderRadius: '10px',
            display: 'block'
          }} 
        />
      </div>

      {/* Griglia Icone Aggiornata con FOTO */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '10px', 
        width: '100%', 
        maxWidth: '300px' 
      }}>
        <Link href="/biografia"><img src="/bio.jpeg" alt="Biografia" style={iconStyle} /></Link>
        <Link href="/appuntamenti"><img src="/appuntamenti.jpeg" alt="Appuntamenti" style={iconStyle} /></Link>
        <Link href="/player"><img src="/radio.jpeg" alt="Radio" style={iconStyle} /></Link>
        <Link href="/social"><img src="/social.jpeg" alt="Social" style={iconStyle} /></Link>
        
        {/* Pulsante FOTO aggiunto correttamente in griglia */}
        <Link href="/foto"><img src="/gallery.jpeg" alt="Foto" style={iconStyle} /></Link>
        
        <Link href="/music-shop"><img src="/music_shop.jpeg" alt="Music Shop" style={iconStyle} /></Link>
      </div>

      {/* //prova */}
    </main>
  );
}