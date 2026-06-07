export const dynamic = 'force-dynamic';

export async function GET() {
  const streamUrl = 'http://srv1.goodsoundstream.com:3153/;stream'; 
  
  try {
    const response = await fetch(streamUrl, {
      headers: { 'Accept': 'audio/mpeg' }
    });

    // Trasformiamo la risposta in un ReadableStream
    return new Response(response.body, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Transfer-Encoding': 'chunked',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response('Errore stream', { status: 500 });
  }
}