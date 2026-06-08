'use client'
import { useState, useEffect } from 'react';
import { auth, db } from '../../lib/firebase'; 
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('bio'); // Gestisce il menu attivo
  const [formData, setFormData] = useState({ bio: '', concerti: '', stream: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
  }, []);

  const handleSave = async () => {
    try {
      await setDoc(doc(db, "content", activeTab), { text: formData[activeTab as keyof typeof formData] });
      setStatus(`${activeTab.toUpperCase()} salvato!`);
    } catch (e) {
      setStatus("Errore nel salvataggio.");
    }
  };

  if (!user) {
    // ... (lascia il tuo codice di login invariato) ...
    return <div style={{ padding: '50px', textAlign: 'center', color: '#fff' }}><h2>Login Riservato</h2>{/* ... */}</div>;
  }

  return (
    <div style={{ padding: '50px', color: '#fff', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Pannello Admin</h2>
      
      {/* Menu di Navigazione */}
      <div style={{ marginBottom: '20px' }}>
        {['bio', 'concerti', 'stream'].map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            style={{ marginRight: '10px', padding: '10px', background: activeTab === tab ? '#ff4444' : '#333', border: 'none', color: '#fff', cursor: 'pointer' }}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Area Contenuto */}
      <textarea 
        value={formData[activeTab as keyof typeof formData]}
        onChange={(e) => setFormData({...formData, [activeTab]: e.target.value})} 
        style={{ width: '100%', height: '200px', color: '#000', padding: '10px' }} 
      />
      
      <button onClick={handleSave} style={{ display: 'block', marginTop: '20px', padding: '10px', background: '#ff4444', border: 'none', color: '#fff', cursor: 'pointer' }}>
        Salva {activeTab.toUpperCase()}
      </button>
      <p>{status}</p>
      <button onClick={() => signOut(auth)} style={{ marginTop: '20px', background: 'none', border: '1px solid #fff', color: '#fff' }}>Logout</button>
    </div>
  )
}