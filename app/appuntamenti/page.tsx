'use client';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function Appuntamenti() {
  const [concerti, setConcerti] = useState<any[]>([]);

  useEffect(() => {
    const fetchConcerti = async () => {
      const snap = await getDoc(doc(db, "content", "Eddie Santillo"));
      if (snap.exists()) {
        const oggi = new Date();
        oggi.setHours(0, 0, 0, 0); // Azzera l'ora per confronto preciso

        const c = snap.data().calendario || [];
        // Filtriamo: teniamo solo eventi >= oggi e ordiniamo
        const futuri = c.filter((evento: any) => new Date(evento.start) >= oggi);
        setConcerti(futuri.sort((a: any, b: any) => new Date(a.start).getTime() - new Date(b.start).getTime()));
      }
    };
    fetchConcerti();
  }, []);

  const eventiRL = concerti.filter((c: any) => c.tipo === 'RL' || !c.tipo);
  const eventiSL = concerti.filter((c: any) => c.tipo === 'SL');

  return (
    <div style={{ padding: '20px', color: '#fff', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#dca355', textTransform: 'uppercase', marginBottom: '40px' }}>Prossimi Live</h2>
      
      <h3 style={{ color: '#dca355', marginTop: '30px', borderBottom: '1px solid #444', textAlign: 'center' }}>ON STAGE (RL)</h3>
      {eventiRL.length === 0 ? <p style={{opacity: 0.5, textAlign: 'center'}}>Nessun evento in programma.</p> : 
        eventiRL.map((c: any, index) => (
          <div key={index} style={{ background: '#1a1a1a', padding: '15px', margin: '15px 0', border: '1px solid #dca355', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 5px 0' }}>{c.title}</h3>
            <p style={{ margin: '0', fontSize: '0.9rem' }}>Data: {new Date(c.start).toLocaleDateString('it-IT')}</p>
            <p style={{ margin: '0', fontSize: '0.8rem', opacity: 0.7 }}>Luogo: {c.location}</p>
            {c.link && <a href={c.link} target="_blank" style={{ display: 'block', marginTop: '10px', color: '#dca355' }}>Vedi sulla mappa</a>}
          </div>
        ))
      }

      <h3 style={{ color: '#66ccff', marginTop: '30px', borderBottom: '1px solid #444', textAlign: 'center' }}>SECOND LIFE (SL)</h3>
      {eventiSL.length === 0 ? <p style={{opacity: 0.5, textAlign: 'center'}}>Nessun evento in programma.</p> : 
        eventiSL.map((c: any, index) => (
          <div key={index} style={{ background: '#1a1a1a', padding: '15px', margin: '15px 0', border: '1px solid #66ccff', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 5px 0' }}>{c.title}</h3>
            <p style={{ margin: '0', fontSize: '0.9rem' }}>Data: {new Date(c.start).toLocaleDateString('it-IT')}</p>
            <p style={{ margin: '0', fontSize: '0.8rem', opacity: 0.7 }}>Luogo: {c.location}</p>
            {c.link && <a href={c.link} target="_blank" style={{ display: 'block', marginTop: '10px', color: '#66ccff' }}>Entra in Second Life</a>}
          </div>
        ))
      }
    </div>
  );
}