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

  const updateCalendario = (val: string, key: string, i: number) => {
    const n = [...data.calendario];
    n[i][key] = val;
    setData({...data, calendario: n});
  };

  const save = async () => {
    await setDoc(doc(db, "content", "Eddie Santillo"), data);
    alert("Salvato!");
  };

  if (loading) return <div>Caricamento...</div>;

  if (view === 'menu') return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <h1>Dashboard</h1>
      <button onClick={() => setView('calendario')}>GESTISCI CALENDARIO</button>
      <button onClick={() => setView('bio')}>GESTISCI BIO</button>
    </div>
  );

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <button onClick={() => setView('menu')}>TORNA AL MENU</button>
      
      {view === 'calendario' && (
        <div style={{ marginTop: '20px' }}>
          {(data.calendario || []).map((c: any, i: number) => (
            <div key={i} style={{ border: '1px solid #fff', padding: '10px', marginBottom: '10px' }}>
              <input 
                value={c.title || ''} 
                onChange={(e) => updateCalendario(e.target.value, 'title', i)} 
                placeholder="Titolo" 
                style={{ width: '100%', padding: '10px', color: '#000' }} 
              />
              <input 
                type="date" 
                value={c.start || ''} 
                onChange={(e) => updateCalendario(e.target.value, 'start', i)} 
                style={{ width: '100%', padding: '10px', color: '#000' }} 
              />
              <input 
                value={c.location || ''} 
                onChange={(e) => updateCalendario(e.target.value, 'location', i)} 
                placeholder="Luogo" 
                style={{ width: '100%', padding: '10px', color: '#000' }} 
              />
              <button onClick={() => {
                const n = data.calendario.filter((_:any, idx:number) => idx !== i);
                setData({...data, calendario: n});
              }}>ELIMINA</button>
            </div>
          ))}
          <button onClick={() => setData({...data, calendario: [...(data.calendario || []), {title: '', start: '', location: ''}]})}>+ AGGIUNGI</button>
          <button onClick={save}>SALVA TUTTO</button>
        </div>
      )}
    </div>
  );
}