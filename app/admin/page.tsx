'use client'
import { useState } from 'react';
import { db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function AdminPage() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');

  const saveToFirebase = async () => {
    try {
      // Salva la bio nella collezione "content" con ID "bio"
      await setDoc(doc(db, "content", "bio"), { text: text });
      setStatus("Biografia salvata con successo!");
    } catch (e) {
      setStatus("Errore nel salvataggio: " + e);
    }
  };

  return (
    <div style={{ padding: '50px', color: '#fff', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ color: '#ff4444' }}>Pannello Riservato: Modifica Bio</h2>
      <textarea 
        onChange={(e) => setText(e.target.value)} 
        style={{ width: '100%', height: '200px', color: '#000', padding: '10px' }} 
        placeholder="Scrivi qui la biografia..." 
      />
      <button 
        onClick={saveToFirebase} 
        style={{ marginTop: '20px', padding: '10px 20px', background: '#ff4444', border: 'none', color: '#fff', cursor: 'pointer' }}
      >
        Salva Bio
      </button>
      <p style={{ marginTop: '10px' }}>{status}</p>
    </div>
  )
}