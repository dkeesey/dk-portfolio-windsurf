# Recruiter Chatbot Component

This chatbot component is designed to help recruiters interact with your portfolio website. It provides a conversational interface that can answer questions about your experience, skills, and projects.

## Features

- Real-time chat interface
- Authentication with Supabase
- Conversation history storage
- OpenAI integration for natural language processing
- Responsive design for mobile and desktop

## Installation

The chatbot is integrated into the Astro website. Make sure you have the following environment variables set up in your `.env` file:

```
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

## Usage

To add the chatbot to a page, import and use the `ChatWidget` component:

```tsx
import { ChatWidget } from '../components/chatbot/ui/ChatWidget';

// In your component:
<ChatWidget />
```

For controlled state management, you can pass `isOpen` and `onOpenChange` props:

```tsx
import { useState } from 'react';
import { ChatWidget } from '../components/chatbot/ui/ChatWidget';

// In your component:
const [isOpen, setIsOpen] = useState(false);

<ChatWidget 
  isOpen={isOpen} 
  onOpenChange={setIsOpen} 
/>
```

## Architecture

The chatbot consists of several components:

1. **UI Components**:
   - `ChatWidget`: The main container for the chatbot
   - `ChatContainer`: Displays the chat messages
   - `ChatMessage`: Renders individual messages
   - `ChatInput`: Handles user input

2. **Hooks**:
   - `useAuth`: Manages authentication state
   - `useChat`: Handles chat functionality

3. **Context**:
   - `ChatbotProvider`: Provides chat and auth context to components

4. **API**:
   - `/api/chatbot/chat`: Handles chat requests
   - `/api/chatbot/history`: Retrieves chat history

5. **Netlify Functions**:
   - `/netlify/functions/chatbot/chat`: Processes chat messages
   - `/netlify/functions/chatbot/history`: Manages conversation history

## Customization

You can customize the chatbot's appearance by modifying the UI components. The system prompt can be adjusted in the `netlify/functions/chatbot/chat.ts` file to change how the chatbot responds to user queries.

## License

This component is part of your portfolio website and is subject to the same license as the rest of the codebase. 