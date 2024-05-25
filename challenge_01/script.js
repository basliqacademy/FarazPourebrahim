const formElements = {}

formElements.contactForm = document.querySelector("#contact-form");
formElements.firstNameInput = document.querySelector("#firstname-input");
formElements.lastNameInput = document.querySelector("#lastname-input");
formElements.emailInput = document.querySelector("#email-input");
formElements.radioBtnGE = document.querySelector("#radio-btn-GE");
formElements.radioBtnSR = document.querySelector("#radio-btn-SR");
formElements.messageTextarea = document.querySelector("#message-textarea");
formElements.consentCheckBox = document.querySelector("#consent-checkbox");

const toast = document.querySelector("#toast");
const toastText = document.querySelector("#toast-text");
const toastExit = document.querySelector("#toast-exit");

toastExit.addEventListener('click',() => {
    toast.classList.add("hidden");
})

formElements.contactForm.addEventListener('submit',(event) => {

    // disabling the default submit and refresh
    event.preventDefault();


    //checking for wrong inputs
    if (!formElements.firstNameInput.value){
        formErrorHandler("please enter first name",formElements.firstNameInput);
        return;
    }
    else if (formElements.firstNameInput.value.length < 4 || formElements.firstNameInput.value.length > 10){
        formErrorHandler("first name length should be between 4 and 10 letters",formElements.firstNameInput);
        return;
    }
    if (!formElements.lastNameInput.value){
        formErrorHandler("please enter last name",formElements.lastNameInput);
        return;
    }
    else if (formElements.lastNameInput.value.length < 4 || formElements.lastNameInput.value.length > 10){
        formErrorHandler("last name length should be between 4 and 10 letters",formElements.lastNameInput);
        return;
    }
    if (!formElements.emailInput.value){
        formErrorHandler("please enter email",formElements.emailInput);
        return;
    }
    else if (!formElements.emailInput.value.match(/^[\w.+\-]+@gmail\.com$/)){
        formErrorHandler("please enter a valid \"gmail\" address",formElements.emailInput);
        return;
    }
    if (!formElements.radioBtnGE.checked && !formElements.radioBtnSR.checked){
        formErrorHandler("please choose one of the options",formElements.radioBtnGE);
        return;
    }
    if (!formElements.messageTextarea.value){
        formErrorHandler("please enter a message",formElements.messageTextarea);
        return;
    }
    if (!formElements.consentCheckBox.checked){
        formErrorHandler("please check the consent checkbox to continue",formElements.consentCheckBox);
        return;
    }

    // in case of success
    console.log({
        firstname: formElements.firstNameInput.value,
        lastname: formElements.lastNameInput.value,
        email: formElements.emailInput.value,
        querytype: formElements.radioBtnGE.checked ? formElements.radioBtnGE.value : formElements.radioBtnSR.value,
        message: formElements.messageTextarea.value,
    });
    cleanup();
    showMessage("Form submitted successfully","success");



    // functions
    function showMessage(text,status){
        toastText.innerHTML = text;
        toast.classList.add(status);
        toast.classList.remove("hidden");
        setTimeout(()=>{
            toast.classList.remove(status);
            toast.classList.add("hidden");
        }, 3000);
    }

    function formErrorHandler(message,errorNode){
        errorNode.focus();
        if (errorNode.type === "radio"){
            errorNode = errorNode.parentNode;
        }
        if (errorNode.type === "checkbox"){
            errorNode = errorNode.parentNode;
        }
        errorNode.classList.add("problem");
        showMessage(message,"error")
        console.error(message);
        errorNode.onchange = () => {errorNode.classList.remove("problem");}
    }

    function cleanup(){
        formElements.firstNameInput.value = formElements.lastNameInput.value = formElements.emailInput.value =  formElements.messageTextarea.value = null;
        formElements.radioBtnGE.checked = formElements.radioBtnSR.checked = formElements.consentCheckBox.checked = false;
    }
})
