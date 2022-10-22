import { login } from "../../scripts/requests.js";
// import { getUser } from "../../scripts/requests.js";

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
        login(body)
    })
}
loginEvent()

const btnRegister = document.getElementById("btn-register")

btnRegister.addEventListener("click", () => {
    window.location.replace("./pages/register/register.html")
})
