'use client';
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function ContattiPage() {
  const [contatti, setContatti] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, "content", "Eddie Santillo"));
      if (snap.exists() && snap.data().contatti) {
        setContatti(snap.data().contatti);
      }
    };
    fetchData();
  }, []);

  const getButtons = (titolo: string, valore: string) => {
    const t = titolo.toLowerCase();
    const v = valore.replace(/\s/g, ''); 
    const buttons = [];

    if (t.includes('telefono') || t.includes('cell')) {
      buttons.push({ href: `tel:${v}`, text: '📞 Chiama', bg: '#25D366' }); // Verde per chiamata/WA
      buttons.push({ href: `https://wa.me/${v.replace('+', '')}`, text: '💬 WhatsApp', bg: '#128C7E' });
    } else if (t.includes('email')) {
      buttons.push({ href: `mailto:${valore}`, text: '📧 Invia Email', bg: '#dca355' });
    }
    return buttons;
  };

  return (
    <main style={{ padding: '40px 20px', color: '#fff', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      
      <a href="/" style={{ 
        display: 'inline-block', marginBottom: '30px', color: '#dca355', 
        textDecoration: 'none', fontSize: '0.9rem', border: '1px solid #dca355',
        padding: '8px 16px', borderRadius: '20px'
      }}>← Torna alla Home</a>

      <h1 style={{ marginBottom: '30px' }}>CONTATTI</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {contatti.map((c: any, i: number) => {
          const btns = getButtons(c.titolo, c.valore);
          return (
            <div key={i} style={{ background: '#252525', padding: '20px', borderRadius: '12px' }}>
              <p style={{ margin: '0 0 15px 0', opacity: 0.8 }}>{c.titolo}: <strong>{c.valore}</strong></p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {btns.map((btn, index) => (
                  <a key={index} href={btn.href} style={{ 
                    padding: '12px 20px', background: btn.bg,
                    color: '#fff', borderRadius: '50px', textDecoration: 'none', 
                    fontWeight: 'bold', fontSize: '0.9rem', transition: 'transform 0.2s'
                  }}>
                    {btn.text}
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}