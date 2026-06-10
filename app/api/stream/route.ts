import { db } from '../../../lib/firebase-admin'; // Assicurati che sia il file corretto
import { doc, getDoc } from 'firebase/firestore';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Recupera l'URL dal database
    const docRef = doc(db, "content", "Eddie Santillo");
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return new Response('Configurazione non trovata', { status: 404 });
    }

    const streamUrl = docSnap.data().radio.url; 
    
    // 2. Fetch dello stream Icecast
    // Nota: se il tuo Icecast ha bisogno di headers particolari (es. Icy-MetaData), 
    // puoi aggiungerli qui sotto
    const response = await fetch(streamUrl, {
      headers: { 
        'Accept': 'audio/mpeg',
        'Icy-MetaData': '1' // Spesso utile per Icecast
      }
    });

    if (!response.ok) {
        return new Response('Errore sorgente stream', { status: 502 });
    }

    return new Response(response.body, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Transfer-Encoding': 'chunked',
        'Access-Control-Allow-Origin': '*',
        // Importante per Icecast/Shoutcast lato client
        'icy-metaint': response.headers.get('icy-metaint') || '0',
      },
    });
  } catch (error) {
    return new Response('Errore interno stream', { status: 500 });
  }
}