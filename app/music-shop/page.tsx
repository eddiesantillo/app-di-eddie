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
      <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
        {shopItems.map((item, index) => (
          <a 
            key={index} 
            href={item.url} 
            target="_blank" 
            style={{ 
              padding: '15px 30px', 
              background: '#d4af37', 
              color: '#000', 
              textDecoration: 'none', 
              borderRadius: '8px', 
              fontWeight: 'bold',
              width: '200px'
            }}
          >
            {item.titolo}
          </a>
        ))}
      </div>
    </main>
  );
}