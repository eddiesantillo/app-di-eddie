'use client';
import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function BioPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const docRef = doc(db, "content", "Eddie Santillo");
    getDoc(docRef).then(snap => {
      if (snap.exists()) {
        setData(snap.data());
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{padding: '40px', color: '#fff'}}>Caricamento in corso...</div>;
  if (!data) return <div style={{padding: '40px', color: '#fff'}}>Errore: dati non trovati nel database.</div>;

  // CORREZIONE: usiamo data.bio invece di data.sezioni
  const bio = data.bio || [];

  return (
    <main style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', color: '#fff', background: '#000', minHeight: '100vh' }}>
      {/* Pulsante per tornare al sito pubblico */}
      <div style={{ marginBottom: '20px' }}>
        <a href="/" style={{ 
          color: '#fff', 
          textDecoration: 'none', 
          fontSize: '1rem',
          padding: '10px',
          border: '1px solid #fff',
          display: 'inline-block'
        }}>
          ← Torna alla Home
        </a>
      </div>

      {bio.length > 0 ? (
        bio.map((s: any, i: number) => (
          <section key={i} style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              borderBottom: '2px solid #ff0000', 
              paddingBottom: '10px',
              fontSize: '1.8rem',
              marginBottom: '20px'
            }}>
              {s.titolo}
            </h2>
            <p style={{ lineHeight: '1.8', fontSize: '1.2rem', whiteSpace: 'pre-wrap' }}>
              {s.testo}
            </p>
          </section>
        ))
      ) : (
        <p>Nessuna biografia trovata nel database. Aggiungila dalla pagina /admin.</p>
      )}
    </main>
  );
}