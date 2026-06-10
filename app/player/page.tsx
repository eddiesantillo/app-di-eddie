'use client';
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function PlayerPage() {
  const [loading, setLoading] = useState(true);
  const [streamUrl, setStreamUrl] = useState('');

  useEffect(() => {
    const fetchRadio = async () => {
      try {
        const snap = await getDoc(doc(db, "content", "Eddie Santillo"));
        if (snap.exists()) {
          setStreamUrl(snap.data().radio.url);
        }
      } catch (error) {
        console.error("Errore nel caricamento dello stream:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRadio();
  }, []);

  if (loading) return <div style={{ color: '#fff', textAlign: 'center', marginTop: '50px' }}>Caricamento Radio...</div>;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      width: '100%',
      background: '#111'
    }}>
      <h2 style={{ color: '#ff4444', marginBottom: '20px' }}>Radio Eddie</h2>
      
      {streamUrl ? (
        <audio 
          controls 
          autoPlay 
          style={{ width: '300px' }}
        >
          {/* Usiamo l'URL che arriva da Firebase tramite il tuo proxy */}
          <source src={`/api/stream?url=${encodeURIComponent(streamUrl)}`} type="audio/mpeg" />
          Il tuo browser non supporta lo streaming.
        </audio>
      ) : (
        <p style={{ color: '#fff' }}>URL non configurato.</p>
      )}
    </div>
  )
}