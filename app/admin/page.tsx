'use client';
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function AdminPage() {
  // Nota: ho aggiunto 'tipo' di default a 'testo'
  const [sezioni, setSezioni] = useState([{ titolo: '', testo: '', tipo: 'testo' }]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "content", "Eddie Santillo");
        const snap = await getDoc(docRef);
        // Se il DB ha già dati vecchi, il campo 'tipo' potrebbe mancare, aggiungiamolo al volo
        if (snap.exists() && snap.data().sezioni) {
          const datiConTipo = snap.data().sezioni.map((s: any) => ({
            ...s,
            tipo: s.tipo || 'testo'
          }));
          setSezioni(datiConTipo);
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

  const rimuoviSezione = (index: number) => {
    setSezioni(sezioni.filter((_, i) => i !== index));
  };

  if (loading) return <div style={{ color: '#fff' }}>Caricamento...</div>;

  const inputStyle = { 
    width: '100%', marginBottom: '10px', padding: '10px', 
    background: '#333', color: '#fff', border: '1px solid #555' 
  };

  return (
    <main style={{ padding: '20px', background: '#111', color: '#fff', minHeight: '100vh' }}>
      <h1>Pannello Admin</h1>
      {sezioni.map((s, i) => (
        <div key={i} style={{ marginBottom: '20px', border: '1px solid #ff0000', padding: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <label>Sezione {i + 1}</label>
            <button onClick={() => rimuoviSezione(i)} style={{ background: '#700', color: '#ffaaaa', border: 'none', cursor: 'pointer' }}>Elimina</button>
          </div>
          
          <input value={s.titolo} onChange={(e) => {
            const newS = [...sezioni]; newS[i].titolo = e.target.value; setSezioni(newS);
          }} style={inputStyle} placeholder="Titolo" />

          {/* Scelta tipo sezione */}
          <select value={s.tipo} onChange={(e) => {
            const newS = [...sezioni]; newS[i].tipo = e.target.value; setSezioni(newS);
          }} style={{ ...inputStyle, marginBottom: '10px' }}>
            <option value="testo">Testo Normale</option>
            <option value="radio">Radio (URL Stream)</option>
          </select>
          
          <textarea value={s.testo} onChange={(e) => {
            const newS = [...sezioni]; newS[i].testo = e.target.value; setSezioni(newS);
          }} style={{ ...inputStyle, height: s.tipo === 'radio' ? '40px' : '120px' }} 
             placeholder={s.tipo === 'radio' ? "Inserisci URL HTTPS..." : "Testo"} />
        </div>
      ))}
      
      <button onClick={() => setSezioni([...sezioni, { titolo: '', testo: '', tipo: 'testo' }])} style={{ padding: '10px' }}>
        + Aggiungi nuova sezione
      </button>
      
      <button onClick={handleUpdate} style={{ marginLeft: '10px', padding: '10px', background: '#ff0000', color: '#fff', border: 'none' }}>
        SALVA TUTTO
      </button>
    </main>
  );
}