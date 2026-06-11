'use client';
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function AdminPage() {
  const [view, setView] = useState<'menu' | 'bio' | 'radio' | 'calendario' | 'social' | 'shop'>('menu');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const inputStyle = { width: '100%', padding: '12px', marginTop: '8px', background: '#333', color: '#fff', border: '1px solid #555', borderRadius: '4px' };

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, "content", "Eddie Santillo"));
      if (snap.exists()) {
        const d = snap.data();
        setData({
          bio: d.bio || [],
          radio: d.radio || { url: '' },
          calendario: d.calendario || [],
          social: d.social || [],
          shop: d.shop || []
        });
      } else {
        setData({ bio: [], radio: { url: '' }, calendario: [], social: [], shop: [] });
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const save = async () => {
    try {
      await setDoc(doc(db, "content", "Eddie Santillo"), data);
      alert("Salvato correttamente!");
    } catch (e) { alert("Errore nel salvataggio"); }
  };

  if (loading) return <div style={{color: '#fff', padding: '20px'}}>Caricamento...</div>;

  if (view === 'menu') return (
    <main style={{ padding: '40px', textAlign: 'center', background: '#111', color: '#fff', minHeight: '100vh' }}>
      <h1>Dashboard Amministrativa</h1>
      <div style={{ display: 'grid', gap: '20px', maxWidth: '300px', margin: 'auto' }}>
        <button onClick={() => setView('bio')} style={{padding: '15px', cursor: 'pointer'}}>Gestisci Bio</button>
        <button onClick={() => setView('radio')} style={{padding: '15px', cursor: 'pointer'}}>Gestisci Radio</button>
        <button onClick={() => setView('calendario')} style={{padding: '15px', cursor: 'pointer'}}>Gestisci Calendario</button>
        <button onClick={() => setView('social')} style={{padding: '15px', cursor: 'pointer'}}>Gestisci Social</button>
        <button onClick={() => setView('shop')} style={{padding: '15px', cursor: 'pointer'}}>Gestisci Music Shop</button>
      </div>
    </main>
  );

  return (
    <main style={{ padding: '20px', background: '#111', color: '#fff', minHeight: '100vh' }}>
      <button onClick={() => setView('menu')} style={{marginBottom: '20px', padding: '10px', cursor: 'pointer'}}>← Torna al Menu</button>
      <h2>Gestione {view.toUpperCase()}</h2>
      
      {view === 'bio' && (
        <div>
          {data.bio.map((s: any, i: number) => (
            <div key={i} style={{marginBottom: '20px', border: '1px solid #555', padding: '15px', borderRadius: '8px', background: '#222'}}>
              <input value={s.titolo || ''} onChange={(e) => { const n = [...data.bio]; n[i].titolo = e.target.value; setData({...data, bio: n}); }} style={inputStyle} placeholder="Titolo Sezione" />
              <textarea value={s.testo || ''} onChange={(e) => { const n = [...data.bio]; n[i].testo = e.target.value; setData({...data, bio: n}); }} style={{...inputStyle, height: '100px'}} placeholder="Testo" />
              <button onClick={() => setData({...data, bio: data.bio.filter((_:any, idx:number) => idx !== i)})} style={{marginTop: '10px', background: '#700', color: '#fff', padding: '8px', cursor: 'pointer'}}>Elimina Sezione</button>
            </div>
          ))}
          <button onClick={() => setData({...data, bio: [...data.bio, {titolo: '', testo: ''}]})} style={{padding: '10px', cursor: 'pointer'}}>+ Aggiungi Sezione</button>
        </div>
      )}

      {view === 'radio' && (
        <div style={{background: '#222', padding: '20px', borderRadius: '8px'}}>
          <label>URL Stream HTTPS:</label>
          <input value={data.radio?.url || ''} onChange={(e) => setData({...data, radio: {url: e.target.value}})} style={inputStyle} placeholder="https://..." />
        </div>
      )}

      {view === 'calendario' && (
        <div style={{background: '#222', padding: '20px', borderRadius: '8px'}}>
           {data.calendario.map((item: any, i: number) => (
             <input key={i} value={item} onChange={(e) => { const n = [...data.calendario]; n[i] = e.target.value; setData({...data, calendario: n}); }} style={{...inputStyle, marginBottom: '10px'}} />
           ))}
           <button onClick={() => setData({...data, calendario: [...data.calendario, '']})} style={{padding: '10px', cursor: 'pointer'}}>+ Aggiungi evento</button>
        </div>
      )}

      {(view === 'social' || view === 'shop') && (
        <div>
          {(view === 'social' ? data.social : data.shop).map((item: any, i: number) => (
            <div key={i} style={{marginBottom: '20px', border: '1px solid #555', padding: '15px', background: '#222', borderRadius: '8px'}}>
              <input value={item.nome || ''} onChange={(e) => {
                const n = view === 'social' ? [...data.social] : [...data.shop];
                n[i].nome = e.target.value;
                view === 'social' ? setData({...data, social: n}) : setData({...data, shop: n});
              }} style={inputStyle} placeholder="Nome (es. Facebook)" />
              <input value={item.url || ''} onChange={(e) => {
                const n = view === 'social' ? [...data.social] : [...data.shop];
                n[i].url = e.target.value;
                view === 'social' ? setData({...data, social: n}) : setData({...data, shop: n});
              }} style={inputStyle} placeholder="URL Link" />
              <button onClick={() => {
                const n = view === 'social' ? data.social.filter((_:any, idx:number) => idx !== i) : data.shop.filter((_:any, idx:number) => idx !== i);
                view === 'social' ? setData({...data, social: n}) : setData({...data, shop: n});
              }} style={{marginTop: '10px', background: '#700', color: '#fff', padding: '8px', cursor: 'pointer'}}>Elimina</button>
            </div>
          ))}
          <button onClick={() => {
            const n = view === 'social' ? [...data.social, {nome: '', url: ''}] : [...data.shop, {nome: '', url: ''}];
            view === 'social' ? setData({...data, social: n}) : setData({...data, shop: n});
          }} style={{padding: '10px', cursor: 'pointer'}}>+ Aggiungi</button>
        </div>
      )}

      <button onClick={save} style={{ display: 'block', marginTop: '20px', padding: '15px', background: 'red', color: 'white', width: '100%', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        SALVA {view.toUpperCase()}
      </button>
    </main>
  );
}