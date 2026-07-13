'use client';
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';

export default function FotoPage() {
  const [fotoList, setFotoList] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDocs(collection(db, "foto"));
      // Mappiamo tutto l'oggetto del documento per avere sia src che type
      setFotoList(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, []);

  return (
    <main style={{ padding: '20px', background: '#000', minHeight: '100vh', textAlign: 'center', color: '#fff' }}>
      <h1 style={{ marginBottom: '20px' }}>GALLERIA</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {fotoList.map((item, i) => (
          <div key={i}>
            {item.type === 'video' ? (
              <iframe 
                src={item.src} 
                style={{ width: '100%', aspectRatio: '16/9', borderRadius: '8px' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            ) : (
              <img src={item.src} style={{ width: '100%', borderRadius: '8px' }} />
            )}
          </div>
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
    </main>
  );
}