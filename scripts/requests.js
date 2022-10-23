const baseUrl = "http://localhost:3333/"
import { renderModalResponse } from "../../scripts/render.js";
import { getLocalStorage } from "../../scripts/localStorage.js"

async function login (body) {
    let loginButton = document.getElementById("login-btn")
    try {
        const request = await fetch(`${baseUrl}login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        
        if (request.ok) {
            const response = await request.json()
            renderModalResponse("Login feito com sucesso")
            
            localStorage.setItem("petInfoUser", JSON.stringify(response))
            
            setTimeout(() => {
                window.location.replace("./pages/home/home.html")
            }, 4000)
        } else {
            loginButton.classList.toggle("btn-loading")
            let passwordInput = document.getElementById("password")
            passwordInput.classList.toggle("input-field-error")
            let notFound = document.querySelector(".input-error")
            if (!notFound) {
                passwordInput.insertAdjacentHTML("afterend", `<p class="input-error">Verifique se a senha ou o email estão corretos.</p>`)
            }
            throw request
        }

    } catch (error) {
        console.log(error)
    }
}

async function register (body) {
    try {
        const request = await fetch(`${baseUrl}users/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        if (request.ok) {
            const response = await request.json()

            renderModalResponse("Cadastro feito com sucesso")

            setTimeout(() => {
                window.location.replace("../../index.html")
            }, 4000)
        } else {
            console.log("erro")
            throw request
        }

    } catch (error) {
        
    }
}

async function loadPosts () {
    const token = getLocalStorage()
    try {
        const request = await fetch(`${baseUrl}posts`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token.token}`
            }
        })
        
        const response = await request.json()
        return response
        
    } catch (error) {
        
    }
}

async function getUser () {
    const token = getLocalStorage()
    try {
        const request = await fetch(`${baseUrl}users/profile`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token.token}`
            },
        })
        
        if (request.ok) {
            const response = await request.json()
            return response
        } else {
            console.log("erro")
            throw request
        }
        
    } catch (error) {
        console.log(error)
    }
}

async function publishPost (body) {
    const token = getLocalStorage()
    try {
        const request = await fetch(`${baseUrl}posts/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.token}`
            },
            body: JSON.stringify(body)
        })

        if (request.ok) {
            const response = await request.json()
            renderModalResponse("Post publicado com sucesso")
        } else {
            console.log("erro")
            throw request
        }

    } catch (error) {
        console.log(error)
    }
}

async function editPost (body, id) {
    const token = getLocalStorage()
    try {
        const request = await fetch(`${baseUrl}posts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.token}`
            },
            body: JSON.stringify(body)
        })

        if (request.ok) {
            const response = await request.json()
            renderModalResponse("Post editado com sucesso")
        } else {
            console.log("erro")
            throw request
        }

    } catch (error) {
        console.log(error)
    }
}

async function deletePost (id) {
    const token = getLocalStorage()
    try {
        const request = await fetch(`${baseUrl}posts/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.token}`
            },
        })

        if (request.ok) {
            const response = await request.json()
            renderModalResponse("Post deletado com sucesso")
        } else {
            console.log("erro")
            throw request
        }

    } catch (error) {
        console.log(error)
    }
}

export {
    login,
    register,
    loadPosts,
    getUser,
    publishPost,
    editPost,
    deletePost,
}