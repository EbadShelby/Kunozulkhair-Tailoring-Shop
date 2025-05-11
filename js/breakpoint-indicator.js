// Breakpoint Indicator
document.addEventListener('DOMContentLoaded', function() {
  // Create the breakpoint indicator element
  const breakpointIndicator = document.createElement('div');
  breakpointIndicator.id = 'breakpoint-indicator';

  // Add styles to the breakpoint indicator
  breakpointIndicator.style.position = 'fixed';
  breakpointIndicator.style.bottom = '10px';
  breakpointIndicator.style.left = '10px';
  breakpointIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Black with 80% opacity
  breakpointIndicator.style.color = 'white';
  breakpointIndicator.style.padding = '8px 12px';
  breakpointIndicator.style.borderRadius = '4px';
  breakpointIndicator.style.fontSize = '12px';
  breakpointIndicator.style.fontFamily = 'monospace';
  breakpointIndicator.style.zIndex = '9999';
  breakpointIndicator.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
  breakpointIndicator.style.transition = 'all 0.3s ease';
  breakpointIndicator.style.pointerEvents = 'auto'; // Make it interactive
  breakpointIndicator.style.cursor = 'pointer';

  // Append the indicator to the body
  document.body.appendChild(breakpointIndicator);

  // Function to update the breakpoint text
  function updateBreakpointText() {
    const width = window.innerWidth;
    let breakpointText = '';

    // Use a single consistent color
    const bgColor = 'rgba(0, 0, 0, 0.8)'; // Black with 80% opacity

    if (width < 475) {
      breakpointText = 'base | < 475px';
    } else if (width < 640) {
      breakpointText = 'xs | 475px';
    } else if (width < 768) {
      breakpointText = 'sm | 640px';
    } else if (width < 1024) {
      breakpointText = 'md | 768px';
    } else if (width < 1280) {
      breakpointText = 'lg | 1024px';
    } else if (width < 1536) {
      breakpointText = 'xl | 1280px';
    } else {
      breakpointText = '2xl | 1536px';
    }

    // Add the current width to the display
    breakpointText += ` (current: ${width}px)`;

    // Update the indicator text and color
    breakpointIndicator.textContent = breakpointText;
    breakpointIndicator.style.backgroundColor = bgColor;
  }

  // Initial update
  updateBreakpointText();

  // Update on window resize
  window.addEventListener('resize', updateBreakpointText);

  // Toggle visibility when clicked
  let isMinimized = false;
  let originalWidth, originalHeight, originalText;

  breakpointIndicator.addEventListener('click', function(e) {
    if (isMinimized) {
      // Restore to full size
      breakpointIndicator.style.width = originalWidth;
      breakpointIndicator.style.height = originalHeight;
      updateBreakpointText(); // Restore the text
      isMinimized = false;
    } else {
      // Save current state
      originalWidth = breakpointIndicator.style.width;
      originalHeight = breakpointIndicator.style.height;
      originalText = breakpointIndicator.textContent;

      // Minimize
      breakpointIndicator.style.width = '15px';
      breakpointIndicator.style.height = '15px';
      breakpointIndicator.textContent = '';
      isMinimized = true;
    }
  });

  // Add tooltip
  breakpointIndicator.title = "Click to toggle visibility";
});
