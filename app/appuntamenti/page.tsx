'use client';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function Appuntamenti() {
  const [concerti, setConcerti] = useState([]);

  useEffect(() => {
    const fetchConcerti = async () => {
      const snap = await getDoc(doc(db, "content", "Eddie Santillo"));
      if (snap.exists()) {
        const c = snap.data().calendario || [];
        setConcerti(c.sort((a: any, b: any) => new Date(a.start).getTime() - new Date(b.start).getTime()));
      }
    };
    fetchConcerti();
  }, []);

  return (
    <div style={{ padding: '20px', color: '#fff', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#dca355', textTransform: 'uppercase' }}>Prossimi Live</h2>
      {concerti.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '40px' }}>Nessun concerto in programma al momento.</p>
      ) : (
        concerti.map((c: any, index) => (
          <div key={index} style={{ background: '#1a1a1a', padding: '15px', margin: '15px 0', border: '1px solid #dca355', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 5px 0' }}>{c.title}</h3>
            <p style={{ margin: '0', fontSize: '0.9rem' }}>Data: {new Date(c.start).toLocaleDateString('it-IT')}</p>
            <p style={{ margin: '0', fontSize: '0.8rem', opacity: 0.7 }}>Luogo: {c.location}</p>
          </div>
        ))
      )}
    </div>
  );
}