import { db } from '../../../lib/firebase'; // Usa il file che esiste già!
import { doc, getDoc } from 'firebase/firestore';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const docRef = doc(db, "content", "Eddie Santillo");
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return new Response('Configurazione non trovata', { status: 404 });
    }

    // Assumendo che la struttura sia: radio { url: '...' }
    const streamUrl = docSnap.data().radio?.url;

    if (!streamUrl) {
      return new Response('URL stream non trovato nel database', { status: 404 });
    }
    
    const response = await fetch(streamUrl, {
      headers: { 'Accept': 'audio/mpeg' }
    });

    return new Response(response.body, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Transfer-Encoding': 'chunked',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response('Errore server: ' + error, { status: 500 });
  }
}