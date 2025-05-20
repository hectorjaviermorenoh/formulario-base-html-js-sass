

// *********************** Capturar el formulario ****************************

  // Captura el formulario con nombre "mainForm"
  const form = document.forms["mainForm"];

// ***************** Validar y permitir solo caracteres específicos en los campos 'name' y 'lastName' *****************
  let caracterAllowed = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  /**
   * Añade un listener para validar la entrada de caracteres permitidos
   * @param {HTMLInputElement} input - Campo de texto a validar
   */

  function validateAllowedCharacters(input) {
    input.addEventListener('keypress', function(e) {

        // Convierte la tecla presionada a minúscula para comparar
        const key = e.key.toLowerCase();

        // Si el caracter no está en la lista de permitidos, se bloquea la entrada
        if (!allowedCharacters.includes(key)) {
          e.preventDefault();
        }

    })

  }

  // Aplica la validación a los campos "name" y "lastName"
  ["name", "lastName"].forEach(fieldName => {
    if(form[fieldName]) {
      validateAllowedCharacters(form[fieldName]);
    }
  })

// ********************* Validar selección máxima en checkboxes de hobbies ******************************//

  // Captura todos los checkboxes con nombre "hobbies"
  const hobbyCheckboxes = form.querySelectorAll('input[name="hobbies"]');
  const maxHobbies = 4;

  /**
   * Controla la cantidad máxima de hobbies seleccionados y deshabilita los demás si se alcanza el límite
   */

  hobbyCheckboxes.forEach(checkbox => {

    checkbox.addEventListener("change", () => {

      // Cuenta cuántos checkboxes están seleccionados
      const checkedCount = Array.from(hobbyCheckboxes).filter(cb => cb.checked).length;

      if (checkedCount >= maxHobbies) {
        // Si se alcanzó el límite, deshabilita los checkboxes no seleccionados
        hobbyCheckboxes.forEach(cb => {
        if (!cb.checked) cb.disabled = true;
      });
      } else {
        // Si no, habilita todos los checkboxes
        hobbyCheckboxes.forEach(cb => cb.disabled = false);
      }


    });
  });

// ***************************************************************************************************//




