//importing functions from firebase
import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js"

import { auth } from "./firebase.js";

//import toasts messages
import { toast } from "./utils.js";

//elements of the form
const singupForm = document.getElementById("login_form");
const email = singupForm['email_input'];
const password = singupForm['password_input'];
const singup = document.getElementById("btn_singup");
const login = document.getElementById("btn_login");

singup.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log(email.value + " " + password.value)
    try {
        const userCredencial = await createUserWithEmailAndPassword(auth, email.value, password.value)
        console.log(userCredencial);
        toast("Bienvenodo" + userCredencial.user.email, "success");
        singupForm.reset();
    } catch (error) {
        console.log(error.message);
        console.log(error.code);
        errorMessages(error.code);
    }
})

login.addEventListener("click", (e) => {
    e.preventDefault();
    //console.log("iniciando usuario")

})

const errorMessages = (errorCode) => {
    if (errorCode === 'auth/email-already-in-use') {
        toast("Correo en Uso", "info");
    } else if (errorCode === 'auth/invalid-email') {
        toast("Correo invalido", "error");
    } else if (errorCode === 'auth/missing-password') {
        toast("Se requiere una contraseña", "warning")
    } else if (errorCode === 'auth/weak-password') {
        toast("La contraseña es debil", "warning")
    } else if (errorCode) {
        toast("Error al registrar usuario", "error")
    }

}