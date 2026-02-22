name: analytics-smoke
url: https://deankeesey.com
workflow:
  - Navigate to the homepage
  - Verify window.gtag is defined as a function (evaluate in browser console)
  - Verify window.dataLayer exists and has at least one entry
  - Verify a script tag loading from googletagmanager.com is present in the DOM
  - Verify a script tag loading from clarity.ms is present in the DOM
  - Verify the string "G-R99SBB9SQKX" does not appear anywhere in the page source (wrong-site GA4 ID)
  - Verify no console errors mentioning gtag, dataLayer, or clarity
  - Click the Blog navigation link to trigger a ClientRouter soft navigation
  - Verify the URL changes to /blog without a full page reload
  - Verify window.dataLayer has grown (more entries than before the navigation)
  - Verify window.gtag is still defined after the soft navigation
