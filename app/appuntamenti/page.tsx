'use client';
import { useEffect, useState } from 'react';

export default function Appuntamenti() {
  const [concerti, setConcerti] = useState([]);

  useEffect(() => {
    fetch('/api/concerti')
      .then(res => res.json())
      .then(data => setConcerti(data));
  }, []);

  return (
    <div style={{ padding: '20px', color: '#fff', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#dca355', textTransform: 'uppercase' }}>Prossimi Live</h2>
      {concerti.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '40px' }}>Nessun concerto in programma al momento.</p>
      ) : (
        concerti.map((c: any, index) => (
          <div key={index} style={{
            background: '#1a1a1a', padding: '15px', margin: '15px 0',
            border: '1px solid #dca355', borderRadius: '8px'
          }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#fff' }}>{c.title}</h3>
            <p style={{ margin: '0', fontSize: '0.9rem', opacity: 0.8 }}>
              Data: {new Date(c.start).toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            {c.location && <p style={{ margin: '0', fontSize: '0.8rem', opacity: 0.6 }}>Luogo: {c.location}</p>}
          </div>
        ))
      )}
    </div>
  );
}