import users_api from "../../api/users";
import { AppThunkAction } from "../index";
import { PersonType } from "../../modelsTypes";
import { GET_USERS, DELETE_USER, EDIT_USER,GetUsersAction, EditUserAction, DeleteUserAction,  } from "./types";

const getUserAction = (users: Array<PersonType>): GetUsersAction => {
    return {
        type: GET_USERS,
        users: users
    }
}

const editUserAction = (user: PersonType): EditUserAction => {
    return {
        type: EDIT_USER,
        user:user     
    }
}


const deleteUserAction = (id: number): DeleteUserAction => {
    return {
        type: DELETE_USER,
        id: id
    }
}


export const getUsers = (): AppThunkAction<GetUsersAction> => {
    return async (dispatch) => {
        let users = await users_api.getItems()
        if (users)
            dispatch(getUserAction(users))
    }
}

export const editUser = (user: PersonType): AppThunkAction<EditUserAction> => {
    return async (dispatch) => {
        var data: FormData = new FormData()
        data.set("login", user.login)
        data.set("roleId", user.roleId.toString())
        data.set("personId", user.personId.toString())
        let users = await users_api.editItem(user.personId, data)
        if (users)
            dispatch(editUserAction(users))
    }
}

export const deleteUser = (id: number): AppThunkAction<DeleteUserAction> => {
    return async (dispatch) => {
        let result = await users_api.deleteItem(id)
        console.log(result)
        if (result)
            dispatch(deleteUserAction(id))
    }
}