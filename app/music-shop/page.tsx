'use client';
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function ShopPage() {
  const [shopItems, setShopItems] = useState<any[]>([]);

  useEffect(() => {
    async function fetchShop() {
      const snap = await getDoc(doc(db, "content", "Eddie Santillo"));
      if (snap.exists()) {
        setShopItems(snap.data().shop || []);
      }
    }
    fetchShop();
  }, []);

  return (
    <main style={{ padding: '50px 20px', textAlign: 'center', color: '#fff', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Testo di benvenuto rimpicciolito ed elegante */}
      <h1 style={{ 
        marginBottom: '40px', 
        fontSize: '1.2rem', 
        lineHeight: '1.6', 
        maxWidth: '500px', 
        margin: '0 auto 40px auto', 
        fontWeight: 'normal',
        opacity: 0.9 
      }}>
        Benvenuto nel mio negozio online. Esplora la mia discografia e acquista i tuoi album preferiti.
      </h1>

      <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
        {shopItems.map((item, index) => (
          <a 
            key={index} 
            href={item.url} 
            target="_blank" 
            style={{ 
              display: 'block',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img 
              src={`/${item.titolo.toLowerCase()}.jpeg`} 
              alt={item.titolo} 
              style={{ 
                width: '200px', 
                height: 'auto', 
                borderRadius: '8px',
                display: 'block'
              }}
            />
          </a>
        ))}
      </div>
    </main>
  );
}