import Link from 'next/link';

export default function SocialPage() {
  const socialLinks = [
    { name: 'Facebook', url: 'https://www.facebook.com/EDDIESANTILLO.FANPAGE' },
    { name: 'Instagram', url: 'https://www.instagram.com/eddiesantillo/' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@eddiesantillo' },
    { name: 'YouTube', url: 'https://www.youtube.com/@EddieSantillo' },
    { name: 'Spotify', url: 'https://open.spotify.com/intl-it/artist/2tiTkp69g3sVk7nKMZq6Qi' },
  ];

  return (
    <main style={{ 
      display: 'flex', flexDirection: 'column', alignItems: 'center', 
      justifyContent: 'center', minHeight: '100vh', background: '#111', color: '#fff',
      padding: '20px', fontFamily: 'sans-serif'
    }}>
      <h1 style={{ marginBottom: '30px', fontSize: '2.5rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#dca355' }}>Social</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '450px' }}>
        {socialLinks.map((link) => (
          <a 
            key={link.name}
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              padding: '20px',
              // Grafica Steampunk: Gradiente ottonato
              background: 'linear-gradient(135deg, rgba(80,60,40,0.8) 0%, rgba(130,100,70,0.8) 100%)',
              color: '#fdf3e7', 
              textDecoration: 'none', 
              borderRadius: '12px', 
              fontSize: '1.4rem',
              fontWeight: 'bold',
              textAlign: 'center', 
              // Bordo rame antico
              border: '3px solid #5d432c',
              // Ombre per profondità
              boxShadow: '0 4px 10px rgba(0,0,0,0.5), inset 0 2px 5px rgba(255,255,255,0.1)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            {link.name}
          </a>
        ))}
        
        <Link href="/" style={{ marginTop: '40px', color: '#dca355', textAlign: 'center', fontSize: '1.1rem', textDecoration: 'none' }}>← Torna alla Home</Link>
      </div>
    </main>
  );
}