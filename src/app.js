import {createModal, isValid, sidebarColor} from "./utils";
import {Question} from "./question";
import {authWithEmailAndPassword, getAuthForm} from "./auth";
import './style.css'

const form = document.getElementById('form')
const modalButton = document.getElementById('modal-btn')
const input = form.querySelector('#questionInput')
const button = form.querySelector('#questionSubmit')

window.addEventListener('load', Question.renderList)
form.addEventListener('submit', submitHandler)
modalButton.addEventListener('click', openModal)
input.addEventListener('input', () => {
    button.disabled = !isValid(input.value)
    sidebarColor(!isValid(input.value))
})

function submitHandler(event) {
    event.preventDefault()
    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }
        button.disabled = true
        sidebarColor(button.disabled)
        //async req to serv
        Question.create(question)
            .then(() => {
                input.value = ''
                input.className = ''
                setTimeout(() => {
                    button.disabled = false
                    sidebarColor(button.disabled)
                }, 3000)
            })


    }
}

function openModal(event) {
    createModal('Authorization', getAuthForm())
    document.getElementById('auth-form')
        .addEventListener('submit', authFormHandler, {once: true})
}

function authFormHandler(event) {
    event.preventDefault()
    const button = event.target.querySelector('button ')
    const email = event.target.querySelector('#email').value
    const password = event.target.querySelector('#password').value

    button.disabled = true
    authWithEmailAndPassword(email, password)
        .then(Question.fetch)
        .then(renderModalAfterAuth)
        .then(() => button.disabled = false)
}

function renderModalAfterAuth(content) {
    typeof content === 'string'
        ? createModal('Error', content)
        : createModal('Questions list: ', Question.questionsToHTML(content))
}
