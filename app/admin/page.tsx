'use client';
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc, collection, getDocs, addDoc, deleteDoc } from 'firebase/firestore';

export default function AdminPage() {
  const [view, setView] = useState<'menu' | 'bio' | 'radio' | 'calendario' | 'social' | 'shop' | 'foto'>('menu');
  const [data, setData] = useState<any>(null);
  const [fotoList, setFotoList] = useState<{id: string, src: string}[]>([]);
  const [loading, setLoading] = useState(true);

  // Stile super-semplificato e forzato
  const inputStyle = { 
    width: '100%', 
    padding: '15px', 
    marginTop: '5px', 
    marginBottom: '15px',
    background: '#444', 
    color: '#fff', 
    border: '2px solid #666', 
    borderRadius: '4px',
    fontSize: '16px',
    position: 'relative' as const,
    zIndex: 9999
  };

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
    const oggi = new Date(); oggi.setHours(0,0,0,0);
    const datiPuliti = { ...data, calendario: (data.calendario || []).filter((c: any) => new Date(c.start) >= oggi) };
    await setDoc(doc(db, "content", "Eddie Santillo"), datiPuliti);
    setData(datiPuliti);
    alert("Salvato!");
  };

  if (loading) return <div>Caricamento...</div>;

  if (view === 'menu') return (
    <main style={{ padding: '40px', textAlign: 'center', background: '#111', color: '#fff', minHeight: '100vh' }}>
      <h1>Dashboard Amministrativa</h1>
      <div style={{ display: 'grid', gap: '20px', maxWidth: '300px', margin: 'auto' }}>
        <button onClick={() => setView('calendario')} style={{padding: '20px', cursor: 'pointer'}}>Gestisci Calendario</button>
        <button onClick={() => setView('foto')} style={{padding: '20px', cursor: 'pointer'}}>Gestisci Foto</button>
      </div>
    </main>
  );

  return (
    <main style={{ padding: '20px', background: '#111', color: '#fff', minHeight: '100vh' }}>
      <button onClick={() => setView('menu')} style={{marginBottom: '20px'}}>← Torna</button>
      
      {view === 'calendario' && (
        <div style={{ position: 'relative', zIndex: 10 }}>
          {(data.calendario || []).map((c: any, i: number) => (
            <div key={i} style={{ border: '2px solid #dca355', padding: '20px', marginBottom: '20px' }}>
              <input value={c.title || ''} onChange={(e) => { const n = [...data.calendario]; n[i].title = e.target.value; setData({...data, calendario: n}); }} style={inputStyle} placeholder="Nome Concerto" />
              <input type="date" value={c.start || ''} onChange={(e) => { const n = [...data.calendario]; n[i].start = e.target.value; setData({...data, calendario: n}); }} style={inputStyle} />
              <input value={c.location || ''} onChange={(e) => { const n = [...data.calendario]; n[i].location = e.target.value; setData({...data, calendario: n}); }} style={inputStyle} placeholder="Luogo" />
              <select value={c.tipo || 'RL'} onChange={(e) => { const n = [...data.calendario]; n[i].tipo = e.target.value; setData({...data, calendario: n}); }} style={inputStyle}>
                <option value="RL">RL</option>
                <option value="SL">SL</option>
              </select>
              <input value={c.link || ''} onChange={(e) => { const n = [...data.calendario]; n[i].link = e.target.value; setData({...data, calendario: n}); }} style={inputStyle} placeholder="Link" />
              <button onClick={() => setData({...data, calendario: data.calendario.filter((_:any, idx:number) => idx !== i)})} style={{background: 'red', color: '#fff', padding: '10px'}}>ELIMINA</button>
            </div>
          ))}
          <button onClick={() => setData({...data, calendario: [...(data.calendario || []), {title: '', start: '', location: '', tipo: 'RL', link: ''}]})} style={{padding: '20px', width: '100%', background: 'green'}}>+ AGGIUNGI</button>
          <button onClick={save} style={{padding: '20px', width: '100%', background: 'blue', marginTop: '20px'}}>SALVA TUTTO</button>
        </div>
      )}
    </main>
  );
}