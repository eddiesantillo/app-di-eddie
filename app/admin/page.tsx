'use client';
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc, addDoc } from 'firebase/firestore';

export default function AdminPage() {
  const [data, setData] = useState<any>(null);
  const [fotoList, setFotoList] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const cardStyle = { background: '#1a1a1a', padding: '25px', borderRadius: '12px', border: '1px solid #333', marginBottom: '20px' };
  const inputStyle = { width: '100%', padding: '10px', background: '#262626', border: '1px solid #444', color: '#fff', borderRadius: '6px', marginBottom: '8px' };
  const buttonStyle = { cursor: 'pointer', padding: '10px 15px', borderRadius: '6px', border: 'none', fontWeight: '600' };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const snap = await getDoc(doc(db, "content", "Eddie Santillo"));
    if (snap.exists()) setData(snap.data());
    const fotoSnap = await getDocs(collection(db, "foto"));
    setFotoList(fotoSnap.docs.map(doc => ({ id: doc.id, src: doc.data().src })));
    setLoading(false);
  };

  const saveContent = async () => {
    await setDoc(doc(db, "content", "Eddie Santillo"), data, { merge: true });
    alert("Salvato!");
  };

  const deleteFoto = async (id: string) => {
    await deleteDoc(doc(db, "foto", id));
    fetchData();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        await addDoc(collection(db, "foto"), { src: base64String });
        fetchData();
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) return <div>Caricamento...</div>;

  return (
    <main style={{ padding: '40px 20px', color: '#fff', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>DASHBOARD AMMINISTRATIVA</h1>
      
      {!activeSection ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          {['bio', 'radio', 'calendario', 'social', 'shop', 'foto', 'repertorio', 'contatti'].map(id => (
            <button key={id} onClick={() => setActiveSection(id)} style={{ ...buttonStyle, background: '#333', color: '#fff' }}>
              GESTISCI {id.toUpperCase()}
            </button>
          ))}
        </div>
      ) : (
        <div style={cardStyle}>
          <button onClick={() => setActiveSection(null)} style={{ background: 'transparent', color: '#888', border: 'none', marginBottom: '20px', cursor: 'pointer' }}>← Torna al menù</button>
          
          {activeSection === 'bio' && (<div><h2>Gestione Bio</h2>{(data.bio || []).map((b: any, i: number) => (<div key={i}><input value={b.titolo || ''} onChange={(e) => {const n = [...data.bio]; n[i].titolo = e.target.value; setData({...data, bio: n})}} style={inputStyle}/><textarea value={b.testo || ''} onChange={(e) => {const n = [...data.bio]; n[i].testo = e.target.value; setData({...data, bio: n})}} style={{...inputStyle, height: '100px'}}/></div>))}</div>)}
          {activeSection === 'radio' && (<div><h2>Radio URL</h2><input value={data.radio?.url || ''} onChange={(e) => setData({...data, radio: {...data.radio, url: e.target.value}})} style={inputStyle}/></div>)}
          {activeSection === 'calendario' && (<div><h2>Gestione Eventi</h2>{(data.calendario || []).map((c: any, i: number) => (<div key={i} style={{border: '1px solid #444', padding: '15px', marginBottom: '15px', borderRadius: '8px'}}><input placeholder="Nome" value={c.nome || ''} onChange={(e) => {const n = [...data.calendario]; n[i].nome = e.target.value; setData({...data, calendario: n})}} style={inputStyle}/><input placeholder="Giorno" value={c.giorno || ''} onChange={(e) => {const n = [...data.calendario]; n[i].giorno = e.target.value; setData({...data, calendario: n})}} style={inputStyle}/><input placeholder="Ora" value={c.ora || ''} onChange={(e) => {const n = [...data.calendario]; n[i].ora = e.target.value; setData({...data, calendario: n})}} style={inputStyle}/><input placeholder="Tipo (SL/RL)" value={c.tipo || ''} onChange={(e) => {const n = [...data.calendario]; n[i].tipo = e.target.value; setData({...data, calendario: n})}} style={inputStyle}/><input placeholder="Link" value={c.link || ''} onChange={(e) => {const n = [...data.calendario]; n[i].link = e.target.value; setData({...data, calendario: n})}} style={inputStyle}/><button onClick={() => setData({...data, calendario: data.calendario.filter((_:any, idx:number) => idx !== i)})} style={{background: '#721c24', color: '#fff', ...buttonStyle}}>Elimina</button></div>))} <button onClick={() => setData({...data, calendario: [...(data.calendario || []), {nome: '', giorno: '', ora: '', tipo: '', link: ''}]})} style={{background: '#28a745', color: '#fff', ...buttonStyle, width: '100%'}}>+ Aggiungi Evento</button></div>)}
          {activeSection === 'social' && (<div><h2>Gestione Social</h2>{(data.social || []).map((s: any, i: number) => (<div key={i} style={{marginBottom: '15px', padding: '10px', border: '1px solid #444', borderRadius: '8px'}}><input placeholder="Nome" value={s.nome || ''} onChange={(e) => {const n = [...data.social]; n[i].nome = e.target.value; setData({...data, social: n})}} style={inputStyle}/><input placeholder="URL" value={s.url || ''} onChange={(e) => {const n = [...data.social]; n[i].url = e.target.value; setData({...data, social: n})}} style={inputStyle}/><button onClick={() => setData({...data, social: data.social.filter((_:any, idx:number) => idx !== i)})} style={{background: '#721c24', color: '#fff', ...buttonStyle}}>Elimina</button></div>))} <button onClick={() => setData({...data, social: [...(data.social || []), {nome: '', url: ''}]})} style={{background: '#28a745', color: '#fff', ...buttonStyle, width: '100%'}}>+ Aggiungi Social</button></div>)}
          {activeSection === 'repertorio' && (<div><h2>Gestione Repertorio</h2><textarea value={data.repertorio || ''} onChange={(e) => setData({...data, repertorio: e.target.value})} style={{...inputStyle, height: '400px', whiteSpace: 'pre'}} /></div>)}
          
          {/* Gestione Contatti Array */}
          {activeSection === 'contatti' && (
            <div>
              <h2>Gestione Contatti</h2>
              {(data.contatti || []).map((c: any, i: number) => (
                <div key={i} style={{ border: '1px solid #444', padding: '15px', marginBottom: '15px', borderRadius: '8px' }}>
                  <input placeholder="Titolo" value={c.titolo || ''} onChange={(e) => {const n = [...data.contatti]; n[i].titolo = e.target.value; setData({...data, contatti: n})}} style={inputStyle}/>
                  <input placeholder="Valore" value={c.valore || ''} onChange={(e) => {const n = [...data.contatti]; n[i].valore = e.target.value; setData({...data, contatti: n})}} style={inputStyle}/>
                  <button onClick={() => setData({...data, contatti: data.contatti.filter((_:any, idx:number) => idx !== i)})} style={{background: '#721c24', color: '#fff', ...buttonStyle}}>Elimina</button>
                </div>
              ))}
              <button onClick={() => setData({...data, contatti: [...(data.contatti || []), {titolo: '', valore: ''}]})} style={{background: '#28a745', color: '#fff', ...buttonStyle, width: '100%'}}>+ Aggiungi</button>
            </div>
          )}

          {activeSection === 'foto' && (<div><h2>Gestione Galleria</h2><div style={{ marginBottom: '20px', padding: '15px', background: '#262626', borderRadius: '8px', border: '1px dashed #444' }}><label style={{ cursor: 'pointer', display: 'block', textAlign: 'center' }}><input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} /><span style={{ color: '#28a745', fontWeight: 'bold' }}>+ Seleziona Foto</span></label></div><div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>{fotoList.map((f, i) => (<div key={i} style={{ position: 'relative' }}><img src={f.src} alt="Foto" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #444' }} /><button onClick={() => deleteFoto(f.id)} style={{ position: 'absolute', top: '5px', right: '5px', background: '#721c24', color: '#fff', borderRadius: '50%', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>X</button></div>))}</div></div>)}

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