// Purpose: To toggle the password visibility of Password in the Sign-Up page
const SignUpPasswordInput = document.getElementById('SignUpPassword');
const SignUpToggleButton = document.getElementById('ToggleSignUpPassword');

// function to toggle the password visibility
function toggleSignUpPassword() {
    if (SignUpPasswordInput.type === 'password') {
        SignUpPasswordInput.type = 'text';
        SignUpToggleButton.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    }
    else {
        SignUpPasswordInput.type = 'password';
        SignUpToggleButton.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }
}

// Purpose: To toggle the password visibility of Confirm Password in the Sign-Up page
const SignUpConfirmPasswordInput = document.getElementById('SignUpConfirmPassword');
const SignUpConfirmToggleButton = document.getElementById('ToggleSignUpConfirmPassword');

// function to toggle the password visibility
function toggleSignUpConfirmPassword() {
    if (SignUpConfirmPasswordInput.type === 'password') {
        SignUpConfirmPasswordInput.type = 'text';
        SignUpConfirmToggleButton.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    }
    else {
        SignUpConfirmPasswordInput.type = 'password';
        SignUpConfirmToggleButton.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }
}

// Purpose: To toggle the password visibility of Password in the Sign-In page
const SignInPasswordInput = document.getElementById('SignInPassword');
const SignInToggleButton = document.getElementById('ToggleSignInPassword');

// function to toggle the password visibility
function toggleSignInPassword() {
    if (SignInPasswordInput.type === 'password') {
        SignInPasswordInput.type = 'text';
        SignInToggleButton.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    }
    else {
        SignInPasswordInput.type = 'password';
        SignInToggleButton.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }
}
var Parameter = new URLSearchParams(window.location.search);
if (Parameter.has('TeacherChecked')) {
    document.getElementById('SignInTeacherRadio1').checked = true;
}
else if (Parameter.has('StudentChecked')) {
    document.getElementById('SignInStudentRadio2').checked = true;
}
else {
    document.getElementById('SignInTeacherRadio1').disabled = true;
    document.getElementById('SignInStudentRadio2').disabled = true;
    document.getElementById('SubHead').textContent = '';
    // Create Admin radio input
    var AdminInput = document.createElement('input');
    AdminInput.setAttribute('class', 'form-check-input');
    AdminInput.setAttribute('type', 'radio');
    AdminInput.setAttribute('name', 'gridRadios');
    AdminInput.setAttribute('id', 'SignInAdminRadio3');
    AdminInput.setAttribute('value', 'Admin');
    AdminInput.setAttribute('checked', 'true');

    // Create Admin radio label
    var AdminLabel = document.createElement('label');
    AdminLabel.setAttribute('class', 'form-check-label');
    AdminLabel.setAttribute('for', 'SignInAdminRadio3');
    AdminLabel.textContent = 'Admin';

    // Create container div for the radio button and label
    var AdminContainer = document.createElement('div');
    AdminContainer.setAttribute('class', 'form-check');
    AdminContainer.appendChild(AdminInput);
    AdminContainer.appendChild(AdminLabel);

    // Append the container div to your desired location in the DOM
    var FormContainer = document.getElementById('AdminRadio'); // Adjust this to your actual form element or container
    if (FormContainer) {
        FormContainer.appendChild(AdminContainer);
    } else {
        console.error('Form container element not found.');
    }

}
