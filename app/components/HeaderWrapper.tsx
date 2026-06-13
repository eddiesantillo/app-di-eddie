'use client';
import { usePathname } from 'next/navigation';

export default function HeaderWrapper() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isSocialPage = pathname === '/social';
  const showHeader = !isHome && !isSocialPage;

  if (!showHeader) return null;

  return (
    <header style={{ padding: '40px 20px', textAlign: 'center' }}>
      <img src="/logo.png" alt="Logo Eddie Santillo" style={{ width: '150px', display: 'block', margin: '0 auto' }} />
      <h1 style={{ marginTop: '25px', fontSize: '2rem' }}>Eddie Santillo</h1>
    </header>
  );
}