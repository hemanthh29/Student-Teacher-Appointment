import { app } from './firebase-config.js';
import { getAuth, signInWithEmailAndPassword, connectAuthEmulator, } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js';

const auth = getAuth(app);
connectAuthEmulator(auth, 'http://localhost:9099');

if (document.getElementById('SignInAdminRadio3').checked) {
    document.getElementById('SignInButton').addEventListener('click', async function (event) {
        event.preventDefault();

        const loginEmail = document.getElementById('SignInEmail').value;
        const loginPassword = document.getElementById('SignInPassword').value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(userCredential);
            // Handle successful sign-in, e.g., redirect to another page
            window.location.href = 'Admin.html';
        } catch (error) {
            console.error('Error signing in:', error.code, error.message);
            // Handle specific errors
            if (error.code === 'auth/user-not-found') {
                alert('No User Found. Please check your credentials.');
            }
            else if (error.code === 'auth/invalid-email'){
                alert('Invalid Email. Please check your credentials.');
            }
            
            else if (error.code === 'auth/wrong-password') {
                alert('Incorrect password. Please check your credentials.');
            }
            else if (error.code === 'auth/network-request-failed'){
                alert('Network Error.Please try again later.');
            }
            else if (error.code === 'auth/internal-error'){
                alert('Internal Error. Please try again later.');
            }
             else {
                alert('Error signing in. Please try again later.');
            }
        }
    });
}