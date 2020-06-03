import { ProductType } from "../../modelsTypes"

export const INIT = "INIT"


export type MenuType = {
    path: string
    name: string
    component:any
}

export type ProductState = {
    products: Array<ProductType>
}

export type InitActionType = {
    type: typeof INIT
    products: Array<ProductType>
}


export type ProductsActionType = InitActionType