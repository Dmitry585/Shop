import { IAuthState, AuthActionType,SIGN_IN, SIGN_OUT, REGISTER, LOAD_MENU } from "./types";
import Home from "../../views/home-f/Home";

const initialState: IAuthState = {
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    menu: []
}

export function authReducer(state = initialState, action: AuthActionType): IAuthState {
    switch (action.type) {
        case SIGN_IN: {
            return {
                token: action.token,
                role: action.role,
                menu: state.menu
            }
        }
        case REGISTER: {
            return {
                token: action.token,
                role: action.role,
                menu: state.menu
            }
        }
        case SIGN_OUT: {
            return {
                token: null,
                role: null,
                menu: state.menu
            }
        }
        case LOAD_MENU: {
            return {
                menu: action.menu,
                token: state.token,
                role: state.role
            }
        }
        default: {
            return state
        }
    }
}