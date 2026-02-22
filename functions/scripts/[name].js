/**
 * CF Pages Function — Analytics script proxy
 *
 * Serves third-party analytics scripts from this domain so:
 *   1. CSP script-src only needs 'self' (no external script domains)
 *   2. Load failures are visible as requests to our domain in DevTools/CF logs
 *   3. Ad-blocker bypass for analytics scripts
 *
 * Routes:
 *   /scripts/ga4.js?id=G-XXXX     → https://www.googletagmanager.com/gtag/js?id=G-XXXX
 *   /scripts/clarity.js?id=XXXX   → https://www.clarity.ms/tag/XXXX
 *   /scripts/pixel.js              → https://connect.facebook.net/en_US/fbevents.js
 */
export async function onRequest(context) {
  const { params, request } = context;
  const name = params.name;
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  let upstream;
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

  try {
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
        'X-Analytics-Source': upstream.split('?')[0],
      },
    });
  } catch (err) {
    return new Response(`Proxy error: ${err.message}`, { status: 502 });
  }
}
