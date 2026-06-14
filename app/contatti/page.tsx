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

  // Funzione per decidere se rendere il link cliccabile
  const renderValore = (titolo: string, valore: string) => {
    if (titolo.toLowerCase().includes('telefono') || titolo.toLowerCase().includes('cell')) {
      const tel = valore.replace(/\s/g, ''); // Rimuove spazi per il link tel:
      return <a href={`tel:${tel}`} style={{ color: '#dca355', textDecoration: 'none' }}>{valore}</a>;
    }
    if (titolo.toLowerCase().includes('email') || valore.includes('@')) {
      return <a href={`mailto:${valore}`} style={{ color: '#dca355', textDecoration: 'none' }}>{valore}</a>;
    }
    return valore;
  };

  return (
    <main style={{ padding: '40px 20px', color: '#fff', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      
      {/* Tasto Indietro */}
      <a href="/" style={{ 
        display: 'inline-block', 
        marginBottom: '30px', 
        color: '#dca355', 
        textDecoration: 'none', 
        fontSize: '0.9rem',
        border: '1px solid #dca355',
        padding: '8px 16px',
        borderRadius: '20px'
      }}>
        ← Torna alla Home
      </a>

      <h1 style={{ marginBottom: '30px' }}>CONTATTI</h1>
      
      <div style={{ background: '#252525', padding: '30px', borderRadius: '12px' }}>
        {contatti.map((c: any, i: number) => (
          <p key={i} style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
            <strong style={{ display: 'block', marginBottom: '5px', opacity: 0.7, fontSize: '0.9rem' }}>{c.titolo}</strong> 
            {renderValore(c.titolo, c.valore)}
          </p>
        ))}
      </div>
    </main>
  );
}