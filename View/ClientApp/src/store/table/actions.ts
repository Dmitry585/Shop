import tables_api from "../../api/table";
import { AppThunkAction } from "../index";
import { GET_TABLE, ADD_TABLE, EDIT_TABLE, DELETE_TABLE, GetTableAction, AddTableAction, EditTableAction, DeleteTableAction } from "./types";
import { TableType } from "../../modelsTypes";

const getTableACtion = (tables: Array<TableType>): GetTableAction => {
    return {
        type: GET_TABLE,
        tables: tables
    }
}

const addTableAction = (table: TableType): AddTableAction => {
    return {
        type: ADD_TABLE,
        table: table
    }
}

const editTableAction = (table: TableType): EditTableAction => {
    return {
        type: EDIT_TABLE,
        table: table
    }
}

const deleteTableAction = (id: number): DeleteTableAction => {
    return {
        type: DELETE_TABLE,
        id: id
    }
}


export const getTable = (): AppThunkAction<GetTableAction> => {
    return async (dispatch) => {
        let tables = await tables_api.getItems()
        if (tables)
            dispatch(getTableACtion(tables))
    }
}

export const editTable = (table: TableType): AppThunkAction<EditTableAction> => {
    return async (dispatch) => {
        var data: FormData = new FormData()
        data.set("maxPerson", table.maxPerson.toString())
        let produc = await tables_api.editItem(table.tableId ,data)
        if (produc)
            dispatch(editTableAction(produc))
    }
}

export const deleteTable = (id: number): AppThunkAction<DeleteTableAction> => {
    return async (dispatch) => {
        let result = await tables_api.deleteItem(id)
        if (result)
            dispatch(deleteTableAction(id))
    }
}

export const addTable = (table: TableType): AppThunkAction<AddTableAction> => {
    return async (dispatch) => {
        var data: FormData = new FormData()
        data.set("maxPerson", table.maxPerson.toString())
        let result = await tables_api.addItem(data)
        if (result)
            dispatch(addTableAction(result))
    }
}