import {isValid, sidebarColor} from "./utils";
import './style.css'
import {Question} from "./question";

const form = document.getElementById('form')
const input = form.querySelector('#questionInput')
const button = form.querySelector('#questionSubmit')

form.addEventListener('submit', submitHandler)
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
