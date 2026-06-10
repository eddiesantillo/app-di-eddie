'use client';
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function PlayerPage() {
  const [streamUrl, setStreamUrl] = useState('');

  useEffect(() => {
    const fetchRadio = async () => {
      const snap = await getDoc(doc(db, "content", "Eddie Santillo"));
      if (snap.exists()) {
        // Legge direttamente il link dal database
        setStreamUrl(snap.data().radio.url);
      }
    };
    fetchRadio();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#111' }}>
      <h2 style={{ color: '#ff4444', marginBottom: '20px' }}>Radio Eddie</h2>
      
      {streamUrl ? (
        <audio controls autoPlay style={{ width: '300px' }}>
          {/* Puntiamo direttamente all'URL, senza passare dall'API proxy */}
          <source src={streamUrl} type="audio/mpeg" />
          Il tuo browser non supporta lo streaming.
        </audio>
      ) : (
        <p style={{ color: '#fff' }}>Caricamento streaming...</p>
      )}
    </div>
  )
}