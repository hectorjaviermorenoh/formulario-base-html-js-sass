
/**
 * Anti-XSS function that converts potentially dangerous characters into their safe HTML equivalents.
 * Prevents script injection by sanitizing user input.
 *
 * @param {string} text - The raw input string to sanitize
 * @returns {string} - The sanitized string safe for innerHTML rendering
 */
  export function sanitizeHTML(text) {
    return text
      .replace(/&/g, "&amp;")   // The ampersand (&) becomes &amp;
      .replace(/</g, "&lt;")    // The less-than sign (<) becomes &lt;
      .replace(/>/g, "&gt;")    // The greater-than sign (>) becomes &gt;
      .replace(/"/g, "&quot;")  // Double quotes (") become &quot;
      .replace(/'/g, "&#039;"); // Single quotes (') become &#039;
  }

/**
 * Normalizes a given string by applying several transformations:
 * - Converts to lowercase
 * - Removes extra whitespace
 * - Adds a final period
 * - Capitalizes the first letter
 *
 * @param {string} text - The input string to normalize
 * @returns {string} - The normalized text
 */
  export function normalizeText(text) {
    text = setTextInLowerCase(text);        // Convert text to lowercase
    text = removeEmptySpaces(text);         // Remove extra spaces
    text = setFinalPoint(text);             // Add a period at the end
    text = setUpperCaseInFirstLetter(text); // Capitalize the first letter
    return text;
  }

  function setTextInLowerCase(text) {
    return text.toLowerCase();
  }

  function removeEmptySpaces(text) {
    return text.trim();
  }

  function setFinalPoint(text) {
    return text.endsWith('.') ? text : text + '.';
  }

  function setUpperCaseInFirstLetter(text) {
    return text[0].toUpperCase() + text.slice(1)
  }




