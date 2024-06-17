//SECTION - Functions

//If login button is pressed, set hidden action input to login
const login = (event) => {
    action.value = 'login'
}

//If create now account button is pressed, set hidden action input to signup
const signup = (event) => {
    action.value = 'signup'
}

//Form submission
const authenticate = async (event) => {
    event.preventDefault()

    //Retrieve data from form inputs
    let formData = new FormData(loginForm)

    //Prepare API call options
    let requestOptions = {
        method: 'POST',
        body: formData
    }

    //variable to determine if login should be ran after signup
    let login = false
    var params = new URLSearchParams()

    //Check if the signup button was pressed
    if(action.value === 'signup') {
        //Attempt to call POST api
        let response = await fetch(apiUrl + config.signupEndPoint, requestOptions)
        
        const data = await response.json()
        if (response.ok){
            //If successful, set login to true and add the createAccount notif to url search params to trigger a notification on the landing page
            console.log('Registration successful')
            login = true
            params.append("notif", "accountCreate")
            
        } else {
            //If unsuccessful, display error message
            console.log(`Registration failed: ${data.message}`)

            //Display toast notification
            toastAlert.classList.add('text-bg-danger')
            toastText.innerHTML = `<strong>Registration failed!</strong> ${data.message}`
            const toast = new bootstrap.Toast(toastAlert)
            toast.show()
        }
    }

    //If login button pressed, or after successful registration
    if(action.value === 'login' || login === true) {
        //Attempt to call POST api
        let response = await fetch(apiUrl + config.loginEndPoint, requestOptions)

        const data = await response.json()
        if (response.ok){
            //if successful store returned tokens in local storage and redirect to landing page
            localStorage.setItem("accessToken", data.accessToken)
            localStorage.setItem("refreshToken", data.refreshToken)
            window.location.href = "../landing/landing.html?" + params.toString()
        } else {
            //If unsuccessful, display error message
            console.log(`Login failed: ${data.message}`)

            //Display toast notification
            toastAlert.classList.add('text-bg-danger')
            toastText.innerHTML = `<strong>Login failed!</strong> ${data.message}`
            const toast = new bootstrap.Toast(toastAlert)
            toast.show()
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
const toastAlert = document.getElementById('toastAlert')
const toastText = document.getElementById('toastText')

//SECTION - Event Listeners

loginBtn.addEventListener('click', login)
createAccountBtn.addEventListener('click', signup)
loginForm.addEventListener('submit', authenticate)