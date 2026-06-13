'use client';
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc, collection, getDocs, addDoc, deleteDoc } from 'firebase/firestore';

export default function AdminPage() {
  const [data, setData] = useState<any>(null);
  const [fotoList, setFotoList] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const cardStyle = { background: '#1a1a1a', padding: '25px', borderRadius: '12px', border: '1px solid #333', marginBottom: '20px' };
  const inputStyle = { width: '100%', padding: '10px', background: '#262626', border: '1px solid #444', color: '#fff', borderRadius: '6px', marginBottom: '8px' };
  const buttonStyle = { cursor: 'pointer', padding: '10px 15px', borderRadius: '6px', border: 'none', fontWeight: '600' };

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, "content", "Eddie Santillo"));
      if (snap.exists()) setData(snap.data());
      const fotoSnap = await getDocs(collection(db, "foto"));
      setFotoList(fotoSnap.docs.map(doc => ({ id: doc.id, src: doc.data().src })));
      setLoading(false);
    };
    fetchData();
  }, []);

  const saveContent = async () => {
    await setDoc(doc(db, "content", "Eddie Santillo"), data);
    alert("Salvato!");
  };

  const addFoto = (e: any) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const docRef = await addDoc(collection(db, "foto"), { src: reader.result });
      setFotoList([...fotoList, { id: docRef.id, src: reader.result }]);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  if (loading) return <div>Caricamento...</div>;

  return (
    <main style={{ padding: '40px 20px', color: '#fff', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>DASHBOARD AMMINISTRATIVA</h1>
      
      {!activeSection ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          {['bio', 'radio', 'calendario', 'social', 'shop', 'foto'].map(id => (
            <button key={id} onClick={() => setActiveSection(id)} style={{ ...buttonStyle, background: '#333', color: '#fff' }}>
              GESTISCI {id.toUpperCase()}
            </button>
          ))}
        </div>
      ) : (
        <div style={cardStyle}>
          <button onClick={() => setActiveSection(null)} style={{ background: 'transparent', color: '#888', border: 'none', marginBottom: '20px', cursor: 'pointer' }}>← Torna al menù</button>
          
          {/* SEZIONE CALENDARIO DETTAGLIATA */}
          {activeSection === 'calendario' && (
            <div>
              <h2 style={{ marginBottom: '20px' }}>Gestione Eventi</h2>
              {(data.calendario || []).map((c: any, i: number) => (
                <div key={i} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #444', borderRadius: '8px' }}>
                  <select value={c.tipo || 'RL'} onChange={(e) => { const n = [...data.calendario]; n[i].tipo = e.target.value; setData({...data, calendario: n}); }} style={inputStyle}>
                    <option value="RL">RL</option>
                    <option value="SL">SL</option>
                  </select>
                  <input value={c.nome || ''} placeholder="Nome Locale / Land" onChange={(e) => { const n = [...data.calendario]; n[i].nome = e.target.value; setData({...data, calendario: n}); }} style={inputStyle} />
                  <input value={c.link || ''} placeholder="Link (Maps o SLURL)" onChange={(e) => { const n = [...data.calendario]; n[i].link = e.target.value; setData({...data, calendario: n}); }} style={inputStyle} />
                  <input value={c.giorno || ''} placeholder="Giorno" onChange={(e) => { const n = [...data.calendario]; n[i].giorno = e.target.value; setData({...data, calendario: n}); }} style={inputStyle} />
                  <input value={c.ora || ''} placeholder="Ora" onChange={(e) => { const n = [...data.calendario]; n[i].ora = e.target.value; setData({...data, calendario: n}); }} style={inputStyle} />
                  <button onClick={() => setData({...data, calendario: data.calendario.filter((_:any, idx:number) => idx !== i)})} style={{ background: '#721c24', color: '#fff', ...buttonStyle }}>Elimina Evento</button>
                </div>
              ))}
              <button onClick={() => setData({...data, calendario: [...(data.calendario || []), {tipo:'RL', nome:'', link:'', giorno:'', ora:''}]})} style={{ background: '#28a745', color: '#fff', ...buttonStyle }}>+ Aggiungi Evento</button>
            </div>
          )}

          {/* ... altre sezioni rimangono invariate ... */}

          {activeSection !== 'foto' && (
            <button onClick={saveContent} style={{ width: '100%', marginTop: '30px', background: '#d4af37', color: '#000', ...buttonStyle }}>
              SALVA MODIFICHE
            </button>
          )}
        </div>
      )}
    </main>
  );
}