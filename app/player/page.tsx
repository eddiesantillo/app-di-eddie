'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function PlayerPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  // Valori iniziali per evitare caricamenti infiniti
  const [trackInfo, setTrackInfo] = useState({ title: 'Radio in diretta', artist: 'Eddie Santillo' });
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const audioSource = "https://artemis.streamerr.co/listen/eddie_santillo/radio.mp3";
  const apiSource = "https://artemis.streamerr.co/api/nowplaying/eddie_santillo";

  const fetchMetadata = async () => {
    try {
      // Usiamo un controller per evitare che la chiamata blocchi la pagina
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(apiSource, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (!response.ok) throw new Error('API non raggiungibile');
      
      const data = await response.json();
      
      // Estrazione sicura con optional chaining
      setTrackInfo({
        title: data.now_playing?.song?.title || "Radio in diretta",
        artist: data.now_playing?.song?.artist || "Eddie Santillo"
      });
    } catch (error) {
      console.warn("Metadati non disponibili, uso fallback", error);
    }
  };

  useEffect(() => {
    fetchMetadata();
    const interval = setInterval(fetchMetadata, 15000);
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
      
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ margin: '0', fontSize: '1.5rem', color: '#dca355' }}>{trackInfo.title}</h2>
        <p style={{ margin: '5px 0', fontSize: '1rem', opacity: 0.8 }}>{trackInfo.artist}</p>
      </div>

      <div 
        onClick={togglePlay} 
        style={{ 
          cursor: 'pointer', transition: 'transform 0.2s', 
          transform: isPlaying ? 'scale(0.95)' : 'scale(1)', 
          marginBottom: '40px' 
        }}
      >
        <img src="/play-btn.png" alt="Play Radio" style={{ width: '300px', height: 'auto' }} />
      </div>

      <audio 
        ref={audioRef} 
        src={audioSource} 
        onEnded={() => setIsPlaying(false)}
      />

      <Link href="/" style={{ color: '#dca355', fontSize: '1.2rem', textDecoration: 'none' }}>
        Indietro
      </Link>
    </main>
  );
}