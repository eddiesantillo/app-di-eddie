'use client'
import { useEffect, useRef } from 'react';

export default function PlayerPage() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Il browser blocca il mixed-content, ma a volte il tag <audio> 
    // permette di forzare la sorgente se non è gestita tramite fetch
    if (audioRef.current) {
      audioRef.current.src = "http://srv1.goodsoundstream.com:3153/;";
      audioRef.current.load();
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h2 style={{ color: '#ff4444' }}>Radio Eddie</h2>
      <audio 
        ref={audioRef}
        controls 
        autoPlay 
        // L'attributo crossOrigin "anonymous" aiuta a gestire le chiamate Shoutcast
        crossOrigin="anonymous"
        style={{ width: '300px' }}
      />
      <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
        Se non parte, clicca sul tasto 'Play'
      </p>
    </div>
  )
}