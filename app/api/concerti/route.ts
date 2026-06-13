import { NextResponse } from 'next/server';
import ical from 'node-ical';

export async function GET() {
  const ICAL_URL = 'https://calendar.google.com/calendar/ical/eddiesantillomusic%40gmail.com/private-51ab70b4f4d73ca87db2720a7c3b3a65/basic.icsCAL';

  try {
    const webEvents = await ical.async.fromURL(ICAL_URL);
    
    // Filtriamo solo gli eventi che contengono "EDDIE:" nel titolo
    const events = Object.values(webEvents)
      .filter((event: any) => 
        event.type === 'VEVENT' && 
        event.summary && 
        event.summary.includes('EDDIE:') // <--- FILTRO: Mostra solo eventi con questo prefisso
      )
      .map((event: any) => ({
        // Rimuoviamo il prefisso "EDDIE:" dal titolo per la visualizzazione pulita
        title: event.summary.replace('EDDIE:', '').trim(),
        start: event.start,
        location: event.location,
        description: event.description
      }))
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: 'Errore nel recupero calendario' }, { status: 500 });
  }
}