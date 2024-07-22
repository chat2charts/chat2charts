import Cookies from 'js-cookie'

const TokenKey = 'JSESSIONID'
const TokenKey1 = 'satoken'
const TokenKey2 = 'CHAT2DB.USER_ID'
const TokenKey3 = 'CHAT2DB'


export function getToken() {
  return Cookies.get(TokenKey)
}
export function getToken1() {
  return Cookies.get(TokenKey1)
}
export function getToken2() {
  return Cookies.get(TokenKey2)
}
export function getToken3() {
  return Cookies.get(TokenKey3)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function setToken1(TokenKey1,token) {
  return Cookies.set(TokenKey1, token)
}
export function setToken2(token) {
  return Cookies.set(TokenKey2, token)
}
export function setToken3(token) {
  return Cookies.set(TokenKey3, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function removeToken1() {
  return Cookies.remove(TokenKey1)
}
export function removeToken2() {
  return Cookies.remove(TokenKey2)
}
export function removeToken3() {
  return Cookies.remove(TokenKey3)
}