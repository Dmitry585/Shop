
import { PersonType } from "../../modelsTypes"
import { UsersState, UserActionType, GET_USERS, EDIT_USER, DELETE_USER } from "./types"

const initialState: UsersState = {
    users: Array<PersonType>()
}

export function usersReducer(state = initialState, action: UserActionType): UsersState {
    switch (action.type) {
        case GET_USERS: {
            return {
                users: action.users,          
            }
        }
        case EDIT_USER: {
            let users = state.users.map((item) => {
                if (item.personId == action.user.personId) {
                    item.login = action.user.login
                    item.roleId = action.user.roleId
                }
                return item
            })
            return {
                users:users
            }
        }
        case DELETE_USER: {
            let users = state.users.filter((item) => {
                if (item.personId == action.id) {
                    return false
                }
                return true
            })
            console.log(users)
            return {
                users: users
            }
        }
        default: {
            return state
        }
    }
}