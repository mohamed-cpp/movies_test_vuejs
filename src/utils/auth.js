import Cookies from 'js-cookie';

const TokenKey = 'isLogged';
const Token = 'token';
const User = 'user';

export function isLogged() {
    return Cookies.get(Token);
}

export function notHasPermissions() {
    return Cookies.get(TokenKey) === '2';
}

export function setLogged(isLogged) {
    return Cookies.set(TokenKey, isLogged);
}

export function removeToken() {
    Cookies.remove(Token);
    return Cookies.remove(TokenKey);
}

export function setToken(token) {
    return Cookies.set(Token, token);
}

export function getToken() {
    return Cookies.get(Token);
}

export function deleteToken() {
    return Cookies.remove(Token);
}

export function Auth(user) {
    return Cookies.set(User, user);
}

export function getAuth() {
    return Cookies.get(User);
}

export function removeAuth() {
    return Cookies.remove(User);
}