import tables_api from "../../api/table";
import { AppThunkAction } from "../index";

import { SetSnackbarAction, SET_SNACKBAR, CloseSnackbarAction, CLOSE_SNACKBAR } from "./types";


const setSnackbarAction = (text: string, severite?:string): SetSnackbarAction => {
    return {
        type: SET_SNACKBAR,
        text: text,
        severite: severite
    }
}

const closeSnackbarAction = (): CloseSnackbarAction => {
    return {
        type: CLOSE_SNACKBAR,
    }
}


export const setSnackbar = (text: string, severite?: string): AppThunkAction<SetSnackbarAction> => {
    return async (dispatch) => {
        dispatch(setSnackbarAction(text, severite))
    }
}

export const closeSnackbar = (): AppThunkAction<CloseSnackbarAction> => {
    return async (dispatch) => {
        dispatch(closeSnackbarAction())
    }
}
