// Fix for Botpress dictation and input issues

// Make the function globally available
window.waitForBotpress = function() {
  // Wait for Botpress to be fully initialized
  if (document.querySelector('[data-webchat-component="Input"]')) {
    fixBotpressInput();
  } else {
    // Check again after a short delay
    setTimeout(window.waitForBotpress, 1000);
  }
};

// Fix the input handling
function fixBotpressInput() {
  try {
    // Find the input field
    const inputArea = document.querySelector('[data-webchat-component="Input"]');
    if (!inputArea) return;
    
    // Find the send button
    const sendButton = inputArea.querySelector('button');
    if (!sendButton) return;
    
    // Find the actual text input
    const textInput = inputArea.querySelector('[contenteditable="true"]');
    if (!textInput) return;
    
    // Add a handler for dictation input
    textInput.addEventListener('input', function(e) {
      // Enable the send button when text is entered
      if (textInput.textContent.trim().length > 0) {
        sendButton.removeAttribute('disabled');
      } else {
        sendButton.setAttribute('disabled', 'disabled');
      }
    });
    
    // Add a handler for the Enter key
    textInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey && textInput.textContent.trim().length > 0) {
        e.preventDefault();
        sendButton.click();
      }
    });
    
    console.log('Botpress input handlers fixed');
  } catch (err) {
    console.warn('Error fixing Botpress input:', err);
  }
}

// Start once the page is loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  window.waitForBotpress();
} else {
  document.addEventListener('DOMContentLoaded', window.waitForBotpress);
}
