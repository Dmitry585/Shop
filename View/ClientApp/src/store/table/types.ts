import { TableType } from "../../modelsTypes"

export const GET_TABLE = "GET_TABLE"
export const DELETE_TABLE = "DELETE_TABLE"
export const EDIT_TABLE = "EDIT_TABLE"
export const ADD_TABLE = "ADD_TABLE"


export type TableState = {
    tables: Array<TableType>
}

export type GetTableAction = {
    type: typeof GET_TABLE
    tables: Array<TableType>
}

export type AddTableAction = {
    type: typeof ADD_TABLE
    table: TableType
}

export type EditTableAction = {
    type: typeof EDIT_TABLE
    table: TableType
}

export type DeleteTableAction= {
    type: typeof DELETE_TABLE
    id: number
}



export type TableActionType = GetTableAction | AddTableAction | EditTableAction | DeleteTableAction