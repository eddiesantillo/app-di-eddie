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
    <main style={{ padding: '50px', textAlign: 'center', color: '#fff', fontFamily: 'sans-serif' }}>
      <h1>Il Mio Shop</h1>
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