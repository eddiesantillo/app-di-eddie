'use client';
import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function BioPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Puntiamo al documento esatto che hai creato in Firebase
    const docRef = doc(db, "content", "Eddie Santillo");
    
    getDoc(docRef).then(snap => {
      if (snap.exists()) {
        setData(snap.data());
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Caricamento in corso...</div>;
  if (!data) return <div>Errore: dati non trovati nel database.</div>;

  const sezioni = data.sezioni || [];

  return (
    <main style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', color: '#fff', background: '#000' }}>
      {sezioni.length > 0 ? (
        sezioni.map((s: any, i: number) => (
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
        <p>Nessuna sezione trovata nel documento.</p>
      )}
    </main>
  );
}