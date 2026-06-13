'use client';
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc, collection, getDocs, addDoc, deleteDoc } from 'firebase/firestore';

export default function AdminPage() {
  const [view, setView] = useState<'menu' | 'bio' | 'radio' | 'calendario' | 'social' | 'shop' | 'foto'>('menu');
  const [data, setData] = useState<any>(null);
  const [fotoList, setFotoList] = useState<{id: string, src: string}[]>([]);
  const [loading, setLoading] = useState(true);

  const inputStyle = { width: '100%', padding: '12px', marginTop: '8px', background: '#333', color: '#fff', border: '1px solid #555', borderRadius: '4px', pointerEvents: 'auto' as const };

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
      const oggi = new Date();
      oggi.setHours(0, 0, 0, 0);
      const datiPuliti = {
        ...data,
        calendario: (data.calendario || []).filter((c: any) => new Date(c.start) >= oggi)
      };
      await setDoc(doc(db, "content", "Eddie Santillo"), datiPuliti);
      setData(datiPuliti);
      alert("Salvato correttamente! (Eventi passati eliminati)");
    } catch (e) { alert("Errore nel salvataggio"); }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        const newDoc = await addDoc(collection(db, "foto"), { src: base64 });
        setFotoList([...fotoList, { id: newDoc.id, src: base64 }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteFoto = async (id: string) => {
    await deleteDoc(doc(db, "foto", id));
    setFotoList(fotoList.filter(f => f.id !== id));
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
        <button onClick={() => setView('foto')} style={{padding: '15px', cursor: 'pointer', background: '#dca355'}}>Gestisci Foto</button>
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
            <div key={i} style={{marginBottom: '20px', border: '1px solid #555', padding: '15px', background: '#222', borderRadius: '8px'}}>
              <input value={s.titolo || ''} onChange={(e) => { const n = [...data.bio]; n[i].titolo = e.target.value; setData({...data, bio: n}); }} style={inputStyle} placeholder="Titolo" />
              <textarea value={s.testo || ''} onChange={(e) => { const n = [...data.bio]; n[i].testo = e.target.value; setData({...data, bio: n}); }} style={{...inputStyle, height: '100px'}} />
              <button onClick={() => setData({...data, bio: data.bio.filter((_:any, idx:number) => idx !== i)})} style={{marginTop: '10px', background: '#700', color: '#fff', padding: '8px', cursor: 'pointer'}}>Elimina</button>
            </div>
          ))}
          <button onClick={() => setData({...data, bio: [...data.bio, {titolo: '', testo: ''}]})}>+ Aggiungi</button>
        </div>
      )}

      {view === 'calendario' && (
        <div style={{ pointerEvents: 'auto' }}>
          {(data.calendario || []).map((c: any, i: number) => (
            <div key={i} style={{marginBottom: '20px', border: '1px solid #555', padding: '20px', background: '#222', borderRadius: '8px'}}>
              <label style={{display: 'block', color: '#aaa'}}>Nome Concerto</label>
              <input value={c.title || ''} onChange={(e) => { const n = [...data.calendario]; n[i].title = e.target.value; setData({...data, calendario: n}); }} style={inputStyle} placeholder="Nome Concerto" />
              
              <label style={{display: 'block', marginTop: '10px', color: '#aaa'}}>Data</label>
              <input type="date" value={c.start || ''} onChange={(e) => { const n = [...data.calendario]; n[i].start = e.target.value; setData({...data, calendario: n}); }} style={inputStyle} />
              
              <label style={{display: 'block', marginTop: '10px', color: '#aaa'}}>Luogo</label>
              <input value={c.location || ''} onChange={(e) => { const n = [...data.calendario]; n[i].location = e.target.value; setData({...data, calendario: n}); }} style={inputStyle} placeholder="Luogo" />
              
              <label style={{display: 'block', marginTop: '10px', color: '#aaa'}}>Tipo</label>
              <select value={c.tipo || 'RL'} onChange={(e) => { const n = [...data.calendario]; n[i].tipo = e.target.value; setData({...data, calendario: n}); }} style={inputStyle}>
                <option value="RL">RL</option>
                <option value="SL">SL</option>
              </select>
              
              <label style={{display: 'block', marginTop: '10px', color: '#aaa'}}>Link</label>
              <input value={c.link || ''} onChange={(e) => { const n = [...data.calendario]; n[i].link = e.target.value; setData({...data, calendario: n}); }} style={inputStyle} placeholder="Link (URL)" />
              
              <button onClick={() => setData({...data, calendario: data.calendario.filter((_:any, idx:number) => idx !== i)})} style={{marginTop: '15px', background: '#700', color: '#fff', padding: '10px', width: '100%', cursor: 'pointer'}}>Elimina</button>
            </div>
          ))}
          <button onClick={() => setData({...data, calendario: [...(data.calendario || []), {title: '', start: '', location: '', tipo: 'RL', link: ''}]})} style={{padding: '15px', width: '100%', background: '#dca355', cursor: 'pointer'}}>+ Aggiungi Concerto</button>
        </div>
      )}

      {view === 'radio' && <input value={data.radio?.url || ''} onChange={(e) => setData({...data, radio: {url: e.target.value}})} style={inputStyle} placeholder="URL Stream" />}

      {view === 'social' && data.social?.map((s: any, i: number) => <input key={i} value={s.url || ''} onChange={(e) => { const n = [...data.social]; n[i].url = e.target.value; setData({...data, social: n}); }} style={inputStyle} placeholder="Social URL" />)}

      {view === 'shop' && data.shop?.map((s: any, i: number) => <input key={i} value={s.url || ''} onChange={(e) => { const n = [...data.shop]; n[i].url = e.target.value; setData({...data, shop: n}); }} style={inputStyle} placeholder="Shop URL" />)}

      {view === 'foto' && (
        <div>
          <input type="file" accept="image/*" id="file-upload" onChange={handleFileUpload} style={{ display: 'none' }} />
          <label htmlFor="file-upload" style={{ padding: '15px 30px', background: '#1a1a1a', color: '#dca355', border: '2px solid #dca355', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>+ Carica Nuova Foto</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '15px', marginTop: '30px' }}>
            {fotoList.map((f) => (
              <div key={f.id} style={{ position: 'relative' }}>
                <img src={f.src} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                <button onClick={() => deleteFoto(f.id)} style={{ position: 'absolute', top: 0, right: 0, background: 'red' }}>X</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button onClick={save} style={{ display: 'block', marginTop: '40px', padding: '15px', background: 'red', color: 'white', width: '100%' }}>SALVA TUTTO</button>
    </main>
  );
}