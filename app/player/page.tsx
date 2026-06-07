'use client'
import { useEffect, useRef } from 'react';

export default function PlayerPage() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Shoutcast richiede di evitare il precaricamento pesante
    audio.preload = "none";

    const recover = () => {
      console.log("Tentativo di recupero stream...");
      audio.load();
      audio.play().catch(() => {});
    };

    // Monitoraggio aggressivo: se si blocca, ricarica
    const interval = setInterval(() => {
      if (audio.paused || audio.ended) {
        recover();
      }
    }, 5000);

    audio.addEventListener('error', recover);

    return () => {
      clearInterval(interval);
      audio.removeEventListener('error', recover);
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2 style={{ color: '#ff4444' }}>Radio Eddie</h2>
      <audio 
        ref={audioRef}
        controls 
        autoPlay 
        style={{ width: '100%', maxWidth: '400px', marginTop: '20px' }}
      >
        {/* Usiamo ;/; per segnalare al server che è uno stream Shoutcast */}
        <source src="http://srv1.goodsoundstream.com:3153/;" type="audio/mpeg" />
      </audio>
    </div>
  )
}