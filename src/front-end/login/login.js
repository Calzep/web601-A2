//SECTION - Functions


const login = (event) => {
    action.value = 'login'
}

const signup = (event) => {
    action.value = 'signup'
}

const authenticate = async (event) => {
    event.preventDefault()

    //Retrieve data from form inputs
    let formData = new FormData(loginForm)

    //Prepare API call options
    let requestOptions = {
        method: 'POST',
        body: formData
    }

    let login = false
    var params = new URLSearchParams()

    if(action.value === 'signup') {
        let response = await fetch(apiUrl + config.signupEndPoint, requestOptions)
        
        const data = await response.json()
        if (response.ok){
            console.log('Registration successful')
            console.log(data)
            login = true
            params.append("notif", "accountCreate")
            
        } else {
            console.log(`Registration failed: ${data.message}`)
        }
    }

    if(action.value === 'login' || login === true) {
        let response = await fetch(apiUrl + config.loginEndPoint, requestOptions)

        const data = await response.json()
        if (response.ok){
            console.log('Login successful')
            console.log(data)
            window.location.href = "../landing/landing.html?" + params.toString()
        } else {
            console.log(`Login failed: ${data.message}`)
        }
    }
}

//SECTION - Variables
import config from '../config/config.js'

const apiUrl = config.server + config.api + config.authRoute

const loginBtn = document.getElementById('loginBtn')
const createAccountBtn = document.getElementById('createBtn')
const loginForm = document.getElementById('loginForm')
const action = document.getElementById('action')

//SECTION - Event Listeners

loginBtn.addEventListener('click', login)
createAccountBtn.addEventListener('click', signup)
loginForm.addEventListener('submit', authenticate)