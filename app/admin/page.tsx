'use client';
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc, collection, getDocs, addDoc, deleteDoc } from 'firebase/firestore';

export default function AdminPage() {
  const [view, setView] = useState<'menu' | 'bio' | 'radio' | 'calendario' | 'social' | 'shop' | 'foto'>('menu');
  const [data, setData] = useState<any>(null);
  const [fotoList, setFotoList] = useState<{id: string, src: string}[]>([]);
  const [loading, setLoading] = useState(true);

  const inputStyle = { width: '100%', padding: '12px', marginTop: '8px', background: '#333', color: '#fff', border: '1px solid #555', borderRadius: '4px' };

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, "content", "Eddie Santillo"));
      setData(snap.exists() ? snap.data() : { bio: [], radio: { url: '' }, calendario: [], social: [], shop: [] });
      const fotoSnap = await getDocs(collection(db, "foto"));
      setFotoList(fotoSnap.docs.map(doc => ({ id: doc.id, src: doc.data().src })));
      setLoading(false);
    };
    fetchData();
  }, []);

  const save = async () => {
    try { await setDoc(doc(db, "content", "Eddie Santillo"), data); alert("Salvato!"); } 
    catch (e) { alert("Errore"); }
  };

  if (loading) return <div>Caricamento...</div>;

  if (view === 'menu') return (
    <main style={{ padding: '40px', textAlign: 'center', background: '#111', color: '#fff', minHeight: '100vh' }}>
      <h1>Dashboard Amministrativa</h1>
      <div style={{ display: 'grid', gap: '20px', maxWidth: '300px', margin: 'auto' }}>
        <button onClick={() => setView('bio')}>Gestisci Bio</button>
        <button onClick={() => setView('calendario')}>Gestisci Calendario</button>
        <button onClick={() => setView('foto')} style={{background: '#dca355'}}>Gestisci Foto</button>
      </div>
    </main>
  );

  return (
    <main style={{ padding: '20px', background: '#111', color: '#fff', minHeight: '100vh' }}>
      <button onClick={() => setView('menu')}>← Torna al Menu</button>
      <h2>Gestione Calendario</h2>
      {view === 'calendario' && (
        <div>
          {(data.calendario || []).map((c: any, i: number) => (
            <div key={i} style={{marginBottom: '20px', border: '1px solid #555', padding: '15px', background: '#222'}}>
              <input value={c.title || ''} onChange={(e) => { const n = [...data.calendario]; n[i].title = e.target.value; setData({...data, calendario: n}); }} style={inputStyle} placeholder="Titolo" />
              <input type="date" value={c.start || ''} onChange={(e) => { const n = [...data.calendario]; n[i].start = e.target.value; setData({...data, calendario: n}); }} style={inputStyle} />
              <input value={c.location || ''} onChange={(e) => { const n = [...data.calendario]; n[i].location = e.target.value; setData({...data, calendario: n}); }} style={inputStyle} placeholder="Luogo" />
              <select value={c.tipo || 'RL'} onChange={(e) => { const n = [...data.calendario]; n[i].tipo = e.target.value; setData({...data, calendario: n}); }} style={inputStyle}>
                <option value="RL">RL</option>
                <option value="SL">SL</option>
              </select>
              <input value={c.link || ''} onChange={(e) => { const n = [...data.calendario]; n[i].link = e.target.value; setData({...data, calendario: n}); }} style={inputStyle} placeholder="Link (URL)" />
              <button onClick={() => setData({...data, calendario: data.calendario.filter((_:any, idx:number) => idx !== i)})}>Elimina</button>
            </div>
          ))}
          <button onClick={() => setData({...data, calendario: [...(data.calendario || []), {title: '', start: '', location: '', tipo: 'RL', link: ''}]})}>+ Aggiungi Concerto</button>
        </div>
      )}
      <button onClick={save} style={{marginTop: '40px', padding: '15px', background: 'red', color: 'white', width: '100%'}}>SALVA TUTTO</button>
    </main>
  );
}