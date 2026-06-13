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
      const oggi = new Date(); oggi.setHours(0,0,0,0);
      const datiPuliti = { ...data, calendario: (data.calendario || []).filter((c: any) => new Date(c.start) >= oggi) };
      await setDoc(doc(db, "content", "Eddie Santillo"), datiPuliti);
      alert("Salvato correttamente!");
    } catch (e) { alert("Errore nel salvataggio"); }
  };

  if (loading) return <div>Caricamento...</div>;

  // MENU PRINCIPALE
  if (view === 'menu') return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard Amministrativa</h1>
      <button onClick={() => setView('bio')}>Gestisci Bio</button>
      <button onClick={() => setView('radio')}>Gestisci Radio</button>
      <button onClick={() => setView('calendario')}>Gestisci Calendario</button>
      <button onClick={() => setView('social')}>Gestisci Social</button>
      <button onClick={() => setView('shop')}>Gestisci Shop</button>
      <button onClick={() => setView('foto')}>Gestisci Foto</button>
    </div>
  );

  // GESTIONE CALENDARIO
  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => setView('menu')}>← TORNA AL MENU</button>
      <h2>Gestione Calendario</h2>
      {(data.calendario || []).map((c: any, i: number) => (
        <div key={i} style={{ border: '1px solid #000', padding: '10px', marginBottom: '10px' }}>
          <input value={c.title || ''} onChange={(e) => { const n = [...data.calendario]; n[i].title = e.target.value; setData({...data, calendario: n}); }} placeholder="Titolo" />
          <input type="date" value={c.start || ''} onChange={(e) => { const n = [...data.calendario]; n[i].start = e.target.value; setData({...data, calendario: n}); }} />
          <input value={c.location || ''} onChange={(e) => { const n = [...data.calendario]; n[i].location = e.target.value; setData({...data, calendario: n}); }} placeholder="Luogo" />
          <select value={c.tipo || 'RL'} onChange={(e) => { const n = [...data.calendario]; n[i].tipo = e.target.value; setData({...data, calendario: n}); }}>
            <option value="RL">RL</option>
            <option value="SL">SL</option>
          </select>
          <input value={c.link || ''} onChange={(e) => { const n = [...data.calendario]; n[i].link = e.target.value; setData({...data, calendario: n}); }} placeholder="Link" />
          <button onClick={() => setData({...data, calendario: data.calendario.filter((_:any, idx:number) => idx !== i)})}>ELIMINA</button>
        </div>
      ))}
      <button onClick={() => setData({...data, calendario: [...(data.calendario || []), {title: '', start: '', location: '', tipo: 'RL', link: ''}]})}>+ AGGIUNGI CONCERTO</button>
      <button onClick={save}>SALVA TUTTO</button>
    </div>
  );
}