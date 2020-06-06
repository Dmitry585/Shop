import { ApplicationState } from "../../store/index";

export interface IDictionary<TValue> {
    [id: number]: TValue
}

export const productTypesMenu = (state: ApplicationState) => {
    let items = [{ name: "Все", productTypeId: 0 }, ...state.productType.productTypes]
    return items
}

export const productTypes = (state: ApplicationState) => {
    return state.productType.productTypes
}

export const productTypesForCombobox = (state: ApplicationState) => {
    let items: IDictionary<string> = {};
    for (var item of state.productType.productTypes) {
        items[item.productTypeId] = item.name
    }
    return items
}

