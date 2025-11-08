/**
 * Comprehensive Analytics Tracking for MeganGredesky.com
 * Tracks conversions, engagement, scroll depth, video interactions, and outbound links
 */

// Ensure gtag is available
if (typeof gtag === 'undefined') {
  console.warn('Google Analytics not loaded');
  window.gtag = function() {};
}

// =============================================================================
// 1. CONVERSION TRACKING - Schedule Button Clicks
// =============================================================================
function trackConversionClicks() {
  const scheduleButtons = document.querySelectorAll('a[href*="clientsecure.me"], .schedule-consultation-cta, a[href*="schedule"]');

  scheduleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const buttonText = this.textContent.trim();
      const currentPage = window.location.pathname;

      gtag('event', 'schedule_consultation_click', {
        'event_category': 'conversion',
        'event_label': buttonText,
        'page_location': currentPage,
        'button_text': buttonText,
        'device_type': /mobile/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        'value': 1
      });

      // Also track as conversion event
      gtag('event', 'conversion', {
        'send_to': 'G-R99SBB9SQKX',
        'value': 1.0,
        'currency': 'USD',
        'transaction_id': Date.now() + '_' + Math.random().toString(36).substring(7)
      });

      console.log('✅ Conversion tracked:', buttonText, 'on page:', currentPage);
    });
  });

  console.log(`✅ Tracking ${scheduleButtons.length} schedule buttons`);
}

// =============================================================================
// 2. SERVICE-SPECIFIC PAGE TRACKING
// =============================================================================
function trackServicePageViews() {
  const currentPath = window.location.pathname;
  const serviceMap = {
    '/brainspotting': 'brainspotting',
    '/expansion-brainspotting': 'expansion_brainspotting',
    '/grief-recovery': 'grief_recovery',
    '/infertility': 'infertility_support',
    '/safe-sound-protocol': 'safe_sound_protocol',
    '/resources': 'resources'
  };

  const serviceType = serviceMap[currentPath];

  if (serviceType) {
    gtag('event', 'service_page_view', {
      'event_category': 'engagement',
      'service_type': serviceType,
      'page_path': currentPath
    });

    console.log('✅ Service page view tracked:', serviceType);
  }
}

// =============================================================================
// 3. SCROLL DEPTH TRACKING
// =============================================================================
function trackScrollDepth() {
  const scrollThresholds = [25, 50, 75, 90];
  const trackedThresholds = new Set();

  function checkScrollDepth() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (window.scrollY / scrollHeight) * 100;

    scrollThresholds.forEach(threshold => {
      if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
        trackedThresholds.add(threshold);

        gtag('event', 'scroll', {
          'event_category': 'engagement',
          'event_label': `${threshold}% scrolled`,
          'percent_scrolled': threshold,
          'page_location': window.location.pathname
        });

        console.log(`✅ Scroll depth tracked: ${threshold}%`);
      }
    });
  }

  let scrollTimeout;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(checkScrollDepth, 100);
  });
}

// =============================================================================
// 4. YOUTUBE VIDEO ENGAGEMENT TRACKING
// =============================================================================
function trackYouTubeEngagement() {
  // Load YouTube IFrame API
  if (typeof YT === 'undefined') {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  window.onYouTubeIframeAPIReady = function() {
    const iframes = document.querySelectorAll('iframe[src*="youtube.com"]');

    iframes.forEach((iframe, index) => {
      const videoId = iframe.src.match(/embed\/([^?]+)/)?.[1];
      if (!videoId) return;

      // Add unique ID to iframe
      if (!iframe.id) {
        iframe.id = `youtube-player-${index}`;
      }

      const player = new YT.Player(iframe.id, {
        events: {
          'onStateChange': function(event) {
            const videoTitle = iframe.title || 'Unknown Video';

            // Video started
            if (event.data === YT.PlayerState.PLAYING) {
              gtag('event', 'video_start', {
                'event_category': 'video',
                'video_title': videoTitle,
                'video_id': videoId,
                'page_location': window.location.pathname
              });
              console.log('✅ Video started:', videoTitle);
            }

            // Video completed
            if (event.data === YT.PlayerState.ENDED) {
              gtag('event', 'video_complete', {
                'event_category': 'video',
                'video_title': videoTitle,
                'video_id': videoId,
                'page_location': window.location.pathname
              });
              console.log('✅ Video completed:', videoTitle);
            }
          }
        }
      });
    });
  };
}

// =============================================================================
// 5. OUTBOUND LINK TRACKING
// =============================================================================
function trackOutboundLinks() {
  const links = document.querySelectorAll('a[href^="http"]');

  links.forEach(link => {
    const href = link.href;
    const isOutbound = !href.includes(window.location.hostname);

    if (isOutbound) {
      link.addEventListener('click', function(e) {
        const destination = this.href;
        const linkText = this.textContent.trim();

        gtag('event', 'click', {
          'event_category': 'outbound',
          'event_label': destination,
          'link_text': linkText,
          'link_domain': new URL(destination).hostname,
          'transport_type': 'beacon'
        });

        console.log('✅ Outbound link tracked:', destination);
      });
    }
  });

  console.log(`✅ Tracking ${links.length} outbound links`);
}

// =============================================================================
// 6. PHONE & EMAIL CLICK TRACKING
// =============================================================================
function trackContactClicks() {
  // Phone links
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(link => {
    link.addEventListener('click', function() {
      const phoneNumber = this.href.replace('tel:', '');

      gtag('event', 'phone_click', {
        'event_category': 'contact',
        'event_label': phoneNumber,
        'page_location': window.location.pathname
      });

      console.log('✅ Phone click tracked:', phoneNumber);
    });
  });

  // Email links
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach(link => {
    link.addEventListener('click', function() {
      const email = this.href.replace('mailto:', '');

      gtag('event', 'email_click', {
        'event_category': 'contact',
        'event_label': email,
        'page_location': window.location.pathname
      });

      console.log('✅ Email click tracked:', email);
    });
  });
}

// =============================================================================
// 7. FORM INTERACTION TRACKING
// =============================================================================
function trackFormInteractions() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    // Track form starts (first input focus)
    let formStartTracked = false;
    const inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        if (!formStartTracked) {
          formStartTracked = true;

          gtag('event', 'form_start', {
            'event_category': 'form',
            'form_name': form.name || form.id || 'unnamed_form',
            'page_location': window.location.pathname
          });

          console.log('✅ Form interaction started');
        }
      });
    });

    // Track form submissions
    form.addEventListener('submit', function(e) {
      gtag('event', 'form_submit', {
        'event_category': 'form',
        'form_name': form.name || form.id || 'unnamed_form',
        'page_location': window.location.pathname
      });

      console.log('✅ Form submission tracked');
    });
  });
}

// =============================================================================
// 8. TIME ON PAGE TRACKING
// =============================================================================
function trackTimeOnPage() {
  const startTime = Date.now();
  const pagePath = window.location.pathname;

  // Track when user leaves page
  window.addEventListener('beforeunload', function() {
    const timeSpent = Math.round((Date.now() - startTime) / 1000); // seconds

    gtag('event', 'time_on_page', {
      'event_category': 'engagement',
      'value': timeSpent,
      'page_location': pagePath,
      'time_seconds': timeSpent
    });
  });

  // Also track at intervals for long sessions
  const intervals = [30, 60, 120, 300]; // 30s, 1m, 2m, 5m
  intervals.forEach(interval => {
    setTimeout(() => {
      gtag('event', 'time_milestone', {
        'event_category': 'engagement',
        'event_label': `${interval}s on page`,
        'page_location': pagePath
      });
      console.log(`✅ Time milestone: ${interval}s`);
    }, interval * 1000);
  });
}

// =============================================================================
// INITIALIZE ALL TRACKING
// =============================================================================
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Initializing comprehensive analytics tracking...');

  try {
    trackConversionClicks();
    trackServicePageViews();
    trackScrollDepth();
    trackYouTubeEngagement();
    trackOutboundLinks();
    trackContactClicks();
    trackFormInteractions();
    trackTimeOnPage();

    console.log('✅ Analytics tracking initialized successfully');
  } catch (error) {
    console.error('❌ Analytics tracking error:', error);
  }
});
