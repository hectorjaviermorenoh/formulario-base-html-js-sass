// Import validations.js
  import { sanitizeHTML, normalizeText } from "../js/validations.js";

// Get the form with name "mainForm"
  const form = document.forms["mainForm"];

// Allowed characters for name and lastName
  let allowedCharacters  = new Set([' ','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']);

  /**
   * Add a listener to validate the input of allowed characters.
   * @param {HTMLInputElement} input - Campo de texto a validar
   */

  // / Restrict keypress to allowed characters
  function validateAllowedCharacters(input) {
    input.addEventListener('keypress', function(e) {

        if (!allowedCharacters.has(e.key.toLowerCase())) {
            e.preventDefault();
        }

        updateUIValidation()
    });
  }

  ["name", "lastName"].forEach(fieldName => {
    if(form[fieldName]) {
      validateAllowedCharacters(form[fieldName]);
    }
  })

