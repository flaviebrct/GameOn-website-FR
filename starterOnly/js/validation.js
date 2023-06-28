// DOM Elements
const formData = document.querySelectorAll(".formData");
let submitBtn = document.querySelector(".btn-submit");

// fonction qui vient cacher tous les inputs de la modale et
// afficher le message de confirmation si la fonction "checkAll" renvoie true
function validateForm(e) {
  if (checkAll()) {
    console.log("formulaire valide");

    formData.forEach((element) => (element.style.display = "none"));

    submitBtn.style.display = "none";

    showMsgConfirmation();
  }
  e.preventDefault();
}

// fonction qui vient modifier me DOM en créant et affichant un message de confirmation
// et un bouton de fermeture de la modale
function showMsgConfirmation() {
  let validationMessage = document.createElement("p");
  validationMessage.className = "confirmation";
  validationMessage.innerHTML = "Merci pour votre inscription.";

  let closeBtn = document.createElement("input");
  closeBtn.className = "btn-submit";
  closeBtn.value = "Fermer";

  let confirmationWrapper = document.createElement("div");
  confirmationWrapper.className = "modal-confirmation";
  confirmationWrapper.appendChild(validationMessage);
  confirmationWrapper.appendChild(closeBtn);

  let modalbody = document.getElementsByClassName("modal-body");
  modalbody[0].appendChild(confirmationWrapper);

  // écouteur d'événement qui vient fermer la modale et appeler les fonctions
  // "displayForm" et "resetForm" au clic
  closeBtn.addEventListener("click", () => {
    const modalbg = document.querySelector(".bground");
    modalbg.style.display = "none";
    displayForm();
    resetForm();
  });
}

// remet à zero le contenu du formulaire
function resetForm() {
  const form = document.querySelector("form[name='reserve']");
  form.reset();
}

// fonction qui vient réafficher tous les inputs
// ainsi que le bouton submit du formulaire
function displayForm() {
  formData.forEach((element) => (element.style.display = "block"));
  submitBtn.style.display = "block";
}

// fonction qui appelle le validateur relatif à chaque champ du formulaire
// et retourne true si tous les champs sont correctement remplis
function checkAll() {
  const firstName = document.querySelector("#firstName");
  const lastName = document.querySelector("#lastName").value;
  const email = document.querySelector("#email").value;
  const birthdate = document.querySelector("#birthdate").value;
  const tournamentQuantity = document.querySelector("#quantity").value;
  const checkbox = document.querySelector("#termsOfUse");
  const location = document.querySelectorAll("input[name='location']");

  return (
    validateFirstName(firstName.value) &&
    validateLastName(lastName) &&
    validateEmail(email) &&
    validateBirthdate(birthdate) &&
    validateTournamentQuantity(tournamentQuantity) &&
    validateLocation(location) &&
    validateTermsOfUse(checkbox)
  );
}

// fonction qui permet de créer plusieurs cas, si le cas est confirmé alors on affiche
// le message d'erreur correspondant sinon on teste le cas suivant
function validateData(indexFormData, msgErreur, ruleOfControl, field) {
  let error = false;
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  switch (ruleOfControl) {
    // si le champ est vide ou qu'il compte moins de deux caractères alors
    // on affiche un message d'erreur
    case "identity":
      if (field === "" || field.length < 2) {
        error = true;
      }
      break;

    // si l'email entré ne correspond pas au pattern du regex alors
    // on affiche un message d'erreur
    case "email":
      if (!field.match(regexEmail)) {
        error = true;
      }
      break;

    // si aucune date n'est entrée alors on affiche le message d'erreur
    case "date":
      if (!field) {
        error = true;
      }
      break;

    // si la valeurs est inférieure à 0, ou suppérieure à 99, ou vide alors
    // on affiche le message d'erreur
    case "quantity":
      if (field === "" || field < 0 || field > 99) {
        error = true;
      }
      break;

    // on vient vérifier pour chaque bouton radio si il est checked, si aucun ne l'est alors
    // on assigne true à error et donc on affiche le message d'erreur
    case "location":
      let hasChecked = false;
      for (let i = 0; i < field.length; i++) {
        if (field[i].checked) {
          hasChecked = true;
        }
      }
      error = !hasChecked;
      break;

    // on affiche le message d'erreur si la checkbox des conditions d'utilisations n'est pas cochée
    case "termsOfUse":
      if (field.checked) {
        error = false;
      } else {
        error = true;
      }
      break;
  }

  // quand error est true on vient afficher le message d'erreur et appeler les
  // data attributes qui afichent le css d'erreur
  if (error === true) {
    formData[indexFormData].className = "formData";
    formData[indexFormData].dataset.error = msgErreur;
    formData[indexFormData].dataset.errorVisible = "true";
  } else {
    delete formData[indexFormData].dataset.error;
    delete formData[indexFormData].dataset.errorVisible;
  }

  return !error;
}

// pour chaque fonction validate on cible l'input grâce à son index, on spécifie le message d'erreur
// on cible le case à verifier et on a comme argument la value de l'input récupéré dans le DOM
function validateFirstName(firstName) {
  return validateData(
    0,
    "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
    "identity",
    firstName
  );
}

function validateLastName(lastName) {
  return validateData(
    1,
    "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
    "identity",
    lastName
  );
}

function validateEmail(email) {
  return validateData(
    2,
    "Veuillez entrer une adresse email valide.",
    "email",
    email
  );
}

function validateBirthdate(date) {
  return validateData(
    3,
    "Veuillez entrer votre date de naissance.",
    "date",
    date
  );
}

function validateTournamentQuantity(quantity) {
  return validateData(
    4,
    "Veuillez entrer une valeur numérique valide.",
    "quantity",
    quantity
  );
}

function validateLocation(location) {
  return validateData(
    5,
    "Veuillez choisir une destination.",
    "location",
    location
  );
}

function validateTermsOfUse(checkbox) {
  return validateData(
    6,
    "Veuillez vérifier que vous acceptez les termes et conditions.",
    "termsOfUse",
    checkbox
  );
}
