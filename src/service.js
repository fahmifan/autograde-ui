import { writable } from 'svelte/store';
import { browser } from '$app/env';
import axios from "axios";
import { UserStorage } from "./storage";

export const ssr = false;

axios.interceptors.request.use(
    config => {
        const user = UserStorage.get();
        console.log(user)
        if (user && user.accessToken) {
            config.headers['Authorization'] = 'Bearer ' + user.accessToken
        }
        return config
    },
    error => {
        Promise.reject(error);
    },
)

axios.interceptors.response.use(
    (response) => response,
    (err) => {
        if(!err) {
            return
        }
        const originalRequest = err.config;
        if (err.response.status !== 401 || originalRequest._retry) {
            return Promise.reject(err)
        }

        originalRequest._retry = true;
        return axios.post('http://localhost:8080/api/v1/auth/refresh',
            {
                refreshToken: UserStorage.get().refreshToken,
            })
            .then(res => {
                if (res.status === 200) {
                    UserStorage.setToken(res.data.accessToken, res.data.refreshToken);
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + UserStorage.get().accessToken;
                    return axios(originalRequest);
                }
            })
            .catch(err => {
                Promise.reject(err)
            })
    },
)

export { axios }

const parseJWT = (jwt) => {
    const payload = JSON.parse(atob(jwt.split('.')[1]));
    return payload;
}

let _user = null
if (browser) {
    _user = UserStorage.get()
}

export const store = writable(_user ? _user : null);

store.subscribe((value) => {
    if (browser) {
        if (value) UserStorage.set(value)
        else UserStorage.del(); // for logout
    }
});

export const logout = () => store.set(null)

export async function login(email = '', password = '') {
    try {
        if (email === '' || password === '') {
            return
        }

        const resp = await axios.post('http://localhost:8080/api/v1/auth/login', {
            email, password,
        })
        const decoded = parseJWT(resp.data.accessToken)
        const user = {
            id: decoded.id,
            email: decoded.email,
            name: decoded.name,
            role: decoded.role,
            exp: decoded.exp,
            iat: decoded.iat,
            accessToken: resp.data.accessToken,
            refreshToken: resp.data.refreshToken,
        }
        store.set(user)
        if (browser) {
            window.location.replace('/dashboard')
        }
    } catch (err) {
        console.log(err)
        return Promise.reject(err)
    }
}
