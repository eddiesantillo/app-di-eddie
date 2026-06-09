'use client'
import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function BioPage() {
  const [bio, setBio] = useState('Caricamento biografia...');

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, "content", "bio");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBio(docSnap.data().descrizione);
        } else {
          setBio("Biografia non ancora inserita.");
        }
      } catch (e) {
        setBio("Errore nel caricamento.");
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{ padding: '50px', color: '#fff', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: '#ff4444' }}>Biografia</h2>
      <div style={{ marginTop: '30px', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
        {bio}
      </div>
    </div>
  )
}