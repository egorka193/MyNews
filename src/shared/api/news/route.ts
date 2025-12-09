import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  
  const searchParams = request.nextUrl.searchParams;
  const forLastWeek = searchParams.get('forLastWeek') === 'true';
  const size = searchParams.get('size') || '10';
  const nextCursor = searchParams.get('nextCursor');


  try {
    const apiUrl = 'https://internship-news-portal.purrweb.net';
    const url = new URL('/news', apiUrl);
    url.searchParams.append('size', size);
    url.searchParams.append('forLastWeek', forLastWeek.toString());
    
    if (nextCursor) {
      url.searchParams.append('nextCursor', nextCursor);
    }

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    return Response.json({
      results: data.results || [],
      hasMore: data.meta?.hasMore || false,
      nextCursor: data.meta?.nextCursor || null,
    });
  } catch (error) {
    return Response.json({ 
      results: [], 
      hasMore: false 
    }, { status: 500 });
  }
}