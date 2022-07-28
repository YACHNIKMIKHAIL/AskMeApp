import {createModal, isValid, sidebarColor} from "./utils";
import {Question} from "./question";
import {getAuthForm} from "./auth";
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
}
