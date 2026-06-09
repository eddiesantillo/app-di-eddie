'use client'
import { useState, useEffect } from 'react';
import { auth, db } from '../../lib/firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
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
      setStatus(`${activeTab.toUpperCase()} salvato!`);
    } catch (e) {
      setStatus("Errore nel salvataggio.");
    }
  };

  // Se non è loggato, non mostriamo nulla (schermata nera)
  if (loading) return <div style={{ background: '#000', minHeight: '100vh' }} />;
  if (!user) return <div style={{ background: '#000', minHeight: '100vh' }} />;

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
              border: activeTab === tab ? 'none' : '1px solid #333', color: '#fff', 
              cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ background: '#0a0a0a', padding: '20px', border: '1px solid #222' }}>
        <label style={{ display: 'block', marginBottom: '8px', color: '#888' }}>Titolo:</label>
        <input 
          value={formData.titolo}
          onChange={(e) => setFormData({...formData, titolo: e.target.value})}
          style={{ width: '100%', marginBottom: '20px', padding: '12px', background: '#000', border: '1px solid #444', color: '#fff' }}
        />

        <label style={{ display: 'block', marginBottom: '8px', color: '#888' }}>Descrizione:</label>
        <textarea 
          value={formData.descrizione}
          onChange={(e) => setFormData({...formData, descrizione: e.target.value})} 
          style={{ width: '100%', height: '200px', background: '#000', border: '1px solid #444', color: '#fff', padding: '12px', marginBottom: '20px' }} 
        />
        
        <button 
          onClick={handleSave} 
          style={{ width: '100%', padding: '15px', background: '#ff0000', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
        >
          SALVA MODIFICHE
        </button>
      </div>

      <p style={{ marginTop: '20px', textAlign: 'center', color: '#ff0000' }}>{status}</p>
      
      <button 
        onClick={() => signOut(auth)} 
        style={{ marginTop: '40px', background: 'transparent', border: 'none', color: '#555', cursor: 'pointer', fontSize: '0.8rem' }}
      >
        Logout
      </button>
    </div>
  )
}