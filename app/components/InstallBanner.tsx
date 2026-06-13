'use client';
import { useState, useEffect } from 'react';

export default function InstallBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Rileva iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(ios);

    // Controlla se è standalone
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    
    console.log("InstallBanner: caricato. IsStandalone:", isStandalone);

    // Se non è standalone, mostriamo il banner
    if (!isStandalone) {
      setShowBanner(true);
    }
  }, []);

  const dismiss = () => {
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div style={{
      position: 'fixed', bottom: '20px', left: '10px', right: '10px',
      background: '#000', color: '#fff', padding: '15px', borderRadius: '12px',
      border: '2px solid #dca355', zIndex: 9999, textAlign: 'center',
      boxShadow: '0 4px 15px rgba(0,0,0,0.5)', fontFamily: 'Arial, sans-serif'
    }}>
      <button onClick={dismiss} style={{
        float: 'right', background: 'none', border: 'none', 
        color: '#dca355', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.2rem'
      }}>X</button>
      
      <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#dca355', textTransform: 'uppercase', letterSpacing: '1px' }}>
        Porta Eddie sempre con te!
      </p>
      
      {isIOS ? (
        <p style={{ margin: '0', fontSize: '0.9rem' }}>
          Tocca il tasto <b>Condividi</b> e seleziona <b>"Aggiungi alla schermata Home"</b>.
        </p>
      ) : (
        <p style={{ margin: '0', fontSize: '0.9rem' }}>
          Tocca il menu del browser (⋮) e seleziona <b>"Aggiungi a schermata Home"</b>.
        </p>
      )}
    </div>
  );
}