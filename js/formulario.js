
  // Import validations.js
  import { sanitizeHTML, normalizeText } from "../js/validations.js";

  // Error list
  let errorList = [];

  // Get the form with name "mainForm"
  const form = document.forms["mainForm"];

  // Removes any error messages from the global error list that contain one or more specified keywords.
  function removeFieldErrors(fieldKeywords = []) {
    errorList = errorList.filter(err =>
      !fieldKeywords.some(keyword => err.toLowerCase().includes(keyword))
    );
  }


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

  // Validate input fields name and lastName
  function validateInputNameLastName(input){

      input.addEventListener("blur", () => {

        const value = input.value.trim();
        const fieldName = input.name; // "name" o "lastName"

        // Translation dictionary
        const fieldLabelsInSpanish = {
          name: "nombre",
          lastName: "apellido"
        };

        // Removes errors containing the words "name" or "lastName"
        removeFieldErrors([fieldLabelsInSpanish[fieldName].toLowerCase()]);

        if (value === "") {
          errorList.push(`El campo ${fieldLabelsInSpanish[fieldName]} no puede estar vacío.`);
        } else {
          const textoNormalizado = normalizeText(value);
          input.value = textoNormalizado;
        }

        updateUIValidation()

      });
  }


   // Apply validation to name and lastName
    ["name", "lastName"].forEach(fieldName => {
      if(form[fieldName]) {
        validateInputNameLastName(form[fieldName]);
      }
    })

  // --- Render error messages below the title ---
  function renderErrorList() {
    const container = document.querySelector(".container");

    const oldErrors = document.querySelector(".error-list");
    if (oldErrors) oldErrors.remove();

    const ul = document.createElement("ul");
    ul.classList.add("error-list");
    ul.setAttribute("role", "alert");
    ul.setAttribute("aria-live", "assertive");

    for (let error of errorList) {
      let li = document.createElement("li");
      li.textContent = error;
      ul.appendChild(li);
    }

    const h2Title = document.querySelector(".h2-title");
    h2Title.insertAdjacentElement("afterend", ul);

    return errorList.length === 0;
  }

  // --- Update validation UI state ---
  /**
   * Renders error messages and updates submit button state.
   * Called after each validation check.
   */
  function updateUIValidation() {
    renderErrorList();
  }


