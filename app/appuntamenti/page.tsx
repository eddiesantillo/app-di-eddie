'use client';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useRouter } from 'next/navigation';

export default function Appuntamenti() {
  const [concerti, setConcerti] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchConcerti = async () => {
<<<<<<< HEAD
      try {
        const snap = await getDoc(doc(db, "content", "Eddie Santillo"));
        if (snap.exists()) {
          const data = snap.data();
          // Leggiamo l'array dal database. Se è vuoto o non esiste, impostiamo un array vuoto
          const c = Array.isArray(data.calendario) ? data.calendario : [];
          setConcerti(c);
        }
      } catch (error) {
        console.error("Errore nel caricamento:", error);
=======
      const snap = await getDoc(doc(db, "content", "Eddie Santillo"));
      if (snap.exists()) {
        const c = snap.data().calendario || [];
        // Ordiniamo tutti gli eventi per dataISO (i campi senza data vanno in fondo)
        const ordinati = c.sort((a: any, b: any) => {
          if (!a.dataISO) return 1;
          if (!b.dataISO) return -1;
          return new Date(a.dataISO).getTime() - new Date(b.dataISO).getTime();
        });
        setConcerti(ordinati);
>>>>>>> 1db3580c8fa366573bd50bf4686deac6fc7b97ce
      }
    };
    fetchConcerti();
  }, []);

<<<<<<< HEAD
  // Filtriamo gli eventi per tipo
  const attiviRL = concerti.filter(c => c.tipo === 'RL');
  const attiviSL = concerti.filter(c => c.tipo === 'SL');
=======
  const oggi = new Date().toISOString().split('T')[0];

  // Filtriamo gli eventi per tipo E per data
  const attiviRL = concerti.filter(c => c.tipo === 'RL' && (!c.dataISO || c.dataISO >= oggi));
  const passatiRL = concerti.filter(c => c.tipo === 'RL' && c.dataISO && c.dataISO < oggi);
  
  const attiviSL = concerti.filter(c => c.tipo === 'SL' && (!c.dataISO || c.dataISO >= oggi));
  const passatiSL = concerti.filter(c => c.tipo === 'SL' && c.dataISO && c.dataISO < oggi);
>>>>>>> 1db3580c8fa366573bd50bf4686deac6fc7b97ce

  const renderEvento = (c: any, index: number) => (
    <div key={index} style={{ background: '#1a1a1a', padding: '15px', margin: '15px 0', border: `1px solid ${c.tipo === 'SL' ? '#66ccff' : '#dca355'}`, borderRadius: '8px' }}>
      <h3 style={{ margin: '0 0 5px 0' }}>{c.nome}</h3>
      <p style={{ margin: '0', fontSize: '0.9rem' }}>{c.giorno} - {c.ora}</p>
<<<<<<< HEAD
      {c.link && (
        <a href={c.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '10px', color: c.tipo === 'SL' ? '#66ccff' : '#dca355' }}>
          {c.tipo === 'SL' ? 'Entra in Second Life' : 'Vedi sulla mappa'}
        </a>
      )}
=======
      {c.link && <a href={c.link} target="_blank" style={{ display: 'block', marginTop: '10px', color: c.tipo === 'SL' ? '#66ccff' : '#dca355' }}>
        {c.tipo === 'SL' ? 'Entra in Second Life' : 'Vedi sulla mappa'}
      </a>}
>>>>>>> 1db3580c8fa366573bd50bf4686deac6fc7b97ce
    </div>
  );

  return (
    <div style={{ padding: '20px', color: '#fff', maxWidth: '600px', margin: '0 auto' }}>
      <button onClick={() => router.back()} style={{ background: 'transparent', border: '1px solid #444', color: '#888', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px' }}>← Torna indietro</button>

      <h2 style={{ textAlign: 'center', color: '#dca355', textTransform: 'uppercase', marginBottom: '40px' }}>Prossimi Live</h2>
      
      {/* SEZIONE RL */}
      <h3 style={{ color: '#dca355', marginTop: '30px', borderBottom: '1px solid #444', textAlign: 'center' }}>ON STAGE (RL)</h3>
      {attiviRL.length === 0 ? <p style={{opacity: 0.5, textAlign: 'center'}}>Nessun evento in programma.</p> : attiviRL.map(renderEvento)}

      {/* SEZIONE SL */}
      <h3 style={{ color: '#66ccff', marginTop: '30px', borderBottom: '1px solid #444', textAlign: 'center' }}>SECOND LIFE (SL)</h3>
      {attiviSL.length === 0 ? <p style={{opacity: 0.5, textAlign: 'center'}}>Nessun evento in programma.</p> : attiviSL.map(renderEvento)}
<<<<<<< HEAD
=======

      {/* SEZIONE PASSATI */}
      {(passatiRL.length > 0 || passatiSL.length > 0) && (
        <details style={{ marginTop: '40px', border: '1px solid #333', padding: '10px', borderRadius: '8px' }}>
          <summary style={{ cursor: 'pointer', color: '#888' }}>Mostra eventi passati</summary>
          {passatiRL.map(renderEvento)}
          {passatiSL.map(renderEvento)}
        </details>
      )}
>>>>>>> 1db3580c8fa366573bd50bf4686deac6fc7b97ce
    </div>
  );
}