import { db } from '../../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const docRef = doc(db, "content", "Eddie Santillo");
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) return new Response('Configurazione non trovata', { status: 404 });

    const streamUrl = docSnap.data().radio?.url;
    if (!streamUrl) return new Response('URL non trovato', { status: 404 });
    
    // Aggiungiamo un timeout e headers corretti per Icecast
    const response = await fetch(streamUrl, {
      headers: { 
        'Accept': 'audio/mpeg',
        'User-Agent': 'Mozilla/5.0' // Alcuni server Icecast bloccano fetch senza User-Agent
      }
    });

    return new Response(response.body, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    return new Response('Errore stream', { status: 500 });
  }
}