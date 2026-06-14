'use client';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useRouter } from 'next/navigation'; // Importiamo useRouter per la navigazione

export default function Appuntamenti() {
  const [concerti, setConcerti] = useState<any[]>([]);
  const router = useRouter(); // Inizializziamo il router

  useEffect(() => {
    const fetchConcerti = async () => {
      const snap = await getDoc(doc(db, "content", "Eddie Santillo"));
      if (snap.exists()) {
        const c = snap.data().calendario || [];
        setConcerti(c);
      }
    };
    fetchConcerti();
  }, []);

  const eventiRL = concerti.filter((c: any) => c.tipo === 'RL');
  const eventiSL = concerti.filter((c: any) => c.tipo === 'SL');

  return (
    <div style={{ padding: '20px', color: '#fff', maxWidth: '600px', margin: '0 auto' }}>
      
      {/* Pulsante Indietro aggiunto qui */}
      <button 
        onClick={() => router.back()} 
        style={{ 
          background: 'transparent', 
          border: '1px solid #444', 
          color: '#888', 
          padding: '8px 16px', 
          borderRadius: '4px', 
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        ← Torna indietro
      </button>

      <h2 style={{ textAlign: 'center', color: '#dca355', textTransform: 'uppercase', marginBottom: '40px' }}>Prossimi Live</h2>
      
      {/* SEZIONE RL */}
      <h3 style={{ color: '#dca355', marginTop: '30px', borderBottom: '1px solid #444', textAlign: 'center' }}>ON STAGE (RL)</h3>
      {eventiRL.length === 0 ? <p style={{opacity: 0.5, textAlign: 'center'}}>Nessun evento in programma.</p> : 
        eventiRL.map((c: any, index) => (
          <div key={index} style={{ background: '#1a1a1a', padding: '15px', margin: '15px 0', border: '1px solid #dca355', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 5px 0' }}>{c.nome}</h3>
            <p style={{ margin: '0', fontSize: '0.9rem' }}>{c.giorno} - {c.ora}</p>
            {c.link && <a href={c.link} target="_blank" style={{ display: 'block', marginTop: '10px', color: '#dca355' }}>Vedi sulla mappa</a>}
          </div>
        ))
      }

      {/* SEZIONE SL */}
      <h3 style={{ color: '#66ccff', marginTop: '30px', borderBottom: '1px solid #444', textAlign: 'center' }}>SECOND LIFE (SL)</h3>
      {eventiSL.length === 0 ? <p style={{opacity: 0.5, textAlign: 'center'}}>Nessun evento in programma.</p> : 
        eventiSL.map((c: any, index) => (
          <div key={index} style={{ background: '#1a1a1a', padding: '15px', margin: '15px 0', border: '1px solid #66ccff', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 5px 0' }}>{c.nome}</h3>
            <p style={{ margin: '0', fontSize: '0.9rem' }}>{c.giorno} - {c.ora}</p>
            {c.link && <a href={c.link} target="_blank" style={{ display: 'block', marginTop: '10px', color: '#66ccff' }}>Entra in Second Life</a>}
          </div>
        ))
      }
    </div>
  );
}