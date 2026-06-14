'use client';
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function ContattiPage() {
  const [contatti, setContatti] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, "content", "Eddie Santillo"));
      if (snap.exists() && snap.data().contatti) {
        setContatti(snap.data().contatti);
      }
    };
    fetchData();
  }, []);

  return (
    <main style={{ padding: '40px 20px', color: '#fff', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '30px' }}>CONTATTI</h1>
      <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '12px' }}>
        {contatti.map((c: any, i: number) => (
          <p key={i} style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
            <strong>{c.titolo}:</strong> {c.valore}
          </p>
        ))}
      </div>
    </main>
  );
}