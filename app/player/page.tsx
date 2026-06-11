'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';

export default function PlayerPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Link corretto alla tua radio
  const audioSource = "https://artemis.streamerr.co/listen/eddie_santillo/radio.mp3";

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <main style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      
      {/* Container per l'immagine */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '900px' }}>
        
        {/* L'immagine visibile */}
        <img 
          src="/radio-bg.png" 
          alt="Radio Steampunk" 
          style={{ width: '100%', height: 'auto', display: 'block' }} 
        />

        {/* PULSANTE PLAY INVISIBILE */}
        <div 
          onClick={togglePlay}
          style={{
            position: 'absolute',
            top: '58%', 
            left: '50%',
            width: '15%',
            height: '25%',
            transform: 'translate(-50%, -50%)',
            cursor: 'pointer',
            zIndex: 20
          }}
          title={isPlaying ? "Pausa" : "Play"}
        />

        <audio 
          ref={audioRef} 
          src={audioSource} 
          onEnded={() => setIsPlaying(false)}
        />
      </div>

      <Link href="/" style={{ 
        marginTop: '30px', 
        color: '#dca355', 
        textDecoration: 'none', 
        fontSize: '1.2rem',
        border: '1px solid #dca355',
        padding: '10px 20px'
      }}>
        ← ESCI DALL'OFFICINA
      </Link>
    </main>
  );
}