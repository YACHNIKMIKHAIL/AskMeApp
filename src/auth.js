export function getAuthForm() {
    return `
    <form class="mui-form" id="auth-form">
                <div class="mui-textfield mui-textfield--float-label">
                    <input type="email" id="email" required>
                    <label for="email">Email</label>
                </div>
                <div class="mui-textfield mui-textfield--float-label">
                    <input type="password" id="password" required>
                    <label for="password">Password</label>
                </div>
                <button type="submit" class="mui-btn mui-btn--raised mui-btn--accent"
                >SingIn
                </button>
     </form>
    `
}

export function authWithEmailAndPassword(email, password) {
    const apiKey = 'AIzaSyAYxgKQN0FsOAbSVoVwXqvorGKsLx2aV0E'
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({email, password, returnSecureToken: true}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => data.idToken)
}
