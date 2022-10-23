import { login } from "../../scripts/requests.js";
let loginButton = document.getElementById("login-btn")
let userInput = document.getElementById("email")
let passwordInput = document.getElementById("password")

function loginEvent () {
    const form = document.querySelector("form")
    const elements = [...form.elements]
    
    form.addEventListener("submit", async (event) => {
        event.preventDefault()
        const body = {}
        
        elements.forEach(elem => {
            if (elem.tagName  == "INPUT" && elem.value !== "") {
                body[elem.id] = elem.value
            }
        })
        loginButton.classList.toggle("btn-loading")
        login(body)
    })
}
loginEvent()


if (userInput && passwordInput) {
    loginButton.disabled = true
    userInput.addEventListener("keyup", enableButton)
    passwordInput.addEventListener("keyup", enableButton)
}

function enableButton() {
    if (userInput.value == "" || passwordInput.value == "") {
        loginButton.disabled = true
    } else {
        loginButton.disabled = false
    }
}

const btnRegister = document.getElementById("btn-register")

btnRegister.addEventListener("click", () => {
    window.location.replace("./pages/register/register.html")
})
