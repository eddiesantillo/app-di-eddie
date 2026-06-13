'use client';
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc, collection, getDocs, addDoc, deleteDoc } from 'firebase/firestore';

export default function AdminPage() {
  const [view, setView] = useState<'menu' | 'bio' | 'radio' | 'calendario' | 'social' | 'shop' | 'foto'>('menu');
  const [data, setData] = useState<any>(null);
  const [fotoList, setFotoList] = useState<{id: string, src: string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, "content", "Eddie Santillo"));
      setData(snap.exists() ? snap.data() : { bio: [], radio: { url: '' }, calendario: [], social: [], shop: [] });
      const fSnap = await getDocs(collection(db, "foto"));
      setFotoList(fSnap.docs.map(d => ({ id: d.id, src: d.data().src })));
      setLoading(false);
    };
    fetchData();
  }, []);

  const save = async () => {
    try {
      await setDoc(doc(db, "content", "Eddie Santillo"), data);
      alert("Salvato!");
    } catch (e) { alert("Errore"); }
  };

  if (loading) return <div>Caricamento...</div>;

  // MENU PRINCIPALE
  if (view === 'menu') return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Dashboard Amministrativa</h1>
      <button style={{display: 'block', width: '100%', padding: '20px', margin: '10px 0'}} onClick={() => setView('bio')}>Gestisci Bio</button>
      <button style={{display: 'block', width: '100%', padding: '20px', margin: '10px 0'}} onClick={() => setView('radio')}>Gestisci Radio</button>
      <button style={{display: 'block', width: '100%', padding: '20px', margin: '10px 0'}} onClick={() => setView('calendario')}>Gestisci Calendario</button>
      <button style={{display: 'block', width: '100%', padding: '20px', margin: '10px 0'}} onClick={() => setView('social')}>Gestisci Social</button>
      <button style={{display: 'block', width: '100%', padding: '20px', margin: '10px 0'}} onClick={() => setView('shop')}>Gestisci Shop</button>
      <button style={{display: 'block', width: '100%', padding: '20px', margin: '10px 0'}} onClick={() => setView('foto')}>Gestisci Foto</button>
    </div>
  );

  // VISTA CALENDARIO
  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => setView('menu')}>← TORNA AL MENU</button>
      <h2>Gestione Calendario</h2>
      {(data.calendario || []).map((c: any, i: number) => (
        <div key={i} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px' }}>
          <input value={c.title || ''} onChange={(e) => { const n = [...data.calendario]; n[i].title = e.target.value; setData({...data, calendario: n}); }} placeholder="Titolo" style={{display: 'block', width: '100%', padding: '10px'}} />
          <input type="date" value={c.start || ''} onChange={(e) => { const n = [...data.calendario]; n[i].start = e.target.value; setData({...data, calendario: n}); }} style={{display: 'block', width: '100%', padding: '10px'}} />
          <input value={c.location || ''} onChange={(e) => { const n = [...data.calendario]; n[i].location = e.target.value; setData({...data, calendario: n}); }} placeholder="Luogo" style={{display: 'block', width: '100%', padding: '10px'}} />
          <select value={c.tipo || 'RL'} onChange={(e) => { const n = [...data.calendario]; n[i].tipo = e.target.value; setData({...data, calendario: n}); }} style={{display: 'block', width: '100%', padding: '10px'}}>
            <option value="RL">RL</option>
            <option value="SL">SL</option>
          </select>
          <input value={c.link || ''} onChange={(e) => { const n = [...data.calendario]; n[i].link = e.target.value; setData({...data, calendario: n}); }} placeholder="Link" style={{display: 'block', width: '100%', padding: '10px'}} />
          <button onClick={() => setData({...data, calendario: data.calendario.filter((_:any, idx:number) => idx !== i)})}>ELIMINA</button>
        </div>
      ))}
      <button style={{width: '100%', padding: '20px', background: 'green', color: '#fff'}} onClick={() => setData({...data, calendario: [...(data.calendario || []), {title: '', start: '', location: '', tipo: 'RL', link: ''}]})}>+ AGGIUNGI CONCERTO</button>
      <button style={{width: '100%', padding: '20px', background: 'blue', color: '#fff', marginTop: '20px'}} onClick={save}>SALVA TUTTO</button>
    </div>
  );
}