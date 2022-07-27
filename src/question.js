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
            .then(res => console.log(res))
    }
}
