const contactForm = document.querySelector("#contact-form");
const firstNameInput = document.querySelector("#firstname-input");
const lastNameInput = document.querySelector("#lastname-input");
const emailInput = document.querySelector("#email-input");
const radioBtnGE = document.querySelector("#radio-btn-GE");
const radioBtnSR = document.querySelector("#radio-btn-SR");
const messageTextarea = document.querySelector("#message-textarea");
const consentCheckBox = document.querySelector("#consent-checkbox");

contactForm.addEventListener('submit',(event) => {

    // disabling the default submit and refresh
    event.preventDefault();

    //checking for wrong inputs
    if (!firstNameInput.value){
        alert("please enter first name");
        return;
    }
    if (firstNameInput.value.length < 4 || firstNameInput.value.length > 10){
        alert("first name length should be between 4 and 10 letters");
        return;
    }
    if (!lastNameInput.value){
        alert("please enter last name");
        return;
    }
    if (lastNameInput.value.length < 4 || lastNameInput.value.length > 10){
        alert("last name length should be between 4 and 10 letters");
        return;
    }
    if (!emailInput.value){
        alert("please enter email");
        return;
    }
    if (!emailInput.value.match(/^[\w.+\-]+@gmail\.com$/)){
        alert("please enter a valid \"gmail\" address");
        return;
    }
    if (!radioBtnGE.checked && !radioBtnSR.checked){
        alert("please choose one of the options");
        return;
    }
    if (!messageTextarea.value){
        alert("please enter a message");
        return;
    }
    if (!consentCheckBox.checked){
        alert("please check the consent checkbox to continue")
        return;
    }

    console.log({
        firstname: firstNameInput.value,
        lastname: lastNameInput.value,
        email: emailInput.value,
        querytype: radioBtnGE.checked ? radioBtnGE.value : radioBtnSR.value,
        message: messageTextarea.value,
    });
})