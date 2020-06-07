import { TableState, GET_TABLE, EDIT_TABLE, DELETE_TABLE, ADD_TABLE, TableActionType } from "./types"
import { TableType } from "../../modelsTypes"

const initialState: TableState = {
    tables: Array<TableType>()
}

export function tableReducer(state = initialState, action: TableActionType): TableState {
    switch (action.type) {
        case GET_TABLE: {
            return {
                tables: action.tables,          
            }
        }
        case EDIT_TABLE: {
            let tables = state.tables.map((item) => {
                if (item.tableId == action.table.tableId) {
                    item = action.table
                }
                return item
            })
            return {
                tables:tables
            }
        }
        case DELETE_TABLE: {
            let tables = state.tables.filter((item) => {
                if (item.tableId == action.id) {
                    return false
                }
                return true
            })
            return {
                tables: tables
            }
        }
        case ADD_TABLE: {
            let tables = [...state.tables, action.table]
            return {
                tables: tables
            }
        }
        default: {
            return state
        }
    }
}