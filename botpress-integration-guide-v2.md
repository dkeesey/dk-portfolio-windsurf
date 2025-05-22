# Botpress Integration Guide (v2)

This guide walks you through setting up a Botpress chatbot and integrating it with your Astro website using Partytown to handle Content Security Policy restrictions.

## Step 1: Sign Up for Botpress Cloud

1. Visit https://botpress.com/ and sign up for a free account.
2. Verify your email address if required.

## Step 2: Create a New Bot

1. Log in to your Botpress account.
2. Create a new bot (e.g., "aware-rhinoceros").
3. Configure the bot with basic instructions and features.

## Step 3: Configure Your Bot

1. **Set up Instructions**:
   - Configure your bot's identity, scope, response style, etc.
   - Set up appropriate guardrails for privacy and accuracy.

2. **Add Knowledge**:
   - Create a knowledge base about yourself, skills, and portfolio.
   - Upload relevant documents or enter information manually.

3. **Train the Bot**:
   - Add sample questions and answers.
   - Test interactions with the bot to refine responses.

## Step 4: Get Your Integration Scripts

1. In your bot's dashboard, go to the "Communication Channels" section.
2. Click on "Webchat" to access web integration settings.
3. You should see integration scripts like:

```html
<script src="https://cdn.botpress.cloud/webchat/v2.3/inject.js"></script>
<script src="https://files.bpcontent.cloud/YYYY/MM/DD/HH/YYYYMMDDHHMM-XXXXXXXX.js"></script>
```

4. Copy these scripts.

## Step 5: Update Your Code

1. Open the file: `/src/components/chatbot/BotpressChat.astro`
2. Replace the entire `<script>` section with your specific scripts, adding `type="text/partytown"` to each:

```astro
<script type="text/partytown" src="https://cdn.botpress.cloud/webchat/v2.3/inject.js"></script>
<script type="text/partytown" src="https://files.bpcontent.cloud/YYYY/MM/DD/HH/YYYYMMDDHHMM-XXXXXXXX.js"></script>
```

## Step 6: Update the Content Security Policy

Ensure your `astro.config.mjs` includes the necessary domains in your CSP:

- `https://cdn.botpress.cloud`
- `https://files.bpcontent.cloud`
- `https://*.bpcontent.cloud`
- `https://messaging.botpress.cloud`

## Step 7: Toggle Between Chat Solutions

You can toggle between your custom chat solution and Botpress by updating the `USE_CUSTOM_CHAT` flag:

1. Open the file: `/src/components/chatbot/ChatbotProvider.tsx`
2. Find the line with `const USE_CUSTOM_CHAT = false;`
3. Set it to `true` to use your custom chat widget, or `false` to use Botpress.

## Step 8: Test Your Integration

1. Run your development server: `npm run dev`
2. Open your website in a browser.
3. The Botpress chat widget should appear on your site.
4. Test the chat by asking questions and interacting with the bot.

## Troubleshooting

If you encounter issues:

1. **Bot Not Appearing**:
   - Check the browser console for errors.
   - Verify that your scripts are correctly added.
   - Ensure the CSP allows all required botpress domains.

2. **CSP Issues**:
   - Check the browser console for Content Security Policy errors.
   - Update your CSP in `astro.config.mjs` to include any missing domains.

3. **Partytown Issues**:
   - Try loading the scripts directly (without `type="text/partytown"`) for debugging.

## Next Steps

1. **Monitor Chat Usage** via the Botpress analytics dashboard.
2. **Refine Responses** based on actual user interactions.
3. **Customize Appearance** further using the Botpress webchat settings.
