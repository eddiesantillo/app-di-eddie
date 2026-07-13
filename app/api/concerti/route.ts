import { NextResponse } from 'next/server';
import { db } from '../../../lib/firebase'; // Assicurati che il percorso sia corretto
import { collection, getDocs } from 'firebase/firestore';

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, 'concerti'));
    const concerti = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Ordiniamo per data
    concerti.sort((a: any, b: any) => new Date(a.start).getTime() - new Date(b.start).getTime());
    
    return NextResponse.json(concerti);
  } catch (error) {
    return NextResponse.json({ error: 'Errore recupero da Firebase' }, { status: 500 });
  }
}