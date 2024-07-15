// Purpose: To toggle the password visibility of Password in the Sign-Up page
const SignUpPasswordInput = document.getElementById('SignUpPassword');
const SignUpToggleButton = document.getElementById('ToggleSignUpPassword');
// function to toggle the password visibility
function toggleSignUpPassword(){
    if(SignUpPasswordInput.type === 'password'){
        SignUpPasswordInput.type = 'text';
        SignUpToggleButton.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    }
    else{
        SignUpPasswordInput.type = 'password';
        SignUpToggleButton.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }
}

// Purpose: To toggle the password visibility of Confirm Password in the Sign-Up page
const SignUpConfirmPasswordInput = document.getElementById('SignUpConfirmPassword');
const SignUpConfirmToggleButton = document.getElementById('ToggleSignUpConfirmPassword');
// function to toggle the password visibility
function toggleSignUpConfirmPassword(){
    if(SignUpConfirmPasswordInput.type === 'password'){
        SignUpConfirmPasswordInput.type = 'text';
        SignUpConfirmToggleButton.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    }
    else{
        SignUpConfirmPasswordInput.type = 'password';
        SignUpConfirmToggleButton.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }
}

// Purpose: To toggle the password visibility of Password in the Sign-In page
const SignInPasswordInput = document.getElementById('SignInPassword');
const SignInToggleButton = document.getElementById('ToggleSignInPassword');
// function to toggle the password visibility
function toggleSignInPassword(){
    if(SignInPasswordInput.type === 'password'){
        SignInPasswordInput.type = 'text';
        SignInToggleButton.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    }
    else{
        SignInPasswordInput.type = 'password';
        SignInToggleButton.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }
}
