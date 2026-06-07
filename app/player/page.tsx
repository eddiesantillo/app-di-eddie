'use client'
import { useEffect, useRef } from 'react';

export default function PlayerPage() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Aggiungiamo un listener per vedere cosa succede davvero
    audio.addEventListener('error', (e) => {
      console.error("Errore del player rilevato:", e);
      alert("Il browser sta bloccando lo stream. Controlla la console (F12) per l'errore esatto.");
    });

    audio.src = "http://srv1.goodsoundstream.com:3153/;";
    audio.load();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h2 style={{ color: '#ff4444' }}>Radio Eddie</h2>
      <audio 
        ref={audioRef}
        controls 
        autoPlay
        style={{ width: '300px', cursor: 'pointer' }}
      />
    </div>
  )
}
//prova