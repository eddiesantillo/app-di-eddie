'use client';
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function AdminPage() {
  const [sezioni, setSezioni] = useState([{ titolo: '', testo: '' }]);
  const [loading, setLoading] = useState(true);

  // 1. CARICAMENTO: Appena si apre la pagina, legge dal DB
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "content", "Eddie Santillo");
        const snap = await getDoc(docRef);
        if (snap.exists() && snap.data().sezioni) {
          setSezioni(snap.data().sezioni);
        }
      } catch (error) {
        console.error("Errore nel caricamento:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // 2. SALVATAGGIO
  const handleUpdate = async () => {
    try {
      await setDoc(doc(db, "content", "Eddie Santillo"), { sezioni: sezioni });
      alert("Salvato con successo!");
    } catch (e) {
      alert("Errore nel salvataggio");
    }
  };

  if (loading) return <div>Caricamento dati...</div>;

  return (
    <main style={{ padding: '40px', background: '#111', color: '#fff', minHeight: '100vh' }}>
      {/* Pulsante Indietro */}
      <div style={{ marginBottom: '20px' }}>
        <a href="/bio" style={{ 
          color: '#ff0000', 
          textDecoration: 'none', 
          fontSize: '1rem',
          padding: '10px',
          border: '1px solid #ff0000',
          display: 'inline-block'
        }}>
          ← Torna al sito
        </a>
      </div>

      <h1>Pannello Admin - Modifica Sezioni</h1>
      
      {sezioni.map((s, i) => (
        <div key={i} style={{ marginBottom: '20px', border: '1px solid #ff0000', padding: '15px' }}>
          <input 
            style={{ width: '100%', marginBottom: '10px', padding: '8px', color: '#000' }}
            value={s.titolo} 
            onChange={(e) => {
              const newSezioni = [...sezioni];
              newSezioni[i].titolo = e.target.value;
              setSezioni(newSezioni);
            }} 
          />
          <textarea 
            style={{ width: '100%', height: '100px', padding: '8px', color: '#000' }}
            value={s.testo} 
            onChange={(e) => {
              const newSezioni = [...sezioni];
              newSezioni[i].testo = e.target.value;
              setSezioni(newSezioni);
            }} 
          />
        </div>
      ))}
      
      <button 
        style={{ padding: '10px', cursor: 'pointer' }}
        onClick={() => setSezioni([...sezioni, { titolo: '', testo: '' }])}
      >
        + Aggiungi nuova sezione
      </button>
      
      <button 
        style={{ marginLeft: '10px', padding: '10px', background: '#ff0000', color: '#fff', border: 'none', cursor: 'pointer' }} 
        onClick={handleUpdate}
      >
        SALVA TUTTO
      </button>
    </main>
  );
}