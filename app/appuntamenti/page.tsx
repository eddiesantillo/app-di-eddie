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
      const snap = await getDoc(doc(db, "content", "Eddie Santillo"));
      if (snap.exists()) {
        const data = snap.data();
        const c = Array.isArray(data.calendario) ? data.calendario : [];
        
        const mesiMap: { [key: string]: number } = {
          'GENNAIO': 0, 'FEBBRAIO': 1, 'MARZO': 2, 'APRILE': 3,
          'MAGGIO': 4, 'GIUGNO': 5, 'LUGLIO': 6, 'AGOSTO': 7,
          'SETTEMBRE': 8, 'OTTOBRE': 9, 'NOVEMBRE': 10, 'DICEMBRE': 11
        };

        const parseDataGiorno = (giornoStr: string) => {
          if (!giornoStr) return new Date(9999, 0, 1);
          const parti = giornoStr.trim().toUpperCase().split(/\s+/);
          if (parti.length >= 2) {
            const giornoNum = parseInt(parti[0], 10);
            const meseStr = parti[1];
            const meseNum = mesiMap[meseStr];

            let annoNum = 2026; // Default di fallback per i vecchi appuntamenti
            const parteAnno = parti.find(p => /^\d{4}$/.test(p));
            if (parteAnno) {
              annoNum = parseInt(parteAnno, 10);
            }

            if (!isNaN(giornoNum) && meseNum !== undefined) {
              return new Date(annoNum, meseNum, giornoNum);
            }
          }
          return new Date(9999, 0, 1);
        };

        const conDate = c.map((item: any) => ({
          ...item,
          _dataParsed: parseDataGiorno(item.giorno)
        }));

        conDate.sort((a: any, b: any) => a._dataParsed.getTime() - b._dataParsed.getTime());
        setConcerti(conDate);
      }
    };
    fetchConcerti();
  }, []);

  const oggi = new Date();
  oggi.setHours(0, 0, 0, 0);

  const attiviRL = concerti.filter(c => c.tipo === 'RL' && c._dataParsed >= oggi);
  const passatiRL = concerti.filter(c => c.tipo === 'RL' && c._dataParsed < oggi)
                            .sort((a, b) => b._dataParsed.getTime() - a._dataParsed.getTime());
  
  const attiviSL = concerti.filter(c => c.tipo === 'SL' && c._dataParsed >= oggi);
  const passatiSL = concerti.filter(c => c.tipo === 'SL' && c._dataParsed < oggi)
                            .sort((a, b) => b._dataParsed.getTime() - a._dataParsed.getTime());

  const renderEvento = (c: any, index: number) => (
    <div key={index} style={{ background: '#1a1a1a', padding: '15px', margin: '15px 0', border: `1px solid ${c.tipo === 'SL' ? '#66ccff' : '#dca355'}`, borderRadius: '8px' }}>
      <h3 style={{ margin: '0 0 5px 0' }}>{c.nome}</h3>
      <p style={{ margin: '0', fontSize: '0.9rem' }}>{c.giorno} - {c.ora}</p>
      {c.link && (
        <a href={c.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '10px', color: c.tipo === 'SL' ? '#66ccff' : '#dca355' }}>
          {c.tipo === 'SL' ? 'Entra in Second Life' : 'Vedi sulla mappa'}
        </a>
      )}
    </div>
  );

  return (
    <div style={{ padding: '20px', color: '#fff', maxWidth: '600px', margin: '0 auto' }}>
      <button onClick={() => router.back()} style={{ background: 'transparent', border: '1px solid #444', color: '#888', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px' }}>← Torna indietro</button>

      <h2 style={{ textAlign: 'center', color: '#dca355', textTransform: 'uppercase', marginBottom: '40px' }}>Prossimi Live</h2>
      
      {/* SEZIONE ON STAGE (RL) */}
      <h3 style={{ color: '#dca355', marginTop: '30px', borderBottom: '1px solid #444', textAlign: 'center' }}>ON STAGE (RL)</h3>
      {attiviRL.length === 0 ? <p style={{opacity: 0.5, textAlign: 'center'}}>Nessun evento in programma.</p> : attiviRL.map(renderEvento)}

      {passatiRL.length > 0 && (
        <details style={{ marginTop: '15px', border: '1px solid #444', padding: '10px', borderRadius: '8px' }}>
          <summary style={{ cursor: 'pointer', color: '#dca355', fontSize: '0.9rem' }}>Mostra eventi passati (RL)</summary>
          {passatiRL.map(renderEvento)}
        </details>
      )}

      {/* SEZIONE SECOND LIFE (SL) */}
      <h3 style={{ color: '#66ccff', marginTop: '40px', borderBottom: '1px solid #444', textAlign: 'center' }}>SECOND LIFE (SL)</h3>
      {attiviSL.length === 0 ? <p style={{opacity: 0.5, textAlign: 'center'}}>Nessun evento in programma.</p> : attiviSL.map(renderEvento)}

      {passatiSL.length > 0 && (
        <details style={{ marginTop: '15px', border: '1px solid #444', padding: '10px', borderRadius: '8px' }}>
          <summary style={{ cursor: 'pointer', color: '#66ccff', fontSize: '0.9rem' }}>Mostra eventi passati (Second Life)</summary>
          {passatiSL.map(renderEvento)}
        </details>
      )}
    </div>
  );
}