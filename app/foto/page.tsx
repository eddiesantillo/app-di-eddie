'use client';
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';

export default function FotoPage() {
  const [fotoList, setFotoList] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDocs(collection(db, "foto"));
      setFotoList(snap.docs.map(doc => doc.data().src));
    };
    fetchData();
  }, []);

  return (
    <main style={{ padding: '20px', background: '#000', minHeight: '100vh', textAlign: 'center', color: '#fff' }}>
      <h1 style={{ marginBottom: '20px' }}>GALLERIA</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px', marginBottom: '40px' }}>
        {fotoList.map((src, i) => (
          <img key={i} src={src} style={{ width: '100%', borderRadius: '8px' }} />
        ))}
      </div>

      <Link href="/" style={{ 
        display: 'inline-block', 
        padding: '10px 20px', 
        background: '#333', 
        color: '#fff', 
        textDecoration: 'none', 
        borderRadius: '5px' 
      }}>
        ← Torna alla Home
      </Link>
      
      {/* //prova */}
    </main>
  );
}