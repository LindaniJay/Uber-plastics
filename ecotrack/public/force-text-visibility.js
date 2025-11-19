// Force Text Visibility - JavaScript Solution
// This script runs after page load to ensure all text is visible
// Modified to prevent hydration mismatches by not adding font-weight styles

function forceTextVisibility() {
  // Find all elements that might have invisible text
  const allElements = document.querySelectorAll('*');
  
  allElements.forEach(element => {
    const computedStyle = window.getComputedStyle(element);
    const textColor = computedStyle.color;
    const backgroundColor = computedStyle.backgroundColor;
    
    // Check if text is invisible or very light
    if (textColor === 'rgba(0, 0, 0, 0)' || 
        textColor === 'transparent' ||
        textColor.includes('rgba(0, 0, 0, 0)') ||
        textColor.includes('rgba(255, 255, 255, 0)')) {
      
      // Force black text on white backgrounds
      if (backgroundColor.includes('rgb(255, 255, 255)') || 
          backgroundColor.includes('rgba(255, 255, 255') ||
          element.closest('.bg-white') ||
          element.closest('[class*="bg-white"]')) {
        element.style.color = '#000000 !important';
        // Removed fontWeight to prevent hydration mismatch
      }
      // Force white text on dark backgrounds
      else if (backgroundColor.includes('rgb(31, 41, 55)') ||
               backgroundColor.includes('rgb(17, 24, 39)') ||
               element.closest('.bg-gray-800') ||
               element.closest('.bg-gray-900') ||
               element.closest('[class*="bg-gray-8"]') ||
               element.closest('[class*="bg-gray-9"]')) {
        element.style.color = '#FFFFFF !important';
        // Removed fontWeight to prevent hydration mismatch
      }
    }
  });
  
  // Force all card text to be visible
  const cards = document.querySelectorAll('.card, [class*="card"], div[class*="card"]');
  cards.forEach(card => {
    const isDark = card.closest('.dark') || document.documentElement.classList.contains('dark');
    
    if (isDark) {
      card.style.color = '#FFFFFF !important';
      card.style.backgroundColor = '#1F2937 !important';
      
      // Force all child elements
      const children = card.querySelectorAll('*');
      children.forEach(child => {
        if (child.tagName.match(/H[1-6]/)) {
          child.style.color = '#FFFFFF !important';
          // Removed fontWeight to prevent hydration mismatch
        } else {
          child.style.color = '#F3F4F6 !important';
          // Removed fontWeight to prevent hydration mismatch
        }
      });
    } else {
      card.style.color = '#000000 !important';
      card.style.backgroundColor = '#FFFFFF !important';
      
      // Force all child elements
      const children = card.querySelectorAll('*');
      children.forEach(child => {
        if (child.tagName.match(/H[1-6]/)) {
          child.style.color = '#000000 !important';
          // Removed fontWeight to prevent hydration mismatch
        } else {
          child.style.color = '#1F2937 !important';
          // Removed fontWeight to prevent hydration mismatch
        }
      });
    }
  });
}

// Run immediately
forceTextVisibility();

// Run after DOM is fully loaded
document.addEventListener('DOMContentLoaded', forceTextVisibility);

// Run after page is fully loaded
window.addEventListener('load', forceTextVisibility);

// Run when theme changes
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      setTimeout(forceTextVisibility, 100);
    }
  });
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['class']
});

// Run periodically to catch any dynamically added content
setInterval(forceTextVisibility, 2000);

