'use client';
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function RepertorioPage() {
  const [repertorio, setRepertorio] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, "content", "Eddie Santillo"));
      if (snap.exists()) {
        setRepertorio(snap.data().repertorio || "Repertorio non ancora disponibile.");
      }
    };
    fetchData();
  }, []);

  return (
    <main style={{ padding: '40px', color: '#fff', maxWidth: '800px', margin: '0 auto', whiteSpace: 'pre-wrap' }}>
      <h1>Il Mio Repertorio</h1>
      <div style={{ marginTop: '20px', fontSize: '1.1em', lineHeight: '1.6' }}>
        {repertorio}
      </div>
    </main>
  );
}