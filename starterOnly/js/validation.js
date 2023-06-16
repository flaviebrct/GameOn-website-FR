// validate data function
function validateForm(e) {
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const email = document.querySelector('#email').value;
    const birthdate = document.querySelector('#birthdate').value;
    const tournamentQuantity = document.querySelector('#quantity').value;
    
    e.preventDefault()
    if(validateFirstName(firstName) && validateLastName(lastName) && validateEmail(email) && validateBirthdate(birthdate) && validateTournamentQuantity(tournamentQuantity) && validateLocation() && validateTermsOfUse()) {
        console.log("formulaire valide")
    }else {
        throw new Error;
    }
};

const formData = document.querySelectorAll('.formData')

function validateFirstName(firstName){

    if (firstName === "" || firstName.length < 2) {
        formData[0].className = "formData";
        formData[0].dataset.error = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
        formData[0].dataset.errorVisible = "true";
        
        return false
    }else {
        delete formData[0].dataset.error;
        delete formData[0].dataset.errorVisible;
        
        return true
    }
}

function validateLastName(lastName) {
    if (lastName === "" || lastName.length < 2) {
        formData[1].className = "formData";
        formData[1].dataset.error = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
        formData[1].dataset.errorVisible = "true";
        
        return false
    }else {
        delete formData[1].dataset.error;
        delete formData[1].dataset.errorVisible;
        
        return true
    }
}

function validateEmail(email) {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email.match(regexEmail)) {
        formData[2].className = "formData";
        formData[2].dataset.error = "Veuillez entrer une adress email valide.";
        formData[2].dataset.errorVisible = "true";
        
        return false
    }else {
        delete formData[2].dataset.error;
        delete formData[2].dataset.errorVisible;
        
        return true
    }
}

function validateBirthdate(date){
    if(!date) {
        formData[3].className = "formData";
        formData[3].dataset.error = "Vous devez entrer votre date de naissance.";
        formData[3].dataset.errorVisible = "true";
        
        return false
    }else {
        delete formData[3].dataset.error;
        delete formData[3].dataset.errorVisible;
        
        return true
    }

}

function validateTournamentQuantity(quantity){
    if (quantity === "" || quantity < 0 || quantity > 99) {
        formData[4].className = "formData";
        formData[4].dataset.error = "Vous devez entrer une valeur numérique.";
        formData[4].dataset.errorVisible = "true";

        return false
    }else {
        delete formData[4].dataset.error;
        delete formData[4].dataset.errorVisible;

        return true
    }
}

function validateLocation(){
    const radios = document.querySelectorAll("input[name='location']");

    for (let i = 0; i < radios.length; i++) {
        if(radios[i].checked) {
            delete formData[5].dataset.error;
            delete formData[5].dataset.errorVisible;
            
            return true
        }
    }
    formData[5].className = "formData";
    formData[5].dataset.error = "Vous devez choisir une option.";
    formData[5].dataset.errorVisible = "true";

    return false
}

function validateTermsOfUse() {
    const checkbox = document.querySelector('#termsOfUse')

    if(checkbox.checked){
        delete formData[6].dataset.error;
        delete formData[6].dataset.errorVisible;
        
        return true
    }else {
        formData[6].className = "formData";
        formData[6].dataset.error = "Vous devez vérifier que vous acceptez les termes et conditions.";
        formData[6].dataset.errorVisible = "true";

        return false
    }
}