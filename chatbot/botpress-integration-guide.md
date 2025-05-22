# Botpress Integration Guide

This guide will walk you through setting up a Botpress chatbot and integrating it with your Astro website using Partytown.

## Step 1: Sign Up for Botpress Cloud

1. Visit https://botpress.com/ and sign up for a free account.
2. Verify your email address if required.

## Step 2: Create a New Bot

1. Log in to your Botpress account.
2. Click on "Create Bot" or a similar button on the dashboard.
3. Choose a template (you can start with a blank template or use a pre-built one).
4. Give your bot a name (e.g., "Dean's AI Assistant").
5. Follow the setup wizard to complete basic configuration.

## Step 3: Configure Your Bot

1. **Set up the greeting message**:
   - Navigate to the "Flows" or "Conversations" section.
   - Locate the welcome message or create a new one.
   - Customize it to introduce your bot and what it can help with.

2. **Create Knowledge Base**:
   - Go to the "Knowledge" section.
   - Create a new knowledge base about yourself, your skills, experiences, and projects.
   - Add relevant information that visitors might ask about.

3. **Train the Bot**:
   - Add sample questions and answers to train the bot.
   - Include questions about your experience, skills, portfolio, availability, etc.

4. **Customize Appearance**:
   - Go to the "Webchat" or "Customization" section.
   - Customize colors, logo, and appearance to match your website's design.

## Step 4: Get Your Bot ID

1. Go to the "Integration" or "Deploy" section.
2. Look for a section titled "Web" or "Website Integration".
3. You'll find your Bot ID in this section. It will be a unique string like "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6".
4. Copy this Bot ID.

## Step 5: Update Your Code

1. Open the file: `/src/components/chatbot/BotpressChat.astro`
2. Replace the placeholder `REPLACE_WITH_YOUR_BOT_ID` with your actual Bot ID.
3. Customize other settings as needed.

## Step 6: Toggle Between Chat Solutions

You can toggle between your custom chat solution and Botpress by updating the `USE_CUSTOM_CHAT` flag:

1. Open the file: `/src/components/chatbot/ChatbotProvider.tsx`
2. Find the line with `const USE_CUSTOM_CHAT = false;`
3. Set it to `true` to use your custom chat widget, or `false` to use Botpress.

## Step 7: Test Your Integration

1. Run your development server:
   ```bash
   npm run dev
   ```
2. Open your website in a browser.
3. The Botpress chat widget should appear on your site.
4. Test the chat by asking questions and interacting with the bot.

## Step 7: Customize Further (Optional)

Fine-tune your bot's behavior and appearance:

1. **Advanced Customization**:
   ```javascript
   window.botpressWebChat = {
     init: {
       // Your existing settings...
       
       // Custom CSS
       stylesheet: 'https://cdn.botpress.cloud/webchat/v1/standard.css',
       
       // Show typing indicators
       showTypingIndicator: true,
       
       // Delay for welcome message (ms)
       welcomeMsgDelay: 1000,
       
       // Initial messages from the bot when chat opens
       enableWelcomeMessage: true,
       welcomeMessage: "Hi! I'm Dean's AI assistant. How can I help you today?",
       
       // Conversation persistence
       enableConversationDeletion: true,
       
       // UI Configuration
       containerWidth: '100%',
       layoutWidth: '100%',
       hideWidget: false,
       disableAnimations: false,
     }
   };
   ```

## Troubleshooting

If you encounter issues:

1. **Bot Not Appearing**:
   - Check the browser console for errors.
   - Verify that your Bot ID is correct.
   - Ensure the CSP allows botpress.cloud domains.

2. **CSP Issues**:
   - If you see Content Security Policy errors, make sure you've properly updated your CSP settings in `astro.config.mjs`.

3. **Partytown Issues**:
   - Verify that Partytown is properly configured and that the forward array includes 'botpressWebChat.init'.
   - Try loading the script directly (without type="text/partytown") for debugging.

## Next Steps

1. **Monitor Chat Usage**:
   - Use the Botpress analytics to see how users are interacting with your bot.
   - Identify common questions or confusion points.

2. **Refine Responses**:
   - Regularly update your bot's knowledge base based on actual user interactions.
   - Add more variations of questions and answers to make the bot more natural.

3. **Consider Upgrading**:
   - For more advanced features like integrations with other platforms or advanced NLU, consider upgrading to a paid plan.
