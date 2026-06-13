import { NextResponse } from 'next/server';

// Usiamo require per massima compatibilità con il sistema di build di Vercel
const ical = require('node-ical');

export async function GET() {
  // Inserisci qui il tuo URL segreto iCal preso da Google Calendar
  const ICAL_URL = 'https://calendar.google.com/calendar/ical/eddiesantillomusic%40gmail.com/private-51ab70b4f4d73ca87db2720a7c3b3a65/basic.ics'; 

  try {
    // Recuperiamo il calendario
    const webEvents = await ical.async.fromURL(ICAL_URL);
    
    // Filtriamo e formattiamo gli eventi
    const events = Object.values(webEvents)
      .filter((event: any) => 
        event.type === 'VEVENT' && 
        event.summary && 
        event.summary.includes('EDDIE:') // Filtro: solo eventi con questo prefisso
      )
      .map((event: any) => ({
        title: event.summary.replace('EDDIE:', '').trim(),
        start: event.start,
        location: event.location,
        description: event.description
      }))
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

    return NextResponse.json(events);
  } catch (error) {
    // Log dell'errore per il debug nei log di Vercel
    console.error("Errore durante il recupero del calendario:", error);
    return NextResponse.json({ error: 'Errore nel recupero calendario' }, { status: 500 });
  }
}