import { ProductState, INIT, ProductsActionType } from "./types"
import { ProductType } from "../../modelsTypes"

const initialState: ProductState = {
    products: Array<ProductType>()
}

export function productsReducer(state = initialState, action: ProductsActionType): ProductState {
    switch (action.type) {
        case INIT: {
            return {
                products: action.products,          
            }
        }
        default: {
            return state
        }
    }
}