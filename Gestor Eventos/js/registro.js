document.addEventListener("DOMContentLoaded", () => {

    // ===========================================
    // SECCIÓN 1:Formulario de registro - Validación y evaluación de fortaleza de la contraseña  
    // ===========================================

    // Evaluación de la contraseña en tiempo real y mostrar la barra de fortaleza
    document.getElementById("password").addEventListener("input", function () {
      const password = this.value;
      const strengthMessageElem = document.getElementById("password-strength-message");
      const strengthBarElem = document.getElementById("password-strength-bar");

    // Mostrar el mensaje y la barra solo si la contraseña no está vacía
      if (password.length > 0) {
          strengthMessageElem.classList.remove("hidden");
          strengthBarElem.classList.remove("hidden");
      } else {
    // Ocultar el mensaje y la barra si la contraseña está vacía
          strengthMessageElem.classList.add("hidden");
          strengthBarElem.classList.add("hidden");
          strengthBarElem.style.width = "0";  // Resetear la barra
      }

    // Evaluar la fortaleza de la contraseña
      const strengthMessage = evaluatePasswordStrength(password);
      function evaluatePasswordStrength(password) {
      if (password.length > 8) return "Alta";
      if (password.length > 5) return "Media";
      return "Baja";
  }

    // Actualizar el mensaje y la barra de progreso
      strengthMessageElem.textContent = `Fortaleza: ${strengthMessage}`;
      if (strengthMessage === "Alta") {
          strengthBarElem.style.width = "100%";
          strengthBarElem.classList.add("high-strength");
      } else if (strengthMessage === "Media") {
          strengthBarElem.style.width = "60%";
          strengthBarElem.classList.add("medium-strength");
      } else {
          strengthBarElem.style.width = "30%";
          strengthBarElem.classList.add("low-strength");
      }
    });

    // Validar que la contraseña cumpla con los requisitos
      function validatePassword(password) {
      let errors = [];
      if (!/[A-Z]/.test(password)) {
        errors.push("ERROR: Debe contener al menos una letra mayúscula.");
      }
        if (!/[a-z]/.test(password)) {
        errors.push("ERROR: Debe contener al menos una letra minúscula.");
      }
        if (!/[0-9]/.test(password)) {
        errors.push("ERROR: Debe contener al menos un número.");
      }
      return errors.length > 0 ? errors.join(" ") : "";
    }

    // Prevenir el envío del formulario
    document.getElementById("passwordForm").addEventListener("submit", function (e) {
      e.preventDefault();  

      const password = document.getElementById("password").value;
      const errorMessage = validatePassword(password);

      // Mostrar los mensajes de error solo al hacer clic en el botón
      const errorContainer = document.getElementById("errorContainer");

      if (errorMessage) {
          document.getElementById("errorMessages").textContent = errorMessage;
          errorContainer.classList.remove("hidden");
      } else {
          errorContainer.classList.add("hidden");

          // Si no hay errores, mostrar mensaje de éxito
          alert("Usuario registrado con éxito.");
          location.reload();  // Recargar la página para vaciar los campos
      }
  });
})
