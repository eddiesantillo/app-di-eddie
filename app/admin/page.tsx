'use client'
import { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function AdminPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<any>(null);
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');

  const auth = getAuth();

  // Controlla se l'utente è già loggato
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [auth]);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      alert("Credenziali errate!");
    }
  };

  const saveToFirebase = async () => {
    await setDoc(doc(db, "content", "bio"), { text: text });
    setStatus("Biografia salvata!");
  };

  if (!user) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', color: '#fff' }}>
        <h2>Login Riservato</h2>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={{ display: 'block', margin: '10px auto', padding: '10px', color: '#000' }} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={{ display: 'block', margin: '10px auto', padding: '10px', color: '#000' }} />
        <button onClick={handleLogin} style={{ padding: '10px 20px', background: '#ff4444', border: 'none', color: '#fff' }}>Entra</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '50px', color: '#fff', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Pannello Riservato (Loggato come: {user.email})</h2>
      <textarea onChange={(e) => setText(e.target.value)} style={{ width: '100%', height: '200px', color: '#000', padding: '10px' }} />
      <button onClick={saveToFirebase} style={{ display: 'block', marginTop: '20px', padding: '10px', background: '#ff4444', border: 'none', color: '#fff' }}>Salva Bio</button>
      <p>{status}</p>
    </div>
  )
}