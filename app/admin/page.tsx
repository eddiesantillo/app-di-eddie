'use client';
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function AdminPage() {
  const [view, setView] = useState<'menu' | 'bio' | 'radio' | 'calendario' | 'social' | 'shop' | 'foto'>('menu');
  const [data, setData] = useState<any>(null);
  const [fotoData, setFotoData] = useState<string[]>([]);
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
      
      const fotoSnap = await getDoc(doc(db, "content", "galleria"));
      if (fotoSnap.exists()) setFotoData(fotoSnap.data().immagini || []);
      
      setLoading(false);
    };
    fetchData();
  }, []);

  const save = async () => {
    try {
      await setDoc(doc(db, "content", "Eddie Santillo"), data);
      await setDoc(doc(db, "content", "galleria"), { immagini: fotoData });
      alert("Salvato correttamente!");
    } catch (e) { alert("Errore nel salvataggio"); }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFotoData([...fotoData, reader.result as string]);
      reader.readAsDataURL(file);
    }
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

      {view === 'foto' && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <input type="file" accept="image/*" id="file-upload" onChange={handleFileUpload} style={{ display: 'none' }} />
          <label htmlFor="file-upload" style={{ padding: '15px 30px', background: '#1a1a1a', color: '#dca355', border: '2px solid #dca355', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            + Carica Nuova Foto
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '15px', marginTop: '30px' }}>
            {fotoData.map((src, i) => (
              <div key={i} style={{ position: 'relative', border: '1px solid #444', borderRadius: '8px', overflow: 'hidden' }}>
                <img src={src} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                <button onClick={() => setFotoData(fotoData.filter((_, idx) => idx !== i))} style={{ position: 'absolute', top: '5px', right: '5px', background: 'red', border: 'none', color: 'white', borderRadius: '50%', width: '25px', height: '25px', cursor: 'pointer' }}>X</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ritorna il tasto Salva */}
      <button onClick={save} style={{ display: 'block', marginTop: '40px', padding: '15px', background: 'red', color: 'white', width: '100%', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        SALVA TUTTO
      </button>
    </main>
  );
}