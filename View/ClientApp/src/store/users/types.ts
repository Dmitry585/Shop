import {  PersonType } from "../../modelsTypes"

export const GET_USERS = "GET_USERS"
export const DELETE_USER = "DELETE_USER"
export const EDIT_USER = "EDIT_USER"


export type UsersState = {
    users: Array<PersonType>
}

export type GetUsersAction = {
    type: typeof GET_USERS
    users: Array<PersonType>
}

export type DeleteUserAction = {
    type: typeof DELETE_USER
    id: number
}

export type EditUserAction = {
    type: typeof EDIT_USER
    user: PersonType
}



export type UserActionType = GetUsersAction | EditUserAction | DeleteUserAction