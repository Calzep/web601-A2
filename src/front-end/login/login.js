//SECTION - Functions


const login = async (event) => {
    event.preventDefault

    //Retrieve data from form inputs
    let formData = new FormData(loginForm)

    //Prepare API call options
    let requestOptions = {
        method: 'POST',
        body: formData
    }

    //Attempt to call login api
    await fetch(apiUrl + config.loginEndPoint, requestOptions)
        .then(res => {
            if(!res.ok) {
                throw new Error('Network response was not OK')
            }
            return res.text()
        })
        .then(

        )
        .catch (
            
        )
}

const signup = async (event) => {
    event.preventDefault

    //Retrieve data from form inputs
    let formData = new FormData(loginForm)

    //Prepare API call options
    let requestOptions = {
        method: 'POST',
        body: formData
    }

    //Attempt to call login api
    await fetch(apiUrl + config.signupEndPoint, requestOptions)
        .then(res => {
            if(!res.ok) {
                throw new Error('Network response was not OK')
            }
            return res.text()
        })
        .then(

        )
        .catch (
            
        )
}

//SECTION - Variables
import config from '../config/config.js'

const apiUrl = config.server + config.api + config.authenticationRoute

const loginBtn = document.getElementById('loginBtn')
const createAccountBtn = document.getElementById('createAccountBtn')
const loginForm = document.getElementById('loginForm')

//SECTION - Event Listeners

loginBtn.addEventListener('click', login)
createAccountBtn.addEventListener('click', signup)