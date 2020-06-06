import { SignInActionType, SignOutActionType, SIGN_IN, SIGN_OUT, REGISTER, RegisterActionType, LoadMenuActionType, MenuType, LOAD_MENU } from "./types";
import auth_api from "../../api/auth";

import { AppThunkAction, ApplicationState } from "../index";
import Rezerved from "../../views/rezerved-f/Rezerved";
import Home from "../../views/home-f/Home";
import CRUD from "../../views/CRUD/CRUD";
import RezervedList from "../../views/rezerved-f/RezervedList";


const signInAction = (token: string, role: string): SignInActionType => {
    return {
        type: SIGN_IN,
        token: token,
        role: role
    }
}

const registerAction = (token: string, role: string): RegisterActionType => {
    return {
        type: REGISTER,
        token: token,
        role: role
    }
}

const signOutAction = (): SignOutActionType => {
    return {
        type: SIGN_OUT
    }
}

const loadMenuAction = (menu: Array<MenuType>): LoadMenuActionType => {
    return {
        type: LOAD_MENU,
        menu: menu
    }
}


export const signIn = (login: string, password: string): AppThunkAction<SignInActionType | LoadMenuActionType> => {
    return async (dispatch, getState) => {
        var data: FormData = new FormData()
        data.set("login", login)
        data.set("password", password)
        var result = await auth_api.login(data)
        if (result) {
            localStorage.setItem("token", result.access_token)
            localStorage.setItem("role", result.role)
            dispatch(signInAction(result.access_token, result.role))
            dispatch(loadMenuAction(getMenu(getState())))
        }
    }
}

export const register = (login: string, password: string): AppThunkAction<RegisterActionType | LoadMenuActionType> => {
    return async (dispatch, getState) => {
        var data: FormData = new FormData()
        data.set("login", login)
        data.set("password", password)
        var result = await auth_api.register(data)
        if (result) {
            localStorage.setItem("token", result.access_token)
            localStorage.setItem("role", result.role)
            dispatch(registerAction(result.access_token, result.role))
            dispatch(loadMenuAction(getMenu(getState())))
        }
    }
}

export const signOut = (): AppThunkAction<SignOutActionType | LoadMenuActionType> => {
    return async (dispatch, getState) => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        dispatch(signOutAction())
        dispatch(loadMenuAction(getMenu(getState())))
    }
}


export const loadMenu = (): AppThunkAction<LoadMenuActionType> => {
    return async (dispatch, getState) => {
        var menu = getMenu(getState())
        dispatch(loadMenuAction(menu))
    }
}

function getMenu(state: ApplicationState) {
    var dumpRoute: Array<MenuType> = [{
        path: "/magazine",
        component: Home,
        name: "Магазин"
    }]

    switch (state.auth.role) {
        case "Администратор": {
            dumpRoute = dumpRoute.concat([
                {
                    path: "/crud",
                    component: CRUD,
                    name: "Управление данными"
                },
                {
                    path: "/rezervedList",
                    component: RezervedList,
                    name: "Заказы"
                }
            ])
            break;
        }
        case "Пользователь": {

            dumpRoute = dumpRoute.concat([{
                path: "/rezerved",
                component: Rezerved,
                name: "Резервирование"
            }])
            break;
        }
        default: {
        }
    }
    return dumpRoute

}