import {
    AUTH_SET_USER,
    AUTH_LOGOUT
} from "./constants";

export const setUser = (data) => ({
    type: AUTH_SET_USER,
    payload: data,
});

export const setLogout = () => ({
    type: AUTH_LOGOUT,
});
