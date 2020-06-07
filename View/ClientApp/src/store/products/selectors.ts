import { ApplicationState } from "../../store/index";
import { IDictionary } from "../productType/selectors";

export const products = (state: ApplicationState) => {
    return state.products.products
}

export const filteredProducts = (state: ApplicationState) => {
    return state.products.products.sort((a, b) => a.productId - b.productId)
}

export const productForCombobox = (state: ApplicationState) => {
    let items: IDictionary<string> = {};
    for (var item of state.products.products ){
        items[item.productId] = item.name
    }
    return items
}
