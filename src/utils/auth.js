const AUTH_TOKEN_KEY = 'authToken'

export function loginUser(username, password) {
  return new Promise( (resolve, reject) => {
    if(username === 'admin' && password === 'admin') {
      let authToken = [...Array(30)].map(() => Math.random().toString(36)[2]).join('');
      setAuthToken(authToken);
      resolve();
    }
    else reject('Identifiants invalides');
  })
}

export function logoutUser() {
  clearAuthToken()
}

export function setAuthToken(token) {
  localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

export function clearAuthToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY)
}

export function isLoggedIn() {
  let authToken = getAuthToken()
  return !!authToken
}
