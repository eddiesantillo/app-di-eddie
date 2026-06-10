'use client';
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function AdminPage() {
  const [view, setView] = useState<'menu' | 'bio' | 'radio' | 'calendario'>('menu');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Stile per rendere tutto leggibile su sfondo nero
  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginTop: '8px',
    background: '#333',
    color: '#fff',
    border: '1px solid #555',
    borderRadius: '4px'
  };

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, "content", "Eddie Santillo"));
      if (snap.exists()) {
        setData(snap.data());
      } else {
        setData({ bio: { titolo: '', testo: '' }, radio: { url: '' }, calendario: [] });
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const save = async () => {
    await setDoc(doc(db, "content", "Eddie Santillo"), data);
    alert("Salvato correttamente!");
  };

  if (loading) return <div style={{color: '#fff', padding: '20px'}}>Caricamento...</div>;

  if (view === 'menu') return (
    <main style={{ padding: '40px', textAlign: 'center', background: '#111', color: '#fff', minHeight: '100vh' }}>
      <h1 style={{marginBottom: '30px'}}>Dashboard Amministrativa</h1>
      <div style={{ display: 'grid', gap: '20px', maxWidth: '300px', margin: 'auto' }}>
        <button onClick={() => setView('bio')} style={{padding: '15px', cursor: 'pointer'}}>Gestisci Bio</button>
        <button onClick={() => setView('radio')} style={{padding: '15px', cursor: 'pointer'}}>Gestisci Radio</button>
        <button onClick={() => setView('calendario')} style={{padding: '15px', cursor: 'pointer'}}>Gestisci Calendario</button>
      </div>
    </main>
  );

  return (
    <main style={{ padding: '20px', background: '#111', color: '#fff', minHeight: '100vh' }}>
      <button onClick={() => setView('menu')} style={{marginBottom: '20px', cursor: 'pointer'}}>← Torna al Menu</button>
      <h2 style={{marginBottom: '20px'}}>Stai modificando: {view.toUpperCase()}</h2>
      
      {view === 'bio' && (
        <div style={{background: '#222', padding: '20px', borderRadius: '8px'}}>
          <input value={data.bio.titolo} onChange={(e) => setData({...data, bio: {...data.bio, titolo: e.target.value}})} style={inputStyle} placeholder="Titolo" />
          <textarea value={data.bio.testo} onChange={(e) => setData({...data, bio: {...data.bio, testo: e.target.value}})} style={{...inputStyle, height: '200px'}} placeholder="Testo" />
        </div>
      )}
      
      {view === 'radio' && (
        <div style={{background: '#222', padding: '20px', borderRadius: '8px'}}>
          <label>URL Stream HTTPS:</label>
          <input value={data.radio.url} onChange={(e) => setData({...data, radio: {url: e.target.value}})} style={inputStyle} placeholder="https://..." />
        </div>
      )}

      {view === 'calendario' && (
        <div style={{background: '#222', padding: '20px', borderRadius: '8px'}}>
          {data.calendario.map((item: any, i: number) => (
             <input key={i} value={item} onChange={(e) => {
               const n = [...data.calendario]; n[i] = e.target.value; setData({...data, calendario: n});
             }} style={{...inputStyle, marginBottom: '10px'}} />
          ))}
          <button onClick={() => setData({...data, calendario: [...data.calendario, '']})} style={{marginTop: '10px', padding: '10px'}}>+ Aggiungi evento</button>
        </div>
      )}

      <button onClick={save} style={{ background: '#ff0000', color: 'white', marginTop: '20px', padding: '15px', width: '100%', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>SALVA {view.toUpperCase()}</button>
    </main>
  );
}