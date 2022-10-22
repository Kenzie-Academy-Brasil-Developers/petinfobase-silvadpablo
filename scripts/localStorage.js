export function getLocalStorage () {
    const user = JSON.parse(localStorage.getItem("petInfoUser")) || ""

    return user
}