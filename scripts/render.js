import { getUser, deletePost, editPost, loadPosts } from "./requests.js";

export function renderPosts (array, localUserName) {
    const allPosts = document.querySelector(".all-posts")
    allPosts.innerHTML = ""

    array.forEach(element => {
        let {title, content, user: {username, avatar}} = element

        let post = document.createElement("li")
        post.classList = "flex flex-col post"
        allPosts.append(post)

        let postHeader = document.createElement("header")
        postHeader.classList = "flex items-center justify-between"
        post.append(postHeader)

        let userDiv = document.createElement("div")
        userDiv.classList = "flex items-center user-header"
        postHeader.append(userDiv)

        let userImg = document.createElement("img")
        userImg.classList = "btn-user"
        userImg.src = avatar
        userImg.alt = "User profile image"
        userDiv.append(userImg)

        let pUser = document.createElement("p")
        pUser.classList = "post-user"
        pUser.innerText = username
        userDiv.append(pUser)

        let pDate = document.createElement("p")
        pDate.classList = "post-date"
        let date = setUpDate()
        pDate.innerText = date
        userDiv.append(pDate)

        if (localUserName == username) {
            let editDiv = document.createElement("div")
            editDiv.classList = "flex btn-edit"
            postHeader.append(editDiv)
    
            let btnEdit = document.createElement("button")
            btnEdit.classList = "btn btn-medium btn-medium-outline"
            btnEdit.innerText = "Editar"
            editDiv.append(btnEdit)

            btnEdit.addEventListener("click", () => {
                renderModalEditPost(element)
            })
    
            let btnDelete = document.createElement("button")
            btnDelete.classList = "btn btn-medium btn-medium-grey"
            btnDelete.innerText = "Excluir"
            editDiv.append(btnDelete)

            btnDelete.addEventListener("click", () => {
                renderModalDeletePost(element)
            })
        }

        let h2Title = document.createElement("h2")
        h2Title.classList = "post-title"
        h2Title.innerText = title
        post.append(h2Title)

        let pText = document.createElement("p")
        pText.classList = "post-text text-truncated"
        pText.innerText = content
        post.append(pText)

        let link = document.createElement("a")
        link.classList = "link"
        link.innerText = "Acessar publicação"
        link.href = "#"
        post.append(link)

        link.addEventListener("click", () => {
            renderModalOpenPost(element)
        })
    });
}

export function renderModalResponse (message) {
    const body = document.querySelector("body")

    let modalResponse = document.createElement("div")
    modalResponse.classList = "modal-response"
    body.insertAdjacentElement("afterbegin", modalResponse)

    let div = document.createElement("div")
    div.classList = "flex"
    modalResponse.append(div)

    let img = document.createElement("img")
    img.src = "../../assets/imgs/check.png"
    img.alt = "check icon"
    div.append(img)

    let h2 = document.createElement("h2")
    h2.classList = "modal-success"
    h2.innerText = message
    div.append(h2)
}

export function renderModalCreate () {
    const body = document.querySelector("body")

    let container = document.createElement("div")
    container.classList = "modal-container create-post"
    body.insertAdjacentElement("afterbegin", container)

    let modal = document.createElement("div")
    modal.classList = "modal"
    container.append(modal)

    let header = document.createElement("div")
    header.classList = "flex items-center justify-between modal-header"
    modal.append(header)

    let title = document.createElement("p")
    title.classList = "post-title"
    title.innerText = "Criando novo post"
    header.append(title)

    let close = document.createElement("button")
    close.classList = "modal-close"
    close.innerText = "X"
    header.append(close)

    close.addEventListener("click", () => {
        event.target.parentElement.parentElement.parentElement.remove()
    })

    let inputs = document.createElement("form")
    inputs.classList = "flex flex-col modal-edit"
    modal.append(inputs)

    let labelTitle = document.createElement("label")
    labelTitle.classList = "input-label"
    labelTitle.for = "title"
    labelTitle.innerText = "Título do post"
    inputs.append(labelTitle)

    let inputTitle = document.createElement("input")
    inputTitle.classList = "input"
    inputTitle.type = "text"
    inputTitle.name = "title"
    inputTitle.id = "title"
    inputTitle.placeholder = "Digite seu título aqui"
    inputs.append(inputTitle)
    
    let labelContent = document.createElement("label")
    labelContent.classList = "input-label"
    labelContent.for = "content"
    labelContent.innerText = "Conteúdo do post"
    inputs.append(labelContent)

    let inputContent = document.createElement("textarea")
    inputContent.classList = "input"
    inputContent.name = "content"
    inputContent.id = "content"
    inputContent.cols = "30"
    inputContent.rows = "10"
    inputContent.placeholder = "Desenvolva o conteúdo da postagem aqui"
    inputs.append(inputContent)

    let buttonDiv = document.createElement("div")
    buttonDiv.classList = "flex justify-end modal-edit-buttons"
    modal.append(buttonDiv)

    let cancel = document.createElement("button")
    cancel.classList = "btn btn-big btn-grey"
    cancel.innerText = "Cancelar"
    buttonDiv.append(cancel)

    cancel.addEventListener("click", () => {
        event.target.parentElement.parentElement.parentElement.remove()
    })

    let publish = document.createElement("button")
    publish.classList = "btn btn-big btn-primary"
    publish.type = "submit"
    publish.id = "modal-btn-publish"
    publish.innerText = "Publicar"
    buttonDiv.append(publish)

}

function renderModalOpenPost (element) {
    let {title, content, user: {username, avatar}} = element
    const body = document.querySelector("body")

    let modalContainer = document.createElement("div")
    modalContainer.classList = "modal-container open-post"
    body.insertAdjacentElement("afterbegin", modalContainer)

    let modal = document.createElement("div")
    modal.classList = "modal"
    modalContainer.append(modal)

    let modalHeader = document.createElement("div")
    modalHeader.classList = "flex justify-between modal-header"
    modal.append(modalHeader)

    let userHeader = document.createElement("div")
    userHeader.classList = "flex items-center user-header"
    modalHeader.append(userHeader)

    let userImg = document.createElement("img")
    userImg.classList = "btn-user"
    userImg.src = avatar
    userImg.alt = "User profile image"
    userHeader.append(userImg)

    let pUser = document.createElement("p")
    pUser.classList = "post-user"
    pUser.innerText = username
    userHeader.append(pUser)

    let pDate = document.createElement("p")
    pDate.classList = "post-date"
    let date = setUpDate()
    pDate.innerText = date
    userHeader.append(pDate)

    let close = document.createElement("button")
    close.classList = "modal-close"
    close.innerText = "X"
    modalHeader.append(close)
    close.addEventListener("click", () => {
        event.target.parentElement.parentElement.parentElement.remove()
    })

    let post = document.createElement("div")
    post.classList = "flex flex-col modal-post"
    modal.append(post)

    let h2Title = document.createElement("h2")
    h2Title.classList = "post-title"
    h2Title.innerText = title
    post.append(h2Title)

    let pContent = document.createElement("p")
    pContent.classList = "post-text"
    pContent.innerText = content
    post.append(pContent)
}

function renderModalEditPost (element) {
    let {id, title, content} = element
    let body = document.querySelector("body")

    let container = document.createElement("div")
    container.classList = "modal-container edit-post"
    body.insertAdjacentElement("afterbegin", container)

    let modal = document.createElement("div")
    modal.classList = "modal"
    container.append(modal)

    let modalHeader = document.createElement("div")
    modalHeader.classList = "flex items-center justify-between modal-header"
    modal.append(modalHeader)

    let pEdit = document.createElement("p")
    pEdit.classList = "post-title"
    pEdit.innerText = "Edição"
    modalHeader.append(pEdit)

    let close = document.createElement("button")
    close.classList = "modal-close"
    close.innerText = "X"
    modalHeader.append(close)

    close.addEventListener("click", () => {
        event.target.parentElement.parentElement.parentElement.remove()
    })

    let modalEdit = document.createElement("modal-edit")
    modalEdit.classList = "flex flex-col modal-edit"
    modal.append(modalEdit)

    let labelTitle = document.createElement("label")
    labelTitle.classList = "input-label"
    labelTitle.for = "title"
    labelTitle.innerText = "Título do post"
    modalEdit.append(labelTitle)

    let inputTitle = document.createElement("input")
    inputTitle.classList = "input"
    inputTitle.type = "text"
    inputTitle.name = "title"
    inputTitle.id = "title"
    inputTitle.placeholder = "Digite seu título aqui"
    inputTitle.value = title
    modalEdit.append(inputTitle)

    let labelContent = document.createElement("label")
    labelContent.classList = "input-label"
    labelContent.for = "content"
    labelContent.innerText = "Conteúdo do post"
    modalEdit.append(labelContent)

    let textConent = document.createElement("textarea")
    textConent.classList = "input"
    textConent.name = "content"
    textConent.id = "content"
    textConent.cols = "30"
    textConent.rows = "10"
    textConent.placeholder = "Desenvolva o conteúdo da postagem aqui"
    textConent.value = content
    modalEdit.append(textConent)

    let modalButtons = document.createElement("div")
    modalButtons.classList = "flex justify-end modal-edit-buttons"
    modal.append(modalButtons)

    let cancel = document.createElement("button")
    cancel.classList = "btn btn-big btn-grey"
    cancel.innerText = "Cancelar"
    modalButtons.append(cancel)

    cancel.addEventListener("click", () => {
        event.target.parentElement.parentElement.parentElement.remove()
    })

    let save = document.createElement("button")
    save.classList = "btn btn-big btn-primary"
    save.innerText = "Salvar alterações"
    modalButtons.append(save)

    save.addEventListener("click", async () => {
        const body = {}
        body.title = inputTitle.value
        body.content = textConent.value

        event.target.parentElement.parentElement.parentElement.remove()
        await editPost(body, id)
        const posts = await loadPosts()
        await getUser().then(e => {
            renderPosts(posts, e.username)
        })
    })
}

function renderModalDeletePost (element) {
    let {id} = element
    let body = document.querySelector("body")

    let container = document.createElement("div")
    container.classList = "modal-container delete-post"
    body.insertAdjacentElement("afterbegin", container)

    let modal = document.createElement("div")
    modal.classList = "modal"
    container.append(modal)

    let modalHeader = document.createElement("div")
    modalHeader.classList = "flex items-center justify-between modal-header"
    modal.append(modalHeader)

    let pEdit = document.createElement("p")
    pEdit.classList = "post-title"
    pEdit.innerText = "Confirmação de exclusão"
    modalHeader.append(pEdit)

    let close = document.createElement("button")
    close.classList = "modal-close"
    close.innerText = "X"
    modalHeader.append(close)

    close.addEventListener("click", () => {
        event.target.parentElement.parentElement.parentElement.remove()
    })

    let post = document.createElement("div")
    post.classList = "flex flex-col modal-post"
    modal.append(post)

    let h2Title = document.createElement("h2")
    h2Title.classList = "post-title"
    h2Title.innerText = "Tem certeza que deseja excluir este post?"
    post.append(h2Title)

    let pContent = document.createElement("p")
    pContent.classList = "post-text"
    pContent.innerText = "Esta ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir."
    post.append(pContent)

    let modalButtons = document.createElement("div")
    modalButtons.classList = "flex modal-delete-buttons"
    modal.append(modalButtons)

    let cancel = document.createElement("button")
    cancel.classList = "btn btn-big btn-grey"
    cancel.innerText = "Cancelar"
    modalButtons.append(cancel)

    cancel.addEventListener("click", () => {
        event.target.parentElement.parentElement.parentElement.remove()
    })

    let removePost = document.createElement("button")
    removePost.classList = "btn btn-big btn-alert"
    removePost.innerText = "Sim, excluir este post"
    modalButtons.append(removePost)

    removePost.addEventListener("click", async () => {
        event.target.parentElement.parentElement.parentElement.remove()
        await deletePost(id)
        const posts = await loadPosts()
        renderPosts(posts)
        await getUser().then(e => {
            renderPosts(posts, e.username)
        })
    })
}

function setUpDate () {
    let date = new Date()
        let month = date.toLocaleString("default", {month: "long"})
        let Month = month.charAt(0).toUpperCase() + month.slice(1)
        let fullDate = `${Month} de ${date.getFullYear()}`
        return fullDate
}