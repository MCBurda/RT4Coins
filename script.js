

// ---------- On Load ---------------
// This section removed images when the screen size drops below 400
// to make the design more user friendly.

var lastWidth;

//Function executes on load
window.onload = function() {
    if (window.innerWidth <= 416) {
        removeIntroImages();
    }
    lastWidth = window.innerWidth;
}

window.onresize = function() {
    if ((window.innerWidth <= 416) && (lastWidth > 416)) {
        removeIntroImages();
    }
    if ((window.innerWidth > 416) && (lastWidth <= 416)) {
        location.reload();
    }
    lastWidth = window.innerWidth;
}

function removeIntroImages () {
    var divs = document.querySelectorAll(".removable");
    for(const element of divs) {
        element.parentNode.removeChild(element);
    }   
}


// On contact form submission

const enterName = document.getElementById('nameInput')
const enterEmail = document.getElementById('emailInput')
const enterSubject = document.getElementById('subjectInput')
const enterMessage =  document.getElementById('messageInput')
const form = document.getElementById('contactForm')


function validateForm() {
    enterName.classList.remove("is-invalid");
    enterEmail.classList.remove("is-invalid");
    enterSubject.classList.remove("is-invalid");
    enterMessage.classList.remove("is-invalid");


    if (obviousFilter(enterName.value, "name")) {
        event.preventDefault();
        event.stopPropagation();
        enterName.classList.add("is-invalid");
        alert("The first name you entered is not correct. It cannot contain any spaces or other special characters.");
        return false;
    }

    if (obviousFilter(enterEmail.value, "email") || String(enterEmail.value).indexOf("@") < 1) {
        event.preventDefault();
        event.stopPropagation();
        enterEmail.classList.add("is-invalid");
        alert("The email you entered is not correct. Please remove blank fields, special characters, and remember an @ sign.");
        return false;
    }

    if (obviousFilter(enterSubject.value)) {
        event.preventDefault();
        event.stopPropagation();
        enterSubject.classList.add("is-invalid");
        alert("The Subject you entered is not correct. Please remove any special characters.");
        return false;
    }

    if (obviousFilter(enterMessage.value)) {
        event.preventDefault();
        event.stopPropagation();
        enterMessage.classList.add("is-invalid");
        alert("The Message you entered is not correct. Please remove any special characters.");
        return false;
    }

    form.classList.add("was-validated");
    return true;
}

function obviousFilter(value, type) {
    if(value.length <= 1 ) {
        return true;
    }
    let evilKeys = '';
    if (type === "name") {
        evilKeys = '@!"§$%&/\()=?<>#~+.,-_0123456789';
    }
    else if (type === "email") {
        evilKeys = '!"§$%&/\()=?<>#~,_{[]}';
    }
    else if (type !== "name" || type !== "email") {
        evilKeys = '/\<>{[]}';
    }

    for (let x = 0; x < value.length; x++) {
        if (evilKeys.includes(value[x])) {
            return true;
        }
    }
    return false;

}



