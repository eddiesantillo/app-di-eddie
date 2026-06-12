'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function SocialPage() {
  const [socialLinks, setSocialLinks] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, "content", "Eddie Santillo"));
      if (snap.exists()) {
        setSocialLinks(snap.data().social || []);
      }
    };
    fetchData();
  }, []);

  // Aggiornato per corrispondere esattamente ai nomi nel tuo database
  const getIconPath = (nome: string) => {
    switch(nome) {
      case 'Facebook': return '/facebook.jpeg';
      case 'Instagram': return '/instagram.jpeg';
      case 'Youtube': return '/youtube.jpeg';
      case 'TikTok': return '/tiktok.jpeg';
      default: return '/social-btn.png';
    }
  };

  return (
    <main style={{ 
      display: 'flex', flexDirection: 'column', alignItems: 'center', 
      justifyContent: 'center', minHeight: '100vh', background: '#000', color: '#fff',
      padding: '20px'
    }}>
      <h1 style={{ marginBottom: '30px', fontSize: '2rem', color: '#dca355' }}>SOCIAL</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '15px', 
        width: '100%', 
        maxWidth: '400px' 
      }}>
        {socialLinks.map((link, i) => (
          <a 
            key={i}
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: 'block' }}
          >
            <img 
              src={getIconPath(link.nome)} 
              alt={link.nome} 
              style={{ width: '100%', borderRadius: '12px', display: 'block' }} 
            />
          </a>
        ))}
      </div>
      
      <Link href="/" style={{ marginTop: '40px', color: '#dca355', fontSize: '1.1rem' }}>
        ← Torna alla Home
      </Link>
    </main>
  );
}