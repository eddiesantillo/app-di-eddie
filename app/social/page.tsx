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

  const getIconPath = (nome: string) => {
    const map: { [key: string]: string } = {
      'Facebook': 'facebook',
      'Instagram': 'instagram',
      'Youtube': 'youtube',
      'TikTok': 'tiktok',
      'Spotify': 'spotify'
    };
    const baseName = map[nome] || 'social-btn';
    return `/${baseName}.jpeg`;
  };

  return (
    <main style={{ 
      display: 'flex', flexDirection: 'column', alignItems: 'center', 
      justifyContent: 'center', minHeight: '100vh', background: '#000', color: '#fff',
      padding: '20px'
    }}>
      {/* Titolo "SOCIAL" rimosso come richiesto */}
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '20px', 
        width: '100%', 
        maxWidth: '400px',
        marginTop: '20px'
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
              style={{ width: '100%', borderRadius: '12px', display: 'block', border: '1px solid #dca355' }} 
            />
          </a>
        ))}
      </div>
      
      <Link href="/" style={{ marginTop: '40px', color: '#dca355', fontSize: '1.1rem', textDecoration: 'none' }}>
        ← Torna alla Home
      </Link>
    </main>
  );
}