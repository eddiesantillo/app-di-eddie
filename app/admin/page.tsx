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
      // Dati principali
      const snap = await getDoc(doc(db, "content", "Eddie Santillo"));
      setData(snap.exists() ? snap.data() : { bio: [], radio: { url: '' }, calendario: [], social: [], shop: [] });
      
      // Dati foto (lettura da collezione separata)
      const fotoSnap = await getDocs(collection(db, "foto"));
      setFotoList(fotoSnap.docs.map(doc => ({ id: doc.id, src: doc.data().src })));
      
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
        <button onClick={() => setView('foto')} style={{padding: '15px', cursor: 'pointer', background: '#dca355'}}>Gestisci Foto</button>
      </div>
    </main>
  );

  return (
    <main style={{ padding: '20px', background: '#111', color: '#fff', minHeight: '100vh' }}>
      <button onClick={() => setView('menu')} style={{marginBottom: '20px', padding: '10px', cursor: 'pointer'}}>← Torna al Menu</button>
      <h2>Gestione FOTO</h2>
      <hr style={{ border: '0', borderTop: '2px solid #333', margin: '20px 0' }} />

      <input type="file" accept="image/*" id="file-upload" onChange={handleFileUpload} style={{ display: 'none' }} />
      <label htmlFor="file-upload" style={{ padding: '15px 30px', background: '#1a1a1a', color: '#dca355', border: '2px solid #dca355', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
        + Carica Nuova Foto
      </label>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '15px', marginTop: '30px' }}>
        {fotoList.map((f) => (
          <div key={f.id} style={{ position: 'relative', border: '1px solid #444', borderRadius: '8px', overflow: 'hidden' }}>
            <img src={f.src} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
            <button onClick={() => deleteFoto(f.id)} style={{ position: 'absolute', top: '5px', right: '5px', background: 'red', border: 'none', color: 'white', borderRadius: '50%', width: '25px', height: '25px', cursor: 'pointer' }}>X</button>
          </div>
        ))}
      </div>

      <button onClick={save} style={{ display: 'block', marginTop: '40px', padding: '15px', background: 'red', color: 'white', width: '100%', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        SALVA TUTTO
      </button>
      
      {/* //prova */}
    </main>
  );
}