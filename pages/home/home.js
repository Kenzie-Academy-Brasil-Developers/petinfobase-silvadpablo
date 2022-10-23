import { loadPosts } from "../../scripts/requests.js"
import { getUser } from "../../scripts/requests.js";
import { publishPost} from "../../scripts/requests.js"
import { getLocalStorage } from "../../scripts/localStorage.js";
import { renderModalCreate } from "../../scripts/render.js"
import { renderPosts } from "../../scripts/render.js"

async function checkUser () {
    const userToken = getLocalStorage()

    if (userToken == "" || userToken == null) {
        window.location.replace("../../index.html")
    } else {
        const btnUser = document.querySelector(".btn-user")
        const btnUserName = document.getElementById("username-logout")
        const posts = await loadPosts()
        
        await getUser().then(e =>{
            btnUser.src = e.avatar
            btnUserName.innerText = `@${e.username}`
        })
        
        await getUser().then(e => {
            renderPosts(posts, e.username)
        })

        const divDrop = document.querySelector(".logout-option")
        divDrop.addEventListener("click", () => {
            localStorage.removeItem("petInfoUser")
            window.location.replace("../../index.html")
        })
        
    }
}
checkUser()

function eventCreate() {
    const button = document.getElementById("btn-create-post")
    button.addEventListener("click", () => {
        renderModalCreate()
        const form = document.querySelector("form")
        const elements = [...form.elements]
        const publishButton = document.getElementById("modal-btn-publish")
        
        publishButton.addEventListener("click", async (event) => {
            const body = {}
            
            elements.forEach(elem => {
                if (elem.tagName  !== "LABEL" && elem.value !== "") {
                    body[elem.id] = elem.value
                }
            })
            await publishPost(body)
            const posts = await loadPosts()
            event.target.parentElement.parentElement.parentElement.remove()
            await getUser().then(e => {
                renderPosts(posts, e.username)
            })
        })
    })
}
eventCreate()