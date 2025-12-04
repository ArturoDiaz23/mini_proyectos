// import file for firebase.js 
import "./scr/app/singUp.js";

//
//buttons for providers
const btn_google = document.getElementById("btn_google");
const btn_apple = document.getElementById("btn_apple");

//span Tengo cuenta
const cambiar_btn = document.getElementById("cambiar_btn");
//buttons for singup and sesion
const btn_login = document.getElementById("btn_login");
const btn_singup = document.getElementById("btn_singup");

cambiar_btn.addEventListener("click", () => {
    btn_login.classList.toggle("hidden");
    btn_singup.classList.toggle("hidden");
    cambiar_btn.textContent = btn_login.classList.contains("hidden") ? "Tengo una cuenta" : "Crear una cuenta";
})

//providers google
btn_google.addEventListener("click", () => {

})

//providers apple
btn_apple.addEventListener("click", () => {

})

