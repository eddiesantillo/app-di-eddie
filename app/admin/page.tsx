'use client';
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc, collection, getDocs, addDoc, deleteDoc } from 'firebase/firestore';

export default function AdminPage() {
  const [view, setView] = useState<'menu' | 'bio' | 'radio' | 'calendario' | 'social' | 'shop' | 'foto'>('menu');
  const [data, setData] = useState<any>(null);
  const [fotoList, setFotoList] = useState<{id: string, src: string}[]>([]);
  const [loading, setLoading] = useState(true);

  // Stile base per garantire cliccabilità
  const btnStyle = { padding: '15px', margin: '10px', background: '#333', color: '#fff', border: '1px solid #fff', cursor: 'pointer', display: 'block', width: '250px' };
  const inputStyle = { width: '100%', padding: '15px', margin: '10px 0', background: '#fff', color: '#000', border: '2px solid #000' };

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
    try {
      const oggi = new Date(); oggi.setHours(0,0,0,0);
      const datiPuliti = { ...data, calendario: (data.calendario || []).filter((c: any) => new Date(c.start) >= oggi) };
      await setDoc(doc(db, "content", "Eddie Santillo"), datiPuliti);
      alert("Salvato!");
    } catch (e) { alert("Errore"); }
  };

  if (loading) return <div>Caricamento...</div>;

  if (view === 'menu') return (
    <main style={{ padding: '40px', background: '#000', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Dashboard Admin</h1>
      <button style={btnStyle} onClick={() => setView('bio')}>Gestisci Bio</button>
      <button style={btnStyle} onClick={() => setView('radio')}>Gestisci Radio</button>
      <button style={btnStyle} onClick={() => setView('calendario')}>Gestisci Calendario</button>
      <button style={btnStyle} onClick={() => setView('social')}>Gestisci Social</button>
      <button style={btnStyle} onClick={() => setView('shop')}>Gestisci Shop</button>
      <button style={btnStyle} onClick={() => setView('foto')}>Gestisci Foto</button>
    </main>
  );

  return (
    <main style={{ padding: '20px', background: '#fff', color: '#000', minHeight: '100vh' }}>
      <button onClick={() => setView('menu')} style={{padding: '10px'}}>← INDIETRO</button>
      <h2>Gestione {view.toUpperCase()}</h2>

      {view === 'calendario' && (
        <div>
          {(data.calendario || []).map((c: any, i: number) => (
            <div key={i} style={{border: '1px solid #000', padding: '20px', margin: '20px 0'}}>
              <input value={c.title || ''} onChange={(e) => { const n = [...data.calendario]; n[i].title = e.target.value; setData({...data, calendario: n}); }} style={inputStyle} placeholder="Titolo" />
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
          <button onClick={() => setData({...data, calendario: [...(data.calendario || []), {title: '', start: '', location: '', tipo: 'RL', link: ''}]})} style={{padding: '20px', background: 'green', color: '#fff'}}>+ AGGIUNGI</button>
          <button onClick={save} style={{padding: '20px', background: 'blue', color: '#fff', display: 'block', marginTop: '20px'}}>SALVA TUTTO</button>
        </div>
      )}

      {/* Aggiungi qui le altre viste se necessario */}
    </main>
  );
}