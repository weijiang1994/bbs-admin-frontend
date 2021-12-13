import Cookies from "js-cookie";


function getToken(tokenKey){
    return Cookies.get(tokenKey)
}


function setToken(tokenKey, token){
    Cookies.set(tokenKey, token)
}

function removeToken(tokenKey){
    Cookies.remove(tokenKey)
}


export {getToken, setToken, removeToken}