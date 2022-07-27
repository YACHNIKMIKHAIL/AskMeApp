export class Question {
    url = ' https://questions-app-e3de4-default-rtdb.europe-west1.firebasedatabase.app'

    static create(question) {
        return fetch(`https://questions-app-e3de4-default-rtdb.europe-west1.firebasedatabase.app/question.json`, {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                question.id = res.name
                return question
            })
            .then(addToLC)
            .then(Question.renderList)
    }

    static renderList() {
        const questions = getFromLC()
        const html = questions.length
            ? questions.map(questionToCars).join('')
            : `<div class="mui--text-headline">No actual questions</div>`

        const list = document.getElementById('list')
        list.innerHTML = html
    }
}

function addToLC(question) {
    const all = getFromLC()
    all.push(question)
    localStorage.setItem('question', JSON.stringify(all))
}

function getFromLC() {
    return JSON.parse(localStorage.getItem('question') || '[]')
}

function questionToCars(question) {
    return '123'
}
