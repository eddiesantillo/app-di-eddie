'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

export default function PlayerPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Link del tuo stream radio
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
      
      {/* Immagine cliccabile */}
      <div 
        onClick={togglePlay}
        style={{
          width: '100%',
          maxWidth: '400px',
          cursor: 'pointer',
          transition: 'transform 0.2s',
          transform: isPlaying ? 'scale(0.95)' : 'scale(1)',
          display: 'flex',
          justifyContent: 'center'
        }}
        title={isPlaying ? "Pausa" : "Play"}
      >
        <img 
          src="/play-btn.png" 
          alt="Play Radio" 
          style={{ width: '100%', height: 'auto', display: 'block' }} 
        />
      </div>

      {/* Audio element nascosto */}
      <audio 
        ref={audioRef} 
        src={audioSource} 
        onEnded={() => setIsPlaying(false)}
      />

      {/* Link di navigazione semplice */}
      <Link href="/" style={{ 
        marginTop: '50px', 
        color: '#dca355', 
        textDecoration: 'none', 
        fontSize: '1.2rem'
      }}>
        Indietro
      </Link>
    </main>
  );
}