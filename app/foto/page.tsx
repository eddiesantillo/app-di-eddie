'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function FotoPage() {
  const [fotoList, setFotoList] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, "content", "galleria"));
      if (snap.exists()) {
        setFotoList(snap.data().immagini || []);
      }
    };
    fetchData();
  }, []);

  return (
    <main style={{ padding: '20px', background: '#000', minHeight: '100vh', color: '#fff', textAlign: 'center' }}>
      <h1 style={{ color: '#dca355', marginBottom: '30px' }}>GALLERIA</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
        gap: '15px', 
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {fotoList.map((src, i) => (
          <img 
            key={i} 
            src={src} 
            alt={`Foto ${i}`} 
            style={{ width: '100%', borderRadius: '8px', border: '1px solid #333' }} 
          />
        ))}
      </div>

      <div style={{ marginTop: '40px' }}>
        <Link href="/" style={{ color: '#dca355', textDecoration: 'none', fontSize: '1.2rem' }}>
          ← Torna alla Home
        </Link>
      </div>
    </main>
  );
}