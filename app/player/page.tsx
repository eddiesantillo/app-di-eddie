'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function PlayerPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackInfo, setTrackInfo] = useState({ title: 'Caricamento...', artist: 'Eddie Santillo' });
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const audioSource = "https://artemis.streamerr.co/listen/eddie_santillo/radio.mp3";
  const apiSource = "https://artemis.streamerr.co/api/nowplaying/eddie_santillo";

  const fetchMetadata = async () => {
    try {
      const response = await fetch(apiSource);
      const data = await response.json();
      
      // Estraiamo i campi corretti dal tuo JSON
      setTrackInfo({
        title: data.now_playing.song.title || "In onda",
        artist: data.now_playing.song.artist || "Eddie Santillo"
      });
    } catch (error) {
      console.error("Errore nel recupero metadati", error);
    }
  };

  useEffect(() => {
    fetchMetadata();
    const interval = setInterval(fetchMetadata, 15000); // Aggiorna ogni 15 secondi
    return () => clearInterval(interval);
  }, []);

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
      width: '100%', minHeight: '100vh', backgroundColor: '#000',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '20px', color: '#fff', textAlign: 'center'
    }}>
      
      {/* Visualizzazione Titolo e Autore */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ margin: '0', fontSize: '1.8rem', color: '#dca355' }}>{trackInfo.title}</h2>
        <p style={{ margin: '10px 0', fontSize: '1.2rem', opacity: 0.9 }}>{trackInfo.artist}</p>
      </div>

      {/* Pulsante Play/Pause */}
      <div 
        onClick={togglePlay}
        style={{
          cursor: 'pointer', transition: 'transform 0.2s',
          transform: isPlaying ? 'scale(0.95)' : 'scale(1)',
          marginBottom: '40px'
        }}
      >
        <img src="/play-btn.png" alt="Play" style={{ width: '300px', height: 'auto' }} />
      </div>

      <audio ref={audioRef} src={audioSource} />

      <Link href="/" style={{ color: '#dca355', fontSize: '1.2rem', textDecoration: 'none' }}>Indietro</Link>
    </main>
  );
}