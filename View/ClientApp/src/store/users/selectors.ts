import { ApplicationState } from "../../store/index";

export const users = (state: ApplicationState) => {
    return state.user.users
}
