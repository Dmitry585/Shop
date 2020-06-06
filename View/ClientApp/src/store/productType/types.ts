import { ProductTypeType } from "../../modelsTypes"

export const GET_PRODUCTTYPES = "GET_PRODUCTTYPES"
export const DELETE_PRODUCTTYPE = "DELETE_PRODUCTTYPE"
export const EDIT_PRODUCTTYPES = "EDIT_PRODUCTTYPES"
export const ADD_PRODUCTTYPES = "ADD_PRODUCTTYPES"


export type ProductTypesState = {
    productTypes: Array<ProductTypeType>
}

export type GetProductTypeAction = {
    type: typeof GET_PRODUCTTYPES
    productTypes: Array<ProductTypeType>
}

export type AddProductTypeAction = {
    type: typeof ADD_PRODUCTTYPES
    productType: ProductTypeType
}

export type EditProductTypeAction = {
    type: typeof EDIT_PRODUCTTYPES
    productType: ProductTypeType
}

export type DeleteProductTypeAction= {
    type: typeof DELETE_PRODUCTTYPE
    id: number
}



export type ProductTypeActionType = GetProductTypeAction | AddProductTypeAction | EditProductTypeAction | DeleteProductTypeAction