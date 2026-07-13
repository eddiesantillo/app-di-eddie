'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function PlayerPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [trackInfo, setTrackInfo] = useState({ title: 'Radio in diretta', artist: 'Eddie Santillo' });
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const audioSource = "https://artemis.streamerr.co/listen/eddie_santillo/radio.mp3";

  // Funzione per caricare i metadati tramite il nostro proxy interno
  const fetchMetadata = async () => {
    try {
      const response = await fetch('/api/metadata');
      if (!response.ok) throw new Error('API non raggiungibile');
      
      const data = await response.json();
      
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

  // Gestione riproduzione con controllo Promise per evitare AbortError
  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (err) {
        console.error("Errore di riproduzione:", err);
      }
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
          marginBottom: '20px' 
        }}
      >
        <img src="/play-btn.png" alt="Play Radio" style={{ width: '300px', height: 'auto' }} />
      </div>

      {/* Controllo Volume - Utilizza la classe personalizzata definita in globals.css */}
      <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span>🔈</span>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.05" 
          value={volume} 
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            setVolume(v);
            if (audioRef.current) audioRef.current.volume = v;
          }}
          className="custom-volume-slider"
          style={{ width: '150px', cursor: 'pointer' }}
        />
        <span>🔊</span>
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