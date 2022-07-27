import {isValid} from "./utils";
import './style.css'

const form = document.getElementById('form')
const input = form.querySelector('#questionInput')
const button = form.querySelector('#questionSubmit')
const sidebar = document.getElementById('sidebar')

form.addEventListener('submit', submitHandler)

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
        console.log('Q', question)
        input.value = ''
        input.className = ''
        setTimeout(() => {
            button.disabled = false
            sidebarColor(button.disabled)
        }, 3000)
    }
}
