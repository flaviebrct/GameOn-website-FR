const formData = document.querySelectorAll(".formData");
let submitBtn = document.querySelector(".btn-submit");
// validate data function
function validateForm(e) {
  if (checkAll()) {
    console.log("formulaire valide");

    formData.forEach((element) => (element.style.display = "none"));

    submitBtn.style.display = "none";

    showMsgConfirmation();
    formData.forEach((element) => (element.value = ""));
  }
  e.preventDefault();
}

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

	
  closeBtn.addEventListener("click", () => {
		displayForm()
		resetForm()
	});
}

function resetForm() {
	const form = document.querySelector("form[name='reserve']");
	form.reset()
}



function displayForm() {
	const modalbg = document.querySelector(".bground");
	modalbg.style.display = "none";

	formData.forEach((element) => (element.style.display = "block"));
	
	submitBtn.style.display = "block";
}

function checkAll() {
  const firstName = document.querySelector("#firstName");
  const lastName = document.querySelector("#lastName").value;
  const email = document.querySelector("#email").value;
  const birthdate = document.querySelector("#birthdate").value;
  const tournamentQuantity = document.querySelector("#quantity").value;
  const location = document.querySelectorAll("input[name='location']");

  return (
    validateFirstName(firstName.value) &&
    validateLastName(lastName) &&
    validateEmail(email) &&
    validateBirthdate(birthdate) &&
    validateTournamentQuantity(tournamentQuantity) &&
    validateLocation(location) &&
    validateTermsOfUse()
  );
}

function validateData(indexFormData, msgErreur, ruleOfControl, field) {
  let error = false;
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  switch (ruleOfControl) {
    case "identity":
      if (field === "" || field.length < 2) {
        error = true;
      }
      break;

    case "email":
      if (!field.match(regexEmail)) {
        error = true;
      }
      break;

    case "date":
      if (!field) {
        error = true;
      }
      break;

    case "quantity":
      if (field === "" || field < 0 || field > 99) {
        error = true;
      }
      break;

    case "termsOfUse":
      if (field.checked) {
        error = false;
      } else {
        error = true;
      }
      break;
    case "location":
      let hasChecked = false;
      for (let i = 0; i < field.length; i++) {
        if (field[i].checked) {
          hasChecked = true;
        }
      }
      error = !hasChecked;

      break;
  }

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
    "Vous devez entrer votre date de naissance.",
    "date",
    date
  );
}

function validateTournamentQuantity(quantity) {
  return validateData(
    4,
    "Vous devez entrer une valeur numérique.",
    "quantity",
    quantity
  );
}

function validateLocation(location) {
  return validateData(
    5,
    "Vous devez choisir une destination.",
    "location",
    location
  );
}

function validateTermsOfUse() {
  const checkbox = document.querySelector("#termsOfUse");

  return validateData(
    6,
    "Vous devez vérifier que vous acceptez les termes et conditions.",
    "termsOfUse",
    checkbox
  );
}
