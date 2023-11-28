import axios from 'axios'

export function getInstance(token){
    const instance = axios.create({
        baseURL: 'http://192.168.43.204:8080',
        withCredentials:true,
        credentials:'include',
    });
    instance.defaults.headers.common['Authorization'] ='Bearer '+ token;
    return instance;
} 

export function getContactsHistory(token){
    const instance = getInstance(token);
    return instance.get('users/chat/contactsHistory')
}

export function getChat(token, userId){
    const instance = getInstance(token);
    return instance.get('users/chat/userMessages/'+userId)
}