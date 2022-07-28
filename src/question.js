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

    static fetch(token) {
        if (!token) {
            return Promise.resolve(`<p class="error">You haven't token, sorry bro</p>`)
        }
        return fetch(`https://questions-app-e3de4-default-rtdb.europe-west1.firebasedatabase.app/question.json?auth=${token}`)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    return `<p class="error">${res.error}</p>`
                }
                return res
                    ? Object.keys(res).map(key => ({
                        ...res[key],
                        id: key
                    }))
                    : []
            })
    }

    static renderList() {
        const questions = getFromLC()
        const html = questions.length
            ? questions.map(questionToCars).join('')
            : `<div class="mui--text-headline">No actual questions</div>`

        const list = document.getElementById('list')
        list.innerHTML = html
    }

    static questionsToHTML(questions) {
        return questions.length
            ? `<ol>${questions.map(q => `<li>${q.text}</li>`).join('')}</ol>`
            : `<p>You haven't any questions right now</p>`
    }
}

function addToLC(question) {
    const all = getFromLC()
    all.unshift(question)
    localStorage.setItem('question', JSON.stringify(all))
}

function getFromLC() {
    return JSON.parse(localStorage.getItem('question') || '[]')
}

function questionToCars(question) {
    console.log('questionToCars', question)
    return `
            < div class = "mui--text-black-54" >
                ${new Date(question.date).toLocaleDateString()}
                ${new Date(question.date).toLocaleTimeString()}
                < /div>
        <div>${question.text}</div>
        <br>
            `
}
