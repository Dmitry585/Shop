import { RezervationType, OrderItemType, ProductType } from "../../modelsTypes"



export const ADD_ITEM_IN_ORDER = "ADD_ITEM_IN_ORDER"
export const GET_REZERVATIONS = "GET_REZERVATIONS"
export const ADD_COUNT = "ADD_COUNT"
export const REMOVE_ITEM_FROM_ORDER = "REMOVE_ITEM_FROM_ORDER"
export const EDIT_ORDER_ITEM = "EDIT_ORDER_ITEM"
export const EDIT_DATE = "EDIT_DATE"
export const EDIT_TABLE = "EDIT_ORDER_TABLE"
export const EDIT_NAME = "EDIT_ORDER_NAME"
export const SEND_REZERVATION = "SEND_REZERVATION"


export type OrderState = {
    currentRezervation: RezervationType,
    rezervations: Array<RezervationType>
}

export type AddItemInOrderAction = {
    type: typeof ADD_ITEM_IN_ORDER
    item: ProductType
}

export type GetRezervationsAction = {
    type: typeof GET_REZERVATIONS
    item: Array<RezervationType>
}

export type AddCountAction = {
    type: typeof ADD_COUNT,
    id: number
}

export type EditItemOrderAction = {
    type: typeof EDIT_ORDER_ITEM,
    item: OrderItemType
}

export type RemoveItemFromOrderAction = {
    type: typeof REMOVE_ITEM_FROM_ORDER
    id: number
}

export type EditDateAction = {
    type: typeof EDIT_DATE
    date: Date
}

export type EditTableAction = {
    type: typeof EDIT_TABLE
    id: number
}

export type EditNameAction = {
    type: typeof EDIT_NAME
    name: string
}

export type SendRezervationAction = {
    type: typeof SEND_REZERVATION
}



export type OrderActionType =   AddItemInOrderAction | RemoveItemFromOrderAction | AddCountAction |
                                EditItemOrderAction | EditDateAction | EditTableAction | EditNameAction |
                                SendRezervationAction | GetRezervationsAction