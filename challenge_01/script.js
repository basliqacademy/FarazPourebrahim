const formElements = {}

formElements.contactForm = document.querySelector("#contact-form");
formElements.firstNameInput = document.querySelector("#firstname-input");
formElements.lastNameInput = document.querySelector("#lastname-input");
formElements.emailInput = document.querySelector("#email-input");
formElements.radioBtnGE = document.querySelector("#radio-btn-GE");
formElements.radioBtnSR = document.querySelector("#radio-btn-SR");
formElements.messageTextarea = document.querySelector("#message-textarea");
formElements.consentCheckBox = document.querySelector("#consent-checkbox");

formElements.contactForm.addEventListener('submit',(event) => {

    // disabling the default submit and refresh
    event.preventDefault();


    let shouldReturnEarly = false;
    //checking for wrong inputs
    if (!formElements.firstNameInput.value){
        formErrorHandler("please enter first name");
    }
    else if (formElements.firstNameInput.value.length < 4 || formElements.firstNameInput.value.length > 10){
        formErrorHandler("first name length should be between 4 and 10 letters");
    }
    if (!formElements.lastNameInput.value){
        formErrorHandler("please enter last name");
    }
    else if (formElements.lastNameInput.value.length < 4 || formElements.lastNameInput.value.length > 10){
        formErrorHandler("last name length should be between 4 and 10 letters");
    }
    if (!formElements.emailInput.value){
        formErrorHandler("please enter email");
    }
    else if (!formElements.emailInput.value.match(/^[\w.+\-]+@gmail\.com$/)){
        formErrorHandler("please enter a valid \"gmail\" address");
    }
    if (!formElements.radioBtnGE.checked && !formElements.radioBtnSR.checked){
        formErrorHandler("please choose one of the options");
    }
    if (!formElements.messageTextarea.value){
        formErrorHandler("please enter a message");
    }
    if (!formElements.consentCheckBox.checked){
        formErrorHandler("please check the consent checkbox to continue")
    }

    if (shouldReturnEarly) return;

    console.log({
        firstname: formElements.firstNameInput.value,
        lastname: formElements.lastNameInput.value,
        email: formElements.emailInput.value,
        querytype: formElements.radioBtnGE.checked ? formElements.radioBtnGE.value : formElements.radioBtnSR.value,
        message: formElements.messageTextarea.value,
    });

    function formErrorHandler(message){
        alert(message);
        console.error(message);
        shouldReturnEarly = true;
    }
})
