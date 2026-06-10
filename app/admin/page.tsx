'use client';
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function AdminPage() {
  const [view, setView] = useState<'menu' | 'bio' | 'radio' | 'calendario'>('menu');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, "content", "Eddie Santillo"));
      if (snap.exists()) {
        setData(snap.data());
      } else {
        // Valori di default se il documento risultasse vuoto
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
      <h1>Dashboard Amministrativa</h1>
      <div style={{ display: 'grid', gap: '20px', maxWidth: '300px', margin: 'auto' }}>
        <button onClick={() => setView('bio')} style={{padding: '15px'}}>Gestisci Bio</button>
        <button onClick={() => setView('radio')} style={{padding: '15px'}}>Gestisci Radio</button>
        <button onClick={() => setView('calendario')} style={{padding: '15px'}}>Gestisci Calendario</button>
      </div>
    </main>
  );

  return (
    <main style={{ padding: '20px', background: '#111', color: '#fff', minHeight: '100vh' }}>
      <button onClick={() => setView('menu')} style={{marginBottom: '20px'}}>← Torna al Menu</button>
      <h2>Stai modificando: {view.toUpperCase()}</h2>
      
      {view === 'bio' && (
        <div style={{background: '#222', padding: '20px'}}>
          <input value={data.bio.titolo} onChange={(e) => setData({...data, bio: {...data.bio, titolo: e.target.value}})} style={{width: '100%', padding: '10px', color: '#000'}} placeholder="Titolo" />
          <textarea value={data.bio.testo} onChange={(e) => setData({...data, bio: {...data.bio, testo: e.target.value}})} style={{width: '100%', height: '200px', marginTop: '10px', padding: '10px', color: '#000'}} placeholder="Testo" />
        </div>
      )}
      
      {view === 'radio' && (
        <div style={{background: '#222', padding: '20px'}}>
          <label>URL Stream HTTPS:</label>
          <input value={data.radio.url} onChange={(e) => setData({...data, radio: {url: e.target.value}})} style={{width: '100%', padding: '10px', marginTop: '10px', color: '#000'}} placeholder="https://..." />
        </div>
      )}

      {view === 'calendario' && (
        <div style={{background: '#222', padding: '20px'}}>
          {data.calendario.map((item: any, i: number) => (
             <input key={i} value={item} onChange={(e) => {
               const n = [...data.calendario]; n[i] = e.target.value; setData({...data, calendario: n});
             }} style={{width: '100%', padding: '10px', marginBottom: '10px', color: '#000'}} />
          ))}
          <button onClick={() => setData({...data, calendario: [...data.calendario, '']})}>+ Aggiungi evento</button>
        </div>
      )}

      <button onClick={save} style={{ background: '#ff0000', color: 'white', marginTop: '20px', padding: '15px', width: '100%' }}>SALVA {view.toUpperCase()}</button>
    </main>
  );
}