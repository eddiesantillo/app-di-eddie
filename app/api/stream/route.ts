import { NextResponse } from 'next/server';

export async function GET() {
  const streamUrl = 'http://srv1.goodsoundstream.com:3153';
  
  try {
    const response = await fetch(streamUrl);
    const audioData = await response.blob();
    
    return new NextResponse(audioData, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Impossibile connettersi allo stream' }, { status: 500 });
  }
}