'use client';
import { useState, useEffect } from 'react';

export default function InstallBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Rileva se il dispositivo è iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(ios);

    // Controlla se l'app è già installata o se l'utente ha già chiuso il banner
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const dismissed = localStorage.getItem('pwa-dismissed');

    if (!isStandalone && !dismissed) {
      setShowBanner(true);
    }
  }, []);

  const dismiss = () => {
    setShowBanner(false);
    localStorage.setItem('pwa-dismissed', 'true');
  };

  if (!showBanner) return null;

  return (
    <div style={{
      position: 'fixed', bottom: '20px', left: '10px', right: '10px',
      background: '#000', 
      color: '#fff', 
      padding: '15px', 
      borderRadius: '12px',
      border: '2px solid #dca355', 
      zIndex: 9999, 
      textAlign: 'center',
      boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
      fontFamily: 'Arial, sans-serif'
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