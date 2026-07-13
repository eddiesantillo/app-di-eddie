'use client';
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';

export default function FotoPage() {
<<<<<<< HEAD
  const [fotoList, setFotoList] = useState<any[]>([]);
=======
  const [fotoList, setFotoList] = useState<string[]>([]);
>>>>>>> 1db3580c8fa366573bd50bf4686deac6fc7b97ce

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDocs(collection(db, "foto"));
<<<<<<< HEAD
      // Mappiamo tutto l'oggetto del documento per avere sia src che type
      setFotoList(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
=======
      setFotoList(snap.docs.map(doc => doc.data().src));
>>>>>>> 1db3580c8fa366573bd50bf4686deac6fc7b97ce
    };
    fetchData();
  }, []);

  return (
    <main style={{ padding: '20px', background: '#000', minHeight: '100vh', textAlign: 'center', color: '#fff' }}>
      <h1 style={{ marginBottom: '20px' }}>GALLERIA</h1>
      
<<<<<<< HEAD
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
=======
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px', marginBottom: '40px' }}>
        {fotoList.map((src, i) => (
          <img key={i} src={src} style={{ width: '100%', borderRadius: '8px' }} />
>>>>>>> 1db3580c8fa366573bd50bf4686deac6fc7b97ce
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
<<<<<<< HEAD
=======
      
      {/* //prova */}
>>>>>>> 1db3580c8fa366573bd50bf4686deac6fc7b97ce
    </main>
  );
}