'use client'
import { useEffect, useRef } from 'react';

export default function PlayerPage() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Forza il caricamento al mount
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '80vh', 
      textAlign: 'center' 
    }}>
      <h2 style={{ color: '#ff4444', marginBottom: '20px' }}>Radio Eddie</h2>
      <audio 
        ref={audioRef}
        controls 
        autoPlay 
        style={{ width: '80%', maxWidth: '400px' }}
      >
        <source src="http://srv1.goodsoundstream.com:3153/;" type="audio/mpeg" />
      </audio>
    </div>
  )
}