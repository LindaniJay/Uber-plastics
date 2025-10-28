// Extension Error Handler
// This script handles browser extension connection errors gracefully

(function() {
  'use strict';
  
  // Override console.error to filter out extension connection errors
  const originalError = console.error;
  console.error = function(...args) {
    const message = args.join(' ');
    
    // Filter out common extension connection errors
    if (message.includes('Could not establish connection') ||
        message.includes('Receiving end does not exist') ||
        message.includes('runtime.lastError')) {
      // Silently ignore these errors
      return;
    }
    
    // Log other errors normally
    originalError.apply(console, args);
  };
  
  // Handle unhandled promise rejections from extensions
  window.addEventListener('unhandledrejection', function(event) {
    const error = event.reason;
    if (error && error.message && 
        (error.message.includes('Could not establish connection') ||
         error.message.includes('Receiving end does not exist'))) {
      // Prevent these extension errors from showing in console
      event.preventDefault();
    }
  });
  
  // Handle general errors
  window.addEventListener('error', function(event) {
    const error = event.error;
    if (error && error.message && 
        (error.message.includes('Could not establish connection') ||
         error.message.includes('Receiving end does not exist'))) {
      // Prevent these extension errors from showing in console
      event.preventDefault();
    }
  });
})();
