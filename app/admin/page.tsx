'use client';
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function AdminPage() {
  const [sezioni, setSezioni] = useState([{ titolo: '', testo: '' }]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "content", "Eddie Santillo");
        const snap = await getDoc(docRef);
        if (snap.exists() && snap.data().sezioni) {
          setSezioni(snap.data().sezioni);
        }
      } catch (error) {
        console.error("Errore caricamento:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      await setDoc(doc(db, "content", "Eddie Santillo"), { sezioni: sezioni });
      alert("Salvato correttamente!");
    } catch (e) {
      alert("Errore nel salvataggio");
    }
  };

  if (loading) return <div style={{ color: '#fff' }}>Caricamento...</div>;

  // Stile comune per gli input per renderli leggibili
  const inputStyle = { 
    width: '100%', 
    marginBottom: '10px', 
    padding: '10px', 
    background: '#333', // Grigio scuro per contrasto
    color: '#fff',      // Testo bianco
    border: '1px solid #555' 
  };

  return (
    <main style={{ padding: '20px', background: '#111', color: '#fff' }}>
      <h1>Pannello Admin</h1>
      {sezioni.map((s, i) => (
        <div key={i} style={{ marginBottom: '20px', border: '1px solid #ff0000', padding: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Titolo:</label>
          <input value={s.titolo} onChange={(e) => {
            const newS = [...sezioni]; newS[i].titolo = e.target.value; setSezioni(newS);
          }} style={inputStyle} />
          
          <label style={{ display: 'block', marginBottom: '5px' }}>Testo:</label>
          <textarea value={s.testo} onChange={(e) => {
            const newS = [...sezioni]; newS[i].testo = e.target.value; setSezioni(newS);
          }} style={{ ...inputStyle, height: '150px' }} />
        </div>
      ))}
      <button onClick={() => setSezioni([...sezioni, { titolo: '', testo: '' }])} style={{ padding: '10px' }}>+ Aggiungi Sezione</button>
      <button onClick={handleUpdate} style={{ marginLeft: '10px', padding: '10px', background: '#ff0000', color: '#fff', border: 'none' }}>SALVA TUTTO</button>
    </main>
  );
}