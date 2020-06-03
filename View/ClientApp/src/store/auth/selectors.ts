import { ApplicationState } from "../../store/index";

export const getToken = (state: ApplicationState) => {
    return state.auth.token
}

export const isAuth = (state: ApplicationState) => {
    return state.auth.token != null
}

export const role = (state: ApplicationState) => {
    return state.auth.role
}


export const menu = (state: ApplicationState) => {
    return state.auth.menu
}