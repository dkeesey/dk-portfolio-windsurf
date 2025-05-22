# Botpress Integration

This document explains the dual-mode approach to integrating Botpress chat with our Astro website.

## Overview

We use a dual-mode implementation to address specific challenges:

1. **Development Environment**: CORS issues prevent loading Botpress scripts directly
2. **Production Environment**: Full Botpress integration with custom UI

## Components

### 1. Botpress.astro
The main wrapper component that conditionally renders different implementations based on environment:
- `BotpressDev.astro` for development
- `BotpressProd.astro` for production

### 2. BotpressDev.astro
A mock chatbot UI for development that:
- Looks similar to the real Botpress chat
- Contains helpful information about CORS issues
- Doesn't try to load external Botpress scripts that would cause CORS errors

### 3. BotpressProd.astro
The production implementation that:
- Properly loads Botpress scripts
- Implements custom UI controls (open/close buttons)
- Handles edge cases like script loading delays
- Maintains the same user experience as the development version

## How It Works

### Development Mode
- The `Botpress.astro` component detects dev mode and renders `BotpressDev.astro`
- A mock UI is shown with sample messages explaining the situation
- No CORS errors occur because no external scripts are loaded

### Production Mode
- The `Botpress.astro` component renders `BotpressProd.astro`
- Botpress scripts are loaded properly
- The Botpress widget is moved into our custom container
- Custom open/close buttons control visibility

## Debugging and Troubleshooting

### Development Mode Issues
- The dev mode implementation is just a mockup, so no real chat functionality exists
- This is intentional to avoid CORS errors during development

### Production Mode Issues
If the chat doesn't appear in production:

1. Check browser console for errors
2. Verify that the Botpress scripts are loading (network tab)
3. Make sure CSP headers allow Botpress domains
4. Check if the `.bp-widget` element is being created in the DOM

## Customization

### Bot Configuration
To change the bot:

1. Update the bot-specific script URL in `BotpressProd.astro`:
   ```
   <script src="https://files.bpcontent.cloud/YOUR/BOT/URL.js"></script>
   ```

### Styling
- Overall styling is handled in each component
- For the production version, CSS custom properties and global selectors are used to style the Botpress widget

## Security Considerations

- CSP headers are configured in `astro.config.mjs`
- All necessary Botpress domains are allowlisted
- Scripts use proper sanitization when interacting with the DOM

## Testing

Always test the chat in both environments:
1. Development: `npm run dev` - Should see the mock UI
2. Production: `npm run build && npm run preview` - Should see real Botpress chat
