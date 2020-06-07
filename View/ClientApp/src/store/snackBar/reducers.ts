import { SnackBarState, SnackBarActionType, SET_SNACKBAR, CLOSE_SNACKBAR } from "./types"


const initialState: SnackBarState = {
    snackbar: {
        open: false,
        severite: "success",
        text: "",
        time: 2000
    }
}

export function snackBarReducer(state = initialState, action: SnackBarActionType): SnackBarState {
    switch (action.type) {
        case SET_SNACKBAR: {
            return {
                snackbar: {
                    text: action.text,
                    open: true,
                    severite: action.severite == undefined ? state.snackbar.severite : action.severite,
                    time: 2000
                }
            }
        }
        case CLOSE_SNACKBAR: {
            return {
                snackbar: {
                    text: "",
                    open: false,
                    severite: "success",
                    time:2000
                }
            }
        }
        default: {
            return state
        }
    }
}