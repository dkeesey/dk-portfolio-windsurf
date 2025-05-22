/**
 * A utility for debugging chat message flow.
 * This helps diagnose issues with message rendering and state updates.
 */

import type { Message } from '../components/chatbot/ui/ChatContainer';

// Enable to see verbose logging
const DEBUG_ENABLED = process.env.NODE_ENV === 'development';

// Track message state changes
let messageHistory: Message[][] = [];
const MAX_HISTORY = 10;

/**
 * Log a message with debug prefix
 */
export function logDebug(message: string, ...args: any[]) {
  if (DEBUG_ENABLED) {
    console.log(`[CHAT_DEBUG] ${message}`, ...args);
  }
}

/**
 * Track changes to the messages array to help debug issues
 */
export function trackMessageState(messages: Message[]) {
  if (!DEBUG_ENABLED) return;

  // Create a deep copy to prevent reference issues
  const messageCopy = JSON.parse(JSON.stringify(messages));
  messageHistory.push(messageCopy);
  
  // Keep only the last N states to avoid memory issues
  if (messageHistory.length > MAX_HISTORY) {
    messageHistory.shift();
  }
  
  // Log the change
  logDebug(`Message state updated: ${messages.length} messages`);
  
  // Broadcast message for debugging tools
  try {
    window.postMessage({
      type: 'CHAT_MESSAGE',
      count: messages.length,
      timestamp: new Date().toISOString(),
      preview: messages.length > 0 ? `${messages[messages.length - 1].role}: ${messages[messages.length - 1].content.substring(0, 30)}...` : 'No messages'
    }, '*');
  } catch (e) {
    // Ignore errors in message posting
  }
}

/**
 * Get message state history for debugging
 */
export function getMessageHistory() {
  return messageHistory;
}

/**
 * Diagnose common problems with message state
 */
export function diagnoseMessageIssues(messages: Message[]) {
  if (!DEBUG_ENABLED) return;
  
  // Check for empty or undefined messages
  if (!messages || messages.length === 0) {
    logDebug('Issue detected: Empty messages array');
    return;
  }
  
  // Check for invalid messages
  const invalidMessages = messages.filter(
    msg => !msg.content || typeof msg.content !== 'string' || !msg.role
  );
  
  if (invalidMessages.length > 0) {
    logDebug('Issue detected: Invalid messages found', invalidMessages);
  }
  
  // Check for duplicate message IDs
  const ids = messages.map(msg => msg.id).filter(Boolean);
  const uniqueIds = new Set(ids);
  
  if (ids.length !== uniqueIds.size) {
    logDebug('Issue detected: Duplicate message IDs found');
  }
}

export default {
  logDebug,
  trackMessageState,
  getMessageHistory,
  diagnoseMessageIssues
};