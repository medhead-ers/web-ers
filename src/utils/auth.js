import axios from "axios";

const AUTH_CREDENTIALS_KEY = 'auth'

export function loginUser(username, password) {
  return new Promise( (resolve, reject) => {
    let credentials = {
      username : username,
      password : password
    };

    axios.get('/eds', {auth : credentials}).then(() => {
      axios.defaults.auth = credentials;
      setAuthCredentials(credentials);
      resolve();
    }).catch(() => {
      reject('Identifiants invalides');
    });
  })
}

export function logoutUser() {
  clearAuthCredentials()
}

export function setAuthCredentials(credentials) {
  sessionStorage.setItem(AUTH_CREDENTIALS_KEY, JSON.stringify(credentials))
}

export function getAuthCredentials() {
  return JSON.parse(sessionStorage.getItem(AUTH_CREDENTIALS_KEY))
}

export function clearAuthCredentials() {
  sessionStorage.removeItem(AUTH_CREDENTIALS_KEY)
}

export function isLoggedIn() {
  let authCredentials = getAuthCredentials();
  return !!authCredentials
}

export function getDigestUsername() {
  let username =  getAuthCredentials().username;
  return username.charAt(0).toUpperCase() + username.slice(1);
}
