import { ProductTypesState, GET_PRODUCTTYPES, ProductTypeActionType, EDIT_PRODUCTTYPES, DELETE_PRODUCTTYPE, ADD_PRODUCTTYPES } from "./types"
import { ProductTypeType, } from "../../modelsTypes"

const initialState: ProductTypesState = {
    productTypes: Array<ProductTypeType>()
}

export function productTypesReducer(state = initialState, action: ProductTypeActionType): ProductTypesState {
    switch (action.type) {
        case GET_PRODUCTTYPES: {
            return {
                productTypes: action.productTypes
            }
        }
        case EDIT_PRODUCTTYPES: {
            let productTypes = state.productTypes.map((item) => {
                if (item.productTypeId == action.productType.productTypeId) {
                    item = action.productType
                }
                return item
            })
            return {
                productTypes: productTypes
            }
        }
        case DELETE_PRODUCTTYPE: {
            let productTypes = state.productTypes.filter((item) => {
                if (item.productTypeId == action.id) {
                    return false
                }
                return true
            })
            return {
                productTypes: productTypes
            }
        }
        case ADD_PRODUCTTYPES: {
            let productTypes = [...state.productTypes, action.productType]
            return {
                productTypes: productTypes
            }
        }
        default: {
            return state
        }
    }
}