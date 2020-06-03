export const SIGN_IN = "SIGN_IN"
export const REGISTER = "REGISTER"
export const SIGN_OUT = "SIGN_OUT"
export const LOAD_MENU = "LOAD_MENU"

export type MenuType = {
    path: string
    name: string
    component:any
}

export type IAuthState = {
    token: string | null
    role: string | null
    menu: Array<MenuType> 
}

export type SignInActionType = {
    type: typeof SIGN_IN
    token: string
    role:string
}

export type RegisterActionType = {
    type: typeof REGISTER
    token: string
    role: string
}

export type SignOutActionType  = {
    type: typeof SIGN_OUT
}

export type LoadMenuActionType = {
    type: typeof LOAD_MENU
    menu: Array<MenuType>
}



export type AuthActionType = SignInActionType | SignOutActionType | RegisterActionType | LoadMenuActionType