// validate data function
function validateForm(e) {
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const email = document.querySelector('#email').value;
    const tournamentQuantity = document.querySelector('#quantity').value;
    
    e.preventDefault()
    if(validateFirstName(firstName) && validateLastName(lastName) && validateEmail(email) && validateTournamentQuantity(tournamentQuantity) && validateLocation() && validateTermsOfUse()) {
        console.log("formulaire valide")
    }else {
        throw new Error;
    }
};

function validateFirstName(firstName){

    if (firstName === "" || firstName.length < 2) {
        console.log('First name invalid');
        return false
    }else {
        return true
    }
}

function validateLastName(lastName) {
    if (lastName === "" || lastName.length < 2) {
        console.log('Last name invalid');
        return false
    } else {
        return true
    }
}

function validateEmail(email) {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email.match(regexEmail)) {
        console.log('email invalid');
        return false
    } else {
        return true
    }
}

function validateTournamentQuantity(quantity){
    if (quantity === "" || quantity < 0 || quantity > 99) {
        console.log('tournament qt invalid');
        return false
    } else {
        return true
    }
}

function validateLocation(){
    const radios = document.querySelectorAll("input[name='location']");

    for (let i = 0; i < radios.length; i++) {
        if(radios[i].checked) {
            return true
        }
    }
    console.log('none selected');
    return false
}

function validateTermsOfUse() {
    const checkbox = document.querySelector('#termsOfUse')

    if(checkbox.checked){
        return true
    }else {
        console.log('terms of use not checked');
        return false
    }
}