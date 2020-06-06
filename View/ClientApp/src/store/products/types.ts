import { ProductType } from "../../modelsTypes"

export const INIT = "INIT"
export const DELETE_PRODUCT = "DELETE_PRODUCT"
export const EDIT_PRODUCT = "EDIT_PRODUCT"
export const ADD_PRODUCT = "ADD_PRODUCT"


export type MenuType = {
    path: string
    name: string
    component:any
}

export type ProductState = {
    products: Array<ProductType>
}

export type InitProductAction = {
    type: typeof INIT
    products: Array<ProductType>
}

export type AddProductAction = {
    type: typeof ADD_PRODUCT
    product: ProductType
}

export type EditProductAction = {
    type: typeof EDIT_PRODUCT
    product: ProductType
}

export type DeleteProductAction= {
    type: typeof DELETE_PRODUCT
    id: number
}



export type ProductsActionType = InitProductAction | AddProductAction | EditProductAction | DeleteProductAction