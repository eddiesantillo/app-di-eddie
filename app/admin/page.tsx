'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../lib/firebase'; 
import { onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('bio');
  const [formData, setFormData] = useState({ titolo: '', descrizione: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      const docSnap = await getDoc(doc(db, "content", activeTab));
      if (docSnap.exists()) {
        setFormData(docSnap.data() as { titolo: string; descrizione: string });
      } else {
        setFormData({ titolo: '', descrizione: '' });
      }
    };
    loadData();
  }, [activeTab, user]);

  const handleSave = async () => {
    try {
      await setDoc(doc(db, "content", activeTab), formData);
      setStatus(`${activeTab.toUpperCase()} salvato con successo!`);
    } catch (e) {
      setStatus("Errore nel salvataggio.");
    }
  };

  if (loading) return <div style={{ background: '#000', minHeight: '100vh' }} />;

  // SCHERMATA DI LOGIN
  if (!user) return (
    <div style={{ background: '#000', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ color: '#fff', marginBottom: '20px' }}>ADMIN AREA</h1>
      <button 
        onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
        style={{ padding: '15px 30px', background: '#ff0000', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
      >
        ACCEDI CON GOOGLE
      </button>
    </div>
  );

  // PANNELLO DI CONTROLLO
  return (
    <div style={{ padding: '40px', color: '#ffffff', maxWidth: '700px', margin: '0 auto', fontFamily: 'sans-serif', background: '#000', minHeight: '100vh' }}>
      <h2 style={{ borderBottom: '2px solid #ff0000', paddingBottom: '10px' }}>PANNELLO DI CONTROLLO</h2>
      
      <div style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
        {['bio', 'concerti', 'stream'].map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            style={{ 
              flex: 1, padding: '12px', background: activeTab === tab ? '#ff0000' : '#1a1a1a', 
              border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 'bold' 
            }}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ background: '#0a0a0a', padding: '20px', border: '1px solid #222' }}>
        <label>Titolo:</label>
        <input value={formData.titolo} onChange={(e) => setFormData({...formData, titolo: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', color: '#fff', border: '1px solid #444', marginBottom: '10px' }} />
        <label>Descrizione:</label>
        <textarea value={formData.descrizione} onChange={(e) => setFormData({...formData, descrizione: e.target.value})} style={{ width: '100%', height: '150px', background: '#000', color: '#fff', border: '1px solid #444', marginBottom: '10px' }} />
        <button onClick={handleSave} style={{ width: '100%', padding: '15px', background: '#ff0000', color: '#fff', border: 'none', cursor: 'pointer' }}>SALVA</button>
      </div>

      <p>{status}</p>
      <button onClick={() => signOut(auth)} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', marginTop: '20px' }}>Logout</button>
    </div>
  );
}