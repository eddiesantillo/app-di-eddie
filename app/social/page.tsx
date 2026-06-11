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

  return (
    <main style={{ 
      display: 'flex', flexDirection: 'column', alignItems: 'center', 
      justifyContent: 'center', minHeight: '100vh', background: '#111', color: '#fff',
      padding: '20px', fontFamily: 'sans-serif'
    }}>
      <h1 style={{ marginBottom: '30px', fontSize: '2.5rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#dca355' }}>Social</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '450px' }}>
        {socialLinks.map((link, i) => (
          <a 
            key={i}
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              padding: '20px',
              background: 'linear-gradient(135deg, rgba(80,60,40,0.8) 0%, rgba(130,100,70,0.8) 100%)',
              color: '#fdf3e7', 
              textDecoration: 'none', 
              borderRadius: '12px', 
              fontSize: '1.4rem',
              fontWeight: 'bold',
              textAlign: 'center', 
              border: '3px solid #5d432c',
              boxShadow: '0 4px 10px rgba(0,0,0,0.5), inset 0 2px 5px rgba(255,255,255,0.1)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            {link.nome}
          </a>
        ))}
        
        <Link href="/" style={{ marginTop: '40px', color: '#dca355', textAlign: 'center', fontSize: '1.1rem', textDecoration: 'none' }}>← Torna alla Home</Link>
      </div>
    </main>
  );
}