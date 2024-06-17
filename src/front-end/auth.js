//SECTION - Functions

//Logs the user out, clearing tokens
const logout = async () => {
    let refreshToken = localStorage.getItem('refreshToken')

    //Prepare options for api call
    let requestOptions = {
        method: 'DELETE',
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('refreshToken')
        }
    }

    //Attempt to call DELETE api to remove refresh token
    let response = await fetch(apiUrl + config.logoutEndPoint, requestOptions)
    
    const data = await response.json()
    if(!response.ok)  {
        //If unsuccessful, displays an error notification and logout
        console.error("Error deleting refresh token:", data.message)
        console.warn("Token may already be invalid or server is unreachable, logging out...")
    }
    //clear local storage and return to login page
    localStorage.clear()
    window.location.href = "../login/login.html"
}

//Refresh access token
const refreshAccessToken = async () => {
    
    //prepare options for api call
    let requestOptions = {
        method:'POST',
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
    }

    //Attempt to call POST api
    let response = await fetch(apiUrl + config.refreshEndPoint, requestOptions)

    const data = await response.json()

    if(response.ok){
        //if successful, return new access token
        return data.accessToken
    } else {
        //If unsuccessful, log error messages
        console.error("Error refreshing access token:", data.message)
        console.warn("User session may be invalid, log in again to refresh session")
    }
}

//SECTION - Variables
import config from './config/config.js'

const apiUrl = config.server + config.api + config.authRoute

const logoutBtn = document.getElementById('logoutBtn')

//SECTION - Event listeners
logoutBtn.addEventListener("click", logout)

export default refreshAccessToken