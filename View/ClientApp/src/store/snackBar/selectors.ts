import { ApplicationState } from "../../store/index";

export const snackBar = (state: ApplicationState) => {
    return state.snackBar.snackbar
}

