import { browser } from '$app/env';

const _userKey = 'autogradeUser'
const parseJWT = (jwt) => {
    const payload = JSON.parse(atob(jwt.split('.')[1]));
    return payload;
}

export const UserStorage = {
    set(val) {
        if(!browser) { return }
        localStorage.setItem(_userKey, JSON.stringify(val));
    },
    setToken(accessToken = '', refreshToken = '') {
        const user = this.get()
        user.accessToken = accessToken
        user.refreshToken = refreshToken
        this.set(user)
    },
    get() {
        if(!browser) { return null }
        const user = localStorage.getItem(_userKey);
        return JSON.parse(user)
    },
    del() {
        if(!browser) { return }
        localStorage.removeItem(_userKey);
    },  
}