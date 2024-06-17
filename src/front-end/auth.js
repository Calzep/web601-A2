const logout = async () => {
    let refreshToken = localStorage.getItem('refreshToken')

    let requestOptions = {
        method: 'DELETE',
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('refreshToken')
        }
    }
    let response = await fetch(apiUrl + config.logoutEndPoint, requestOptions) // /${refreshToken}
    
    const data = await response.json()
    if(response.ok) {
        //If successful, returns a list of notes sent by the back end
        console.log(data)
    } else {
        //If unsuccessful, displays an error notification
        console.error("Error deleting refresh token:", data.message)
        console.warn("Token may already be invalid or server is unreachable, logging out...")
    }
    localStorage.clear()
    window.location.href = "../login/login.html"
}

import config from './config/config.js'

const apiUrl = config.server + config.api + config.authRoute

const logoutBtn = document.getElementById('logoutBtn')

logoutBtn.addEventListener("click", logout)

