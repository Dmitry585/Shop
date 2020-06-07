import { ProductState, INIT, ProductsActionType, EDIT_PRODUCT, DELETE_PRODUCT, ADD_PRODUCT } from "./types"
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
        case EDIT_PRODUCT: {
            let products = state.products.map((item) => {
                if (item.productId == action.product.productId) {
                    item = action.product
                }
                return item
            })
            return {
                products:products
            }
        }
        case DELETE_PRODUCT: {
            let products = state.products.filter((item) => {
                if (item.productId == action.id) {
                    return false
                }
                return true
            })
            return {
                products: products
            }
        }
        case ADD_PRODUCT: {
            let products = [...state.products, action.product]
            return {
                products: products
            }
        }
        default: {
            return state
        }
    }
}