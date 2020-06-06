import { ApplicationState } from "../../store/index";


export const tables = (state: ApplicationState) => {
    return state.table.tables
}

export const tablesForCombobox = (state: ApplicationState) => {
    let items = [{ tableId:"0",maxPerson:0 }, ...state.table.tables]
    return items
}

