# Chatbot API Documentation

This document describes the API endpoints for the chatbot component.

## Chat API

### POST /api/chatbot/chat

Send a message to the chatbot and receive a response.

#### Request

```json
{
  "message": "Your message here",
  "conversationId": "optional-conversation-id"
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| message | string | Yes | The message to send to the chatbot |
| conversationId | string | No | The ID of an existing conversation to continue. If not provided, a new conversation will be created. |

#### Response

```json
{
  "message": {
    "role": "assistant",
    "content": "The chatbot's response",
    "timestamp": "2023-06-01T12:00:00Z"
  },
  "conversationId": "conversation-uuid"
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| message | object | The chatbot's response message |
| message.role | string | The role of the message sender (always "assistant") |
| message.content | string | The content of the message |
| message.timestamp | string | The timestamp of the message in ISO format |
| conversationId | string | The ID of the conversation |

#### Error Response

```json
{
  "error": "Error message",
  "code": "error_code"
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| error | string | A human-readable error message |
| code | string | An error code for programmatic handling |

#### Example

```javascript
// Example request
fetch('/api/chatbot/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'Tell me about your experience with React',
  }),
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

## History API

### GET /api/chatbot/history

Retrieve the conversation history for a recruiter.

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| recruiterId | string | Yes | The ID of the recruiter |
| limit | number | No | The maximum number of conversations to return (default: 10) |
| offset | number | No | The number of conversations to skip (default: 0) |

#### Response

```json
{
  "conversations": [
    {
      "id": "conversation-uuid",
      "messages": [
        {
          "id": "message-uuid",
          "role": "user",
          "content": "User message",
          "timestamp": "2023-06-01T12:00:00Z"
        },
        {
          "id": "message-uuid",
          "role": "assistant",
          "content": "Assistant response",
          "timestamp": "2023-06-01T12:00:05Z"
        }
      ],
      "createdAt": "2023-06-01T12:00:00Z",
      "updatedAt": "2023-06-01T12:00:05Z"
    }
  ],
  "total": 1
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| conversations | array | An array of conversation objects |
| conversations[].id | string | The ID of the conversation |
| conversations[].messages | array | An array of message objects |
| conversations[].messages[].id | string | The ID of the message |
| conversations[].messages[].role | string | The role of the message sender ("user" or "assistant") |
| conversations[].messages[].content | string | The content of the message |
| conversations[].messages[].timestamp | string | The timestamp of the message in ISO format |
| conversations[].createdAt | string | The timestamp when the conversation was created |
| conversations[].updatedAt | string | The timestamp when the conversation was last updated |
| total | number | The total number of conversations for the recruiter |

#### Error Response

```json
{
  "error": "Error message",
  "code": "error_code"
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| error | string | A human-readable error message |
| code | string | An error code for programmatic handling |

#### Example

```javascript
// Example request
fetch('/api/chatbot/history?recruiterId=recruiter-uuid&limit=5', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

## Authentication

The chatbot API uses Supabase for authentication. Users must be authenticated to use the API.

### Authentication Flow

1. User signs in using the chatbot UI
2. Supabase handles the authentication and redirects back to the callback URL
3. The callback page extracts the session information and redirects back to the original page
4. The chatbot retrieves the user's session and includes it in API requests

### Session Management

The chatbot automatically manages the user's session. If the session expires, the user will be prompted to sign in again.

## Error Codes

| Code | Description |
|------|-------------|
| auth_error | Authentication error |
| session_expired | Session has expired |
| unauthorized | User is not authorized to access the resource |
| api_error | Error communicating with the server |
| timeout | Request timed out |
| rate_limit | Too many requests |
| db_error | Database error |
| not_found | Resource not found |
| openai_error | Error generating response from OpenAI |
| validation_error | Invalid input |
| unknown_error | Unknown error | 