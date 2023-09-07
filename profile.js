// hardcoded data
const defaultAccountName = "Annika";
const defaultDisplayName = "Anny";
const defaultBirth = "1998-12-04";
const defaultEmail = "ts87@rice.edu";
const defaultPhone = "123-123-1234";
const defaultZip = "12345";
const defaultPassword = "12345";

// to verify user info input
var isEnteredUserInfoDict = {
    "displayName": false,
    "email": false,
    "phone": false,
    "zip": false,
    "password": false,
    "confirmedPassword": false
}

var isValidUserInfoDict = {
    "displayName": false,
    "email": false,
    "phone": false,
    "zip": false,
    "password": false,
    "confirmedPassword": false
};

var oldUserInfoIDDict = {
    "displayName": "oldDisplayName",
    "email": "oldEmail",
    "phone": "oldPhone",
    "zip": "oldZip",
    "password": "oldPassword",
};

var inputUserInfoIDDict = {
    "displayName": "newDisplayName",
    "email": "newEmail",
    "phone": "newPhone",
    "zip": "newZip",
    "password": "newPassword",
    "confirmedPassword": "newConfirmedPassword"
}

var showedUserInfoUpdateMessage = {
    "displayName": "display name",
    "email": "email address",
    "phone": "phone number",
    "zip": "zip code",
    "password": "password"
};


function init(s) {
    initAccountName();
    initDisplayName();
    initBirth();
    initEmail();
    initPhone();
    initZip();
    initPassword();

    initDisplayNameInput();
    initEmailInput();
    initPhoneInput();
    initZipInput();
    initpasswordInput();
    initConfirmedPasswordInput();

    initUpdateBtn();
}

function initAccountName() {
    const accountName = document.getElementById("oldAccountName");
    accountName.innerHTML = defaultAccountName;
}

function initDisplayName() {
    const displayName = document.getElementById("oldDisplayName");
    displayName.innerHTML = defaultDisplayName;
}

function initBirth() {
    const birth = document.getElementById("oldBirth");
    birth.innerHTML = defaultBirth;
}

function initEmail() {
    const email = document.getElementById("oldEmail");
    email.innerHTML = defaultEmail;
}

function initPhone() {
    const phone = document.getElementById("oldPhone");
    phone.innerHTML = defaultPhone;
}

function initZip() {
    const zip = document.getElementById("oldZip");
    zip.innerHTML = defaultZip;
}

function initPassword() {
    const password = document.getElementById("oldPassword");
    passwordValue = defaultPassword;
    displayPassword(password, passwordValue);
}

function displayPassword(element, password) {
    var displayedPassword = "";
    for (_ in password) {
        displayedPassword += "*";
    }
    element.innerHTML = displayedPassword;
}

function initDisplayNameInput() {
    const displayNameInput = document.getElementById("newDisplayName");

    // update isEnteredUserInfoDict & isValidUserInfoDict if user inputs
    // show error message if the input is in wrong format
    displayNameInput.addEventListener("input", function (event) {
        let displayNameValue = event.target.value;
        // verify nonempty
        if (displayNameValue != "") {
            // verify valid
            isEnteredUserInfoDict["displayName"] = true;
            isValidUserInfoDict["displayName"] = true;
        }
        else {
            isEnteredUserInfoDict["displayName"] = false;
            isValidUserInfoDict["displayName"] = false;
        }
    });
}

function initEmailInput() {
    const emailInput = document.getElementById("newEmail");

    // update isEnteredUserInfoDict & isValidUserInfoDict if user inputs
    // show error message if the input is in wrong format
    emailInput.addEventListener("input", function (event) {
        let emailInput = event.target;
        let emailValue = emailInput.value;
        // verify nonempty
        if (emailValue != "") {
            isEnteredUserInfoDict["email"] = true;
            // verify valid and set error message
            let isValidInput = true;
            let errorMessage = "";
            if (!emailValue.includes("@")) {
                isValidInput = false;
                errorMessage += "Please add @. ";
            }
            else {
                let subEmails = emailValue.split("@");
                if (subEmails.length != 2 || subEmails[0] == "" || subEmails[1] == "") {
                    isValidInput = false;
                    errorMessage += "Please enter in this format: xxx@ooo.";
                }
            }

            // show error message if necessary
            const inputEmailMessage = document.getElementById("inputEmailMessage");
            if (!isValidInput) {
                inputEmailMessage.innerHTML = errorMessage;
            }
            // hide error message if necessary
            // update isValidUserInfoDict
            else {
                inputEmailMessage.innerHTML = "";
                isValidUserInfoDict["email"] = true;
            }
        }
        else {
            // hide error message
            inputEmailMessage.innerHTML = "";
            isEnteredUserInfoDict["email"] = false;
            isValidUserInfoDict["email"] = false;
        }
    });
}

function initPhoneInput() {
    const phoneInput = document.getElementById("newPhone");

    // update isEnteredUserInfoDict & isValidUserInfoDict if user inputs
    // show error message if the input is in wrong format
    phoneInput.addEventListener("input", function (event) {
        let phoneInput = event.target;
        let phoneValue = phoneInput.value;
        // verify nonempty
        if (phoneValue != "") {
            isEnteredUserInfoDict["phone"] = true;
            // verify valid and set error message
            let isValidInput = true;
            let errorMessage = "";
            if (!phoneValue.includes("-")) {
                isValidInput = false;
            }
            else {
                let subPhones = phoneValue.split("-");
                if (!(subPhones.length == 3 && subPhones[0] != "" && subPhones[1] != "" && subPhones[2] != "")) {
                    isValidInput = false;
                }
                else if (subPhones[0].length != 3 || subPhones[1].length != 3 || subPhones[2].length != 4) {
                    isValidInput = false;
                }
                else {
                    for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < subPhones[i].length; j++) {
                            let asciiNum = subPhones[i].charCodeAt(j);
                            if (!(asciiNum >= 48 && asciiNum <= 57)) {
                                isValidInput = false;
                                break;
                            }
                        }
                        if (!isValidInput) {
                            break;
                        }
                    }
                }
            }

            // show error message if necessary
            const inputPhoneMessage = document.getElementById("inputPhoneMessage");
            if (!isValidInput) {
                errorMessage += "Please enter in this format: 123-123-1234.";
                inputPhoneMessage.innerHTML = errorMessage;
            }
            // hide error message if necessary
            // update isValidUserInfoDict
            else {
                inputPhoneMessage.innerHTML = "";
                isValidUserInfoDict["phone"] = true;
            }
        }
        else {
            // hide error message
            inputPhoneMessage.innerHTML = "";
            isEnteredUserInfoDict["phone"] = false;
            isValidUserInfoDict["phone"] = false;
        }
    });
}

function initZipInput() {
    const zipInput = document.getElementById("newZip");

    // update isEnteredUserInfoDict & isValidUserInfoDict if user inputs
    // show error message if the input is in wrong format
    zipInput.addEventListener("input", function (event) {
        let zipInput = event.target;
        let zipValue = zipInput.value;
        // verify nonempty
        if (zipValue != "") {
            isEnteredUserInfoDict["zip"] = true;
            // verify valid and set error message
            let isValidInput = true;
            let errorMessage = "";
            if (zipValue.length != 5) {
                isValidInput = false;
            }
            else {
                for (let i = 0; i < zipValue.length; i++) {
                    let asciiNum = zipValue.charCodeAt(i);
                    if (!(asciiNum >= 48 && asciiNum <= 57)) {
                        isValidInput = false;
                        break;
                    }
                }
            }

            // show error message if necessary
            const inputZipMessage = document.getElementById("inputZipMessage");
            if (!isValidInput) {
                errorMessage += "Please enter in this format: 12345.";
                inputZipMessage.innerHTML = errorMessage;
            }
            // hide error message if necessary
            // update isValidUserInfoDict
            else {
                inputZipMessage.innerHTML = "";
                isValidUserInfoDict["zip"] = true;
            }
        }
        else {
            // hide error message
            inputZipMessage.innerHTML = "";
            isEnteredUserInfoDict["zip"] = false;
            isValidUserInfoDict["zip"] = false;
        }
    });
}

function initpasswordInput() {
    const passwordInput = document.getElementById("newPassword");

    // update isEnteredUserInfoDict & isValidUserInfoDict if user inputs
    // show error message if the input is in wrong format
    passwordInput.addEventListener("input", passwordHandler);
}

function initConfirmedPasswordInput() {
    const confirmedPasswordInput = document.getElementById("newConfirmedPassword");

    // update isEnteredUserInfoDict & isValidUserInfoDict if user inputs
    // show error message if the input is in wrong format
    confirmedPasswordInput.addEventListener("input", passwordHandler);
}

function passwordHandler() {
    let confirmedPasswordInput = document.getElementById("newConfirmedPassword");
    let confirmedPasswordValue = confirmedPasswordInput.value;
    let passwordValue = document.getElementById("newPassword").value;
    // verify nonempty
    if (passwordValue != "" && confirmedPasswordValue != "") {
        isEnteredUserInfoDict["password"] = true;
        isEnteredUserInfoDict["confirmedPassword"] = true;
        // verify valid and set error message
        let isValidInput = true;
        let errorMessage = "";
        if (passwordValue != confirmedPasswordValue) {
            isValidInput = false;
        }

        // show error message if necessary
        const inputConfirmedPasswordMessage = document.getElementById("inputConfirmedPasswordMessage");
        if (!isValidInput) {
            errorMessage += "Please match the passwords.";
            inputConfirmedPasswordMessage.innerHTML = errorMessage;
        }
        // hide error message if necessary
        // update isValidUserInfoDict
        else {
            inputConfirmedPasswordMessage.innerHTML = "";
            isValidUserInfoDict["password"] = true;
            isValidUserInfoDict["confirmedPassword"] = true;
        }
    }
    else {
        // hide error message
        inputConfirmedPasswordMessage.innerHTML = "";
        isEnteredUserInfoDict["password"] = false;
        isValidUserInfoDict["password"] = false;
        isEnteredUserInfoDict["confirmedPassword"] = false;
        isValidUserInfoDict["confirmedPassword"] = false;
    }
}

function initUpdateBtn() {
    const updateBtn = document.getElementById("updateBtn");
    updateBtn.addEventListener("click", function () {
        // verify all non-empty input fields are valid
        var isValidInput = true;
        var updatedInputs = {};
        for (let key in isEnteredUserInfoDict) {
            if (isEnteredUserInfoDict[key]) {
                updatedInputs[key] = oldUserInfoIDDict[key];
            }
        }
        for (let key in updatedInputs) {
            if (!isValidUserInfoDict[key]) {
                isValidInput = false;
                break;
            }
        }
        // ignore confirmed Password
        if ("confirmedPassword" in updatedInputs) {
            delete updatedInputs["confirmedPassword"];
        }

        // check if no valid input fields
        if (Object.keys(updatedInputs).length == 0) {
            return;
        }

        // show wrong input message if necessary
        if (!isValidInput) {
            const errorMessage = "Please enter in correct format.";
            userInfoUpdateMessage.innerHTML = errorMessage;
        }
        // show updated user info message and update user info
        else {
            // show updated user info message for 7 seconds
            const userInfoUpdateMessageElement = document.getElementById("userInfoUpdateMessage");
            var userInfoUpdateMessage = "You have updated: \n";
            for (key in updatedInputs) {
                if (key == "password") {
                    userInfoUpdateMessage += "- " + showedUserInfoUpdateMessage[key];
                }
                else {
                    let oldUserInfoID = oldUserInfoIDDict[key];
                    let oldUserInfoElement = document.getElementById(oldUserInfoID);
                    let oldUserInfoValue = oldUserInfoElement.innerHTML;
                    let inputUserInfoID = inputUserInfoIDDict[key];
                    let newUserInfoValue = document.getElementById(inputUserInfoID).value;

                    userInfoUpdateMessage += "- " + showedUserInfoUpdateMessage[key] + ":\n";
                    userInfoUpdateMessage += "    old: " + oldUserInfoValue + "\n";
                    userInfoUpdateMessage += "    new: " + newUserInfoValue + "\n\n";
                }
            };
            console.log(userInfoUpdateMessage);
            userInfoUpdateMessageElement.textContent = userInfoUpdateMessage;
            setTimeout(function () {
                const userInfoUpdateMessageElement = document.getElementById("userInfoUpdateMessage");
                userInfoUpdateMessageElement.textContent = "";
            }, 7000);


            // update user info
            for (let key in updatedInputs) {
                let oldUserInfoID = oldUserInfoIDDict[key];
                let oldUserInfoElement = document.getElementById(oldUserInfoID);
                let inputUserInfoID = inputUserInfoIDDict[key];
                let newUserInfoValue = document.getElementById(inputUserInfoID).value;
                if (key == "password") {
                    displayPassword(oldUserInfoElement, newUserInfoValue);
                }
                else {

                    oldUserInfoElement.innerHTML = newUserInfoValue;
                }

                if (key == "displayName") {
                    let profileName = document.getElementById("profileName");
                    profileName.innerHTML = newUserInfoValue;
                }
            }

            // reset isEnteredUserInfoDict & isValidUserInfoDict
            resetIsEnteredUserInfoDict()
            resetIsValidUserInfoDict()
            resetInputFields()
        }
    })
}

function resetIsEnteredUserInfoDict() {
    for (let key in isEnteredUserInfoDict) {
        isEnteredUserInfoDict[key] = false;
    }
}

function resetIsValidUserInfoDict() {
    for (let key in isValidUserInfoDict) {
        isValidUserInfoDict[key] = false;
    }
}

function resetInputFields() {
    for (let key in inputUserInfoIDDict) {
        let inputUserInfoID = inputUserInfoIDDict[key];
        let inputUserInfoElement = document.getElementById(inputUserInfoID);
        inputUserInfoElement.value = "";
    }
}


