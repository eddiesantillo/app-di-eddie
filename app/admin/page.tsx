'use client'
import { useState, useEffect } from 'react';
// IMPORTIAMO auth e db CORRETTI dal nostro file di configurazione
import { auth, db } from '../../lib/firebase'; 
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function AdminPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<any>(null);
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');

  // Controlla se l'utente è già loggato
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      console.error("Errore login:", e.message);
      alert("Errore: " + e.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const saveToFirebase = async () => {
    try {
      await setDoc(doc(db, "content", "bio"), { text: text });
      setStatus("Biografia salvata!");
    } catch (e) {
      setStatus("Errore nel salvataggio.");
    }
  };

  if (!user) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', color: '#fff' }}>
        <h2>Login Riservato</h2>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={{ display: 'block', margin: '10px auto', padding: '10px', color: '#000' }} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={{ display: 'block', margin: '10px auto', padding: '10px', color: '#000' }} />
        <button onClick={handleLogin} style={{ padding: '10px 20px', background: '#ff4444', border: 'none', color: '#fff', cursor: 'pointer' }}>Entra</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '50px', color: '#fff', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Pannello Riservato (Loggato come: {user.email})</h2>
      <button onClick={handleLogout} style={{ marginBottom: '20px', padding: '5px 10px' }}>Logout</button>
      <textarea onChange={(e) => setText(e.target.value)} style={{ width: '100%', height: '200px', color: '#000', padding: '10px' }} />
      <button onClick={saveToFirebase} style={{ display: 'block', marginTop: '20px', padding: '10px', background: '#ff4444', border: 'none', color: '#fff', cursor: 'pointer' }}>Salva Bio</button>
      <p>{status}</p>
    </div>
  )
}