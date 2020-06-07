

export const SET_SNACKBAR = "SET_SNACKBAR"
export const CLOSE_SNACKBAR = "CLOSE_SNACKBAR"

export type SnackBarType = {
    text: string,
    severite: string,
    time: number,
    open:boolean
}

export type SnackBarState = {
    snackbar: SnackBarType
}

export type SetSnackbarAction= {
    type: typeof SET_SNACKBAR
    text: string
    severite?: string
}

export type CloseSnackbarAction = {
    type: typeof CLOSE_SNACKBAR
}






export type SnackBarActionType = SetSnackbarAction | CloseSnackbarAction