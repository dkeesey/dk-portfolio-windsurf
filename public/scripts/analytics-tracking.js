/**
 * Comprehensive Analytics Tracking for deankeesey.com
 * Tracks engagement, scroll depth, outbound links, contact clicks, and form interactions
 */

// Ensure gtag is available
if (typeof gtag === 'undefined') {
  console.warn('Google Analytics not loaded');
  window.gtag = function() {};
}

// =============================================================================
// 1. SCROLL DEPTH TRACKING
// =============================================================================
function trackScrollDepth() {
  var scrollThresholds = [25, 50, 75, 90];
  var trackedThresholds = {};

  function checkScrollDepth() {
    var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;
    var scrollPercent = (window.scrollY / scrollHeight) * 100;

    scrollThresholds.forEach(function(threshold) {
      if (scrollPercent >= threshold && !trackedThresholds[threshold]) {
        trackedThresholds[threshold] = true;

        gtag('event', 'scroll', {
          'event_category': 'engagement',
          'event_label': threshold + '% scrolled',
          'percent_scrolled': threshold,
          'page_location': window.location.pathname
        });
      }
    });
  }

  var scrollTimeout;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(checkScrollDepth, 100);
  });
}

// =============================================================================
// 2. OUTBOUND LINK TRACKING
// =============================================================================
function trackOutboundLinks() {
  var links = document.querySelectorAll('a[href^="http"]');

  links.forEach(function(link) {
    var href = link.href;
    var isOutbound = !href.includes(window.location.hostname);

    if (isOutbound) {
      link.addEventListener('click', function() {
        var destination = this.href;
        var linkText = this.textContent.trim();

        gtag('event', 'click', {
          'event_category': 'outbound',
          'event_label': destination,
          'link_text': linkText,
          'link_domain': new URL(destination).hostname,
          'transport_type': 'beacon'
        });
      });
    }
  });
}

// =============================================================================
// 3. PHONE & EMAIL CLICK TRACKING
// =============================================================================
function trackContactClicks() {
  document.querySelectorAll('a[href^="tel:"]').forEach(function(link) {
    link.addEventListener('click', function() {
      var phoneNumber = this.href.replace('tel:', '');
      gtag('event', 'phone_click', {
        'event_category': 'contact',
        'event_label': phoneNumber,
        'page_location': window.location.pathname
      });
    });
  });

  document.querySelectorAll('a[href^="mailto:"]').forEach(function(link) {
    link.addEventListener('click', function() {
      var email = this.href.replace('mailto:', '');
      gtag('event', 'email_click', {
        'event_category': 'contact',
        'event_label': email,
        'page_location': window.location.pathname
      });
    });
  });
}

// =============================================================================
// 4. FORM INTERACTION TRACKING
// =============================================================================
function trackFormInteractions() {
  var forms = document.querySelectorAll('form');

  forms.forEach(function(form) {
    var formStartTracked = false;
    var inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach(function(input) {
      input.addEventListener('focus', function() {
        if (!formStartTracked) {
          formStartTracked = true;
          gtag('event', 'form_start', {
            'event_category': 'form',
            'form_name': form.name || form.id || 'unnamed_form',
            'page_location': window.location.pathname
          });
        }
      });
    });

    form.addEventListener('submit', function() {
      gtag('event', 'form_submit', {
        'event_category': 'form',
        'form_name': form.name || form.id || 'unnamed_form',
        'page_location': window.location.pathname
      });
    });
  });
}

// =============================================================================
// 5. CTA BUTTON TRACKING
// =============================================================================
function trackCTAClicks() {
  document.querySelectorAll('a[href*="hire"], a[href*="contact"], .cta-button').forEach(function(button) {
    button.addEventListener('click', function() {
      var buttonText = this.textContent.trim();
      var buttonHref = this.href;

      gtag('event', 'cta_click', {
        'event_category': 'conversion',
        'event_label': buttonText,
        'cta_url': buttonHref,
        'page_location': window.location.pathname
      });
    });
  });
}

// =============================================================================
// 6. TIME ON PAGE TRACKING
// =============================================================================
function trackTimeOnPage() {
  var startTime = Date.now();
  var pagePath = window.location.pathname;

  window.addEventListener('beforeunload', function() {
    var timeSpent = Math.round((Date.now() - startTime) / 1000);
    gtag('event', 'time_on_page', {
      'event_category': 'engagement',
      'value': timeSpent,
      'page_location': pagePath,
      'time_seconds': timeSpent
    });
  });

  var intervals = [30, 60, 120, 300];
  intervals.forEach(function(interval) {
    setTimeout(function() {
      gtag('event', 'time_milestone', {
        'event_category': 'engagement',
        'event_label': interval + 's on page',
        'page_location': pagePath
      });
    }, interval * 1000);
  });
}

// =============================================================================
// INITIALIZE ALL TRACKING
// =============================================================================
document.addEventListener('DOMContentLoaded', function() {
  try {
    trackScrollDepth();
    trackOutboundLinks();
    trackContactClicks();
    trackFormInteractions();
    trackCTAClicks();
    trackTimeOnPage();
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
});
