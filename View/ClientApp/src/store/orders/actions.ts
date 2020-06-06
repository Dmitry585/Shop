import { AddItemInOrderAction, ADD_ITEM_IN_ORDER, RemoveItemFromOrderAction, REMOVE_ITEM_FROM_ORDER, AddCountAction, ADD_COUNT, EditItemOrderAction, EDIT_ORDER_ITEM, EditDateAction, EDIT_DATE, EditTableAction, EDIT_TABLE, EditNameAction, EDIT_NAME, SendRezervationAction, SEND_REZERVATION, GetRezervationsAction, GET_REZERVATIONS } from "./types"
import { OrderItemType, ProductType, RezervationType } from "../../modelsTypes"
import { AppThunkAction } from "../index"
import rezervation_api from "../../api/rezervation"
import products_api from "../../api/product";
import { InitProductAction } from "../products/types"
import { initAction } from "../products/actions";


const addItemInOrderAction = (item: ProductType): AddItemInOrderAction => {
    return {
        type: ADD_ITEM_IN_ORDER,
        item: item,
    }
}

const getRezervationType = (item: Array<RezervationType>): GetRezervationsAction => {
    return {
        type: GET_REZERVATIONS,
        item: item,
    }
}

const editDateAction = (date: Date): EditDateAction => {
    return {
        type: EDIT_DATE,
        date: date,
    }
}

const sendRezervationAction = (): SendRezervationAction => {
    return {
        type: SEND_REZERVATION,
    }
}

const editNameAction = (name: string): EditNameAction => {
    return {
        type: EDIT_NAME,
        name: name,
    }
}


const editTableAction = (id: number): EditTableAction => {
    return {
        type: EDIT_TABLE,
        id: id,
    }
}

const editItemOrderAction = (item: OrderItemType): EditItemOrderAction => {
    return {
        type: EDIT_ORDER_ITEM,
        item: item,
    }
}

const addcountAction = (id: number): AddCountAction => {
    return {
        type: ADD_COUNT,
        id:id
    }
}

const removeItemFromOrderAction = (id: number): RemoveItemFromOrderAction => {
    return {
        type: REMOVE_ITEM_FROM_ORDER,
        id: id,
    }
}

export const addItemInOrder = (item: ProductType): AppThunkAction<AddItemInOrderAction | AddCountAction> => {
    return async(dispatch, getState): Promise<boolean> => {
        let state = getState()
        let it = state.order.currentRezervation.items.filter(x => x.product.productId == item.productId)
        if (it.length == 0) {
            dispatch(addItemInOrderAction(item))
        }
        else {
            if (it[0].count < item.count) {
                dispatch(addcountAction(item.productId))
            }
            else {
                return false
            }
        }
        return true
    }
}

export const removeItemFromOrder = (id: number): AppThunkAction<RemoveItemFromOrderAction> => {
    return async(dispatch) => {
        dispatch(removeItemFromOrderAction(id))
    }
}

export const getRezervation = (): AppThunkAction<GetRezervationsAction> => {
    return async (dispatch) => {
        var result = await rezervation_api.getItems();
        if(result)
            dispatch(getRezervationType(result))
    }
}

export const editItemOrder = (item: OrderItemType): AppThunkAction<EditItemOrderAction> => {
    return async (dispatch) => {
        dispatch(editItemOrderAction(item))
    }
}

export const editDate = (date: Date): AppThunkAction<EditDateAction> => {
    return async (dispatch) => {
        dispatch(editDateAction(date))
    }
}

export const editTable = (id: number): AppThunkAction<EditTableAction> => {
    return async (dispatch) => {
        dispatch(editTableAction(id))
    }
}

export const editName = (name: string): AppThunkAction<EditNameAction> => {
    return async (dispatch) => {
        dispatch(editNameAction(name))
    }
}

export const sendRezervation = (): AppThunkAction<SendRezervationAction | InitProductAction> => {
    return async (dispatch, getState) => {
        let state = getState()
        var result = await rezervation_api.addItem(state.order.currentRezervation);
        if (result) {
           await dispatch(sendRezervationAction())
        }

        return
    }
}