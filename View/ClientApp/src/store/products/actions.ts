import products_api from "../../api/product";
import { AppThunkAction } from "../index";
import { INIT, InitActionType } from "./types";
import { ProductType } from "../../modelsTypes";

const initAction = (products: Array<ProductType>): InitActionType => {
    return {
        type: INIT,
        products: products
    }
}


export const init = (): AppThunkAction<InitActionType> => {
    return async (dispatch) => {
        let products = await products_api.getItems()
        if (products)
            dispatch(initAction(products))
    }
}