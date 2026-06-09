'use client';
import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function BioPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoc(doc(db, "content", "bio")).then(snap => {
      if (snap.exists()) setData(snap.data());
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Caricamento...</div>;
  // Qui controlliamo che 'sezioni' esista
  if (!data || !data.sezioni) return <div>Nessun contenuto trovato.</div>;

  return (
    <main style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', color: '#fff', background: '#000' }}>
      {data.sezioni.map((s: any, i: number) => (
        <section key={i} style={{ marginBottom: '40px' }}>
          <h2 style={{ borderBottom: '2px solid #ff0000', paddingBottom: '10px' }}>{s.titolo}</h2>
          <p style={{ lineHeight: '1.8', fontSize: '1.2rem' }}>{s.testo}</p>
        </section>
      ))}
    </main>
  );
}