
  // Import validations.js
  import { sanitizeHTML, normalizeText } from "../js/validations.js";

  // Error list
  let errorList = [];

  // Get the form with name "mainForm"
  const form = document.forms["mainForm"];

  // Only these countries are allowed as valid selections and must match the <option value="..."> entries in the HTML select element.
  const allowedCountries  = ["colombia", "argentina", "chile", "peru", "mexico"];

  // Removes any error messages from the global error list that contain one or more specified keywords.
  function removeFieldErrors(fieldKeywords = []) {
    errorList = errorList.filter(err =>
      !fieldKeywords.some(keyword => err.toLowerCase().includes(keyword))
    );
  }

  // Allowed characters for name and lastName
  let allowedCharacters = new Set([
  ' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'á', 'é', 'í', 'ó', 'ú', 'Á', 'É', 'Í', 'Ó', 'Ú'
  ]);

  /**
   * Filters input value to only allow characters from the allowed set.
   * Compatible with desktop and mobile.
   * @param {HTMLInputElement} input
   */
  function validateAllowedCharacters(input) {
    input.addEventListener('input', () => {
      const filtered = [...input.value]
        .filter(char => allowedCharacters.has(char.toLowerCase()))
        .join('');
      if (input.value !== filtered) {
        input.value = filtered;
      }

      updateUIValidation();
    });
  }

  function validateAllowedCharacters(input) {
    input.addEventListener('input', () => {
      const filtered = [...input.value]
        .filter(char => allowedCharacters.has(char.toLowerCase()))
        .join('');
      if (input.value !== filtered) {
        input.value = filtered;
      }

      updateUIValidation();
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

  // Validate email input
  form["email"].addEventListener("blur", () => {
    const emailInput = form["email"];
    const emailValue = emailInput.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Removes errors containing the words "correo" or "mail"
    removeFieldErrors(["correo", "e-mail"]);

    if (emailValue === "") {
      errorList.push("El campo correo no puede estar vacío.");
    } else if (!regex.test(emailValue)) {
      errorList.push("Por favor ingresa un correo válido.");
    }

    updateUIValidation()

  });

  // Validate phone input
  form["phone"].addEventListener("blur", () => {
    const phoneInput = form["phone"];
    const phoneValue = phoneInput.value.trim();

    // Removes errors containing the words "teléfono" or "número"
    removeFieldErrors(["teléfono", "número"]);

    if (phoneValue === "") {
      errorList.push("El teléfono no puede estar vacío.");
    } else if (!/^\d+$/.test(phoneValue)) {
      errorList.push("El teléfono solo debe contener números.");
    } else if (phoneValue.length < 10) {
      errorList.push("El número de teléfono debe tener al menos 10 dígitos.");
    } else if (phoneValue.startsWith("0")) {
      errorList.push("El teléfono no debe comenzar con 0.");
    }

     updateUIValidation()

  });


  // Validate password input
  form["password"].addEventListener("blur", () => {
    const passwordInput = form["password"];
    const passwordValue = passwordInput.value.trim();

    // Removes errors containing the words "contraseña"
    removeFieldErrors(["contraseña"]);

    if (passwordValue === "") {
      errorList.push("La contraseña no puede estar vacía.");
    } else if (passwordValue.length < 8) {
      errorList.push("La contraseña debe tener al menos 8 caracteres.");
    } else if (!/[a-z]/.test(passwordValue)) {
      errorList.push("La contraseña debe incluir al menos una letra minúscula.");
    } else if (!/[A-Z]/.test(passwordValue)) {
      errorList.push("La contraseña debe incluir al menos una letra mayúscula.");
    } else if (!/\d/.test(passwordValue)) {
      errorList.push("La contraseña debe incluir al menos un número.");
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue)) {
      errorList.push("La contraseña debe incluir al menos un carácter especial.");
    } else if (/\s/.test(passwordValue)) {
      errorList.push("La contraseña no debe contener espacios.");
    } else if (["12345678", "password", "contraseña", "abcdefg"].includes(passwordValue.toLowerCase())) {
      errorList.push("Por favor elige una contraseña más segura.");
    }

    updateUIValidation()

  });

  // --- Validate country input ---
  form["country"].addEventListener("blur", () => {
    const countryInput = form["country"];
    const countryValue = countryInput.value.trim().toLowerCase();

    // Removes errors containing the words "país"
    removeFieldErrors(["país"]);

    if (countryValue === "") {
      errorList.push("Debe seleccionar un país de nacimiento.");
    }

    if (!allowedCountries.includes(countryValue)) {
      errorList.push("El país seleccionado no es válido.");
    }

    updateUIValidation()

  });

  // --- Validate hobbies checkbox selection ---
  const hobbyCheckboxes = form.querySelectorAll('input[name="hobbies"]');
  const maxHobbies = 4;
  let hobbiesCounter = 0;

  hobbyCheckboxes.forEach(checkbox => {

    checkbox.addEventListener("change", () => {

      const checkedCount = Array.from(hobbyCheckboxes).filter(cb => cb.checked).length;
      hobbiesCounter = checkedCount

      if (checkedCount >= maxHobbies) {
        hobbyCheckboxes.forEach(cb => {
        if (!cb.checked) cb.disabled = true;
      });
      } else {
        hobbyCheckboxes.forEach(cb => cb.disabled = false);
      }

      updateUIValidation()

    });

  });


  // --- Validate description input ---
  function validateDescripcionField() {
    const descripcionInput = form["descripcion"];
    const descripcionValue = sanitizeHTML(descripcionInput.value.trim());

    descripcionInput.value = descripcionValue;

    // Removes errors containing the words "descripción" or "opinion"
    removeFieldErrors(["descripción", "opinion"]);

    if (descripcionValue.length > 0 && descripcionValue.length < 20) {
      errorList.push("La descripción debe contener al menos 20 caracteres o dejarse vacía.");
    } else if (descripcionValue.length > 500) {
      errorList.push("La descripción no puede superar los 500 caracteres.");
    } else if (/^(.)\1+$/.test(descripcionValue)) {
      errorList.push("El texto ingresado no parece válido.");
    }
  }

  form["descripcion"].addEventListener("blur", () => {
    validateDescripcionField();
    updateUIValidation();
  });

  form["descripcion"].addEventListener("input", () => {
    validateDescripcionField();
    updateUIValidation();
  });


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
    enableSubmitButtonIfInformationIsOk();
  }

  // --- Field-level boolean validators ---
  function nameIsValid() {
    let name = form["name"];
    return name.value.trim().length > 2;
  }

  function lastNameIsValid() {
    let name = form["lastName"];
    return name.value.trim().length > 2;
  }

  function emailIsValid() {
    let emailInput = form["email"];
    return emailInput.value.trim().length > 4;
  }

  function isPhoneValid() {
    let phone = form["phone"];
    return phone.value.length > 8;
  }

  function passwordIsValid() {
    let password = form["password"];
    return password.value.length > 4
  }


  function isCountryValid() {
    let country = form["country"];
    return country.value.length > 2;
  }

  function hobbiesAreValid() {
    return hobbiesCounter > 0 && hobbiesCounter <= 4

  }

  // --- Check if all fields are valid ---
  function informationIsOk() {

    const isValid =
      nameIsValid() &&
      lastNameIsValid() &&
      passwordIsValid() &&
      isPhoneValid() &&
      emailIsValid() &&
      hobbiesAreValid() &&
      isCountryValid();

    return isValid;
  }


  // --- Enable or disable submit button ---
  function enableSubmitButtonIfInformationIsOk() {

    let submitButton = form["btnSubmit"];

    informationIsOk() && renderErrorList() ? submitButton.removeAttribute('disabled') : submitButton.setAttribute('disabled', '');

  }





