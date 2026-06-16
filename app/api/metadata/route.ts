import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Aggiungiamo il timestamp alla query string per evitare cache del server esterno
    const timestamp = Date.now();
    const response = await fetch(`https://artemis.streamerr.co/api/nowplaying/eddie_santillo?t=${timestamp}`, {
      headers: { 
        'User-Agent': 'Mozilla/5.0',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      next: { revalidate: 0 }
    });
    
    if (!response.ok) throw new Error('Failed to fetch');
    
    const data = await response.json();
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Expires': '0',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Errore nel recupero metadati' }, { status: 500 });
  }
}