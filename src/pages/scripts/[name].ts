import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, request }) => {
  const name = params.name;
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  let upstream: string;
  if (name === 'ga4.js') {
    upstream = 'https://www.googletagmanager.com/gtag/js' + (id ? '?id=' + id : '');
  } else if (name === 'clarity.js') {
    if (!id) return new Response('Missing id parameter', { status: 400 });
    upstream = 'https://www.clarity.ms/tag/' + id;
  } else if (name === 'pixel.js') {
    upstream = 'https://connect.facebook.net/en_US/fbevents.js';
  } else {
    return new Response('Not found', { status: 404 });
  }

  const resp = await fetch(upstream, {
    headers: {
      'User-Agent': request.headers.get('User-Agent') || 'Mozilla/5.0',
      'Accept': 'application/javascript, */*',
    },
  });

  if (!resp.ok) {
    return new Response(`Upstream error: ${resp.status}`, { status: resp.status });
  }

  return new Response(resp.body, {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
