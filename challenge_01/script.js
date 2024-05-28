const formElements = {};
const toastElements = {};

formElements.contactForm = document.querySelector("#contact-form");
formElements.firstNameInput = document.querySelector("#firstname-input");
formElements.lastNameInput = document.querySelector("#lastname-input");
formElements.emailInput = document.querySelector("#email-input");
formElements.radioBtnGE = document.querySelector("#radio-btn-GE");
formElements.radioBtnSR = document.querySelector("#radio-btn-SR");
formElements.messageTextarea = document.querySelector("#message-textarea");
formElements.consentCheckBox = document.querySelector("#consent-checkbox");


toastElements.toast = document.querySelector("#toast");
toastElements.toastText = document.querySelector("#toast-text");
toastElements.toastExit = document.querySelector("#toast-exit");

toastElements.toastExit.addEventListener('click', () => {
    toastElements.toast.classList.add("hidden");
})

formElements.contactForm.addEventListener('submit', (event) => {

    // disabling the default submit and refresh
    event.preventDefault();


    let shouldReturnEarly = false;

    //checking for wrong inputs
    if (!formElements.consentCheckBox.checked) {
        formErrorHandler("please check the consent checkbox to continue",formElements.consentCheckBox)
    }
    if (!formElements.messageTextarea.value) {
        formErrorHandler("please enter a message",formElements.messageTextarea);
    }
    if (!formElements.radioBtnGE.checked && !formElements.radioBtnSR.checked) {
        formErrorHandler("please choose one of the options",formElements.radioBtnGE);
    }
    if (!formElements.emailInput.value) {
        formErrorHandler("please enter email",formElements.emailInput);
    } else if (!formElements.emailInput.value.match(/^[\w.+\-]+@gmail\.com$/)) {
        formErrorHandler("please enter a valid \"gmail\" address",formElements.emailInput);
    }
    if (!formElements.lastNameInput.value) {
        formErrorHandler("please enter last name",formElements.lastNameInput);
    } else if (formElements.lastNameInput.value.length < 4 || formElements.lastNameInput.value.length > 10) {
        formErrorHandler("last name length should be between 4 and 10 letters",formElements.lastNameInput);
    }
    if (!formElements.firstNameInput.value) {
        formErrorHandler("please enter first name",formElements.firstNameInput);
    } else if (formElements.firstNameInput.value.length < 4 || formElements.firstNameInput.value.length > 10) {
        formErrorHandler("first name length should be between 4 and 10 letters",formElements.firstNameInput);
    }

    if (shouldReturnEarly) return;

    // in case of success
    console.log({
        firstname: formElements.firstNameInput.value,
        lastname: formElements.lastNameInput.value,
        email: formElements.emailInput.value,
        querytype: formElements.radioBtnGE.checked ? formElements.radioBtnGE.value : formElements.radioBtnSR.value,
        message: formElements.messageTextarea.value,
    });
    cleanup();
    showMessage("Form submitted successfully", "success");


    // functions
    function showMessage(text, status) {
        toastElements.toastText.innerHTML = text;
        toastElements.toast.classList.add(status);
        toastElements.toast.classList.remove("hidden");
        setTimeout(() => {
            toastElements.toast.classList.remove(status);
            toastElements.toast.classList.add("hidden");
        }, 3000);
    }

    function formErrorHandler(message, errorNode) {
        shouldReturnEarly = true;
        errorNode.focus();
        if (errorNode.type === "radio") {
            errorNode = errorNode.parentNode;
        }
        if (errorNode.type === "checkbox") {
            errorNode = errorNode.parentNode;
        }
        errorNode.classList.add("problem");
        showMessage(message, "error")
        console.error(message);
        errorNode.oninput = () => {
            errorNode.classList.remove("problem");
        }
    }

    function cleanup() {
        formElements.firstNameInput.value = null;
        formElements.lastNameInput.value = null;
        formElements.emailInput.value = null;
        formElements.messageTextarea.value = null;
        formElements.radioBtnGE.checked = false;
        formElements.radioBtnSR.checked = false;
        formElements.consentCheckBox.checked = false;
    }
})
