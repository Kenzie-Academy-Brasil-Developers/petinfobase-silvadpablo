import { register } from "../../scripts/requests.js"

function eventRegister () {
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
        register(body)
    })
}
eventRegister()

const loginButtons = document.querySelectorAll(".back-login")
const buttons = [...loginButtons]

buttons.forEach(element => {
    element.addEventListener("click", () => {
        window.location.replace("../../index.html")
    })
})


