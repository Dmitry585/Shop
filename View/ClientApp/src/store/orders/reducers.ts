import { OrderState, OrderActionType, ADD_ITEM_IN_ORDER, REMOVE_ITEM_FROM_ORDER, ADD_COUNT, EDIT_ORDER_ITEM, EDIT_DATE, EDIT_TABLE, EDIT_NAME, SEND_REZERVATION, GET_REZERVATIONS } from "./types"
import { OrderItemType, RezervationType } from "../../modelsTypes"


const initialState: OrderState = {
    currentRezervation: {
        rezervationDate: new Date(),
        items: Array<OrderItemType>(),
        tableId: 0,
        personName:""
    },
    rezervations: Array<RezervationType>()
}

export function orderReducer(state = initialState, action: OrderActionType): OrderState {
    switch (action.type) {
        case ADD_ITEM_IN_ORDER: {
            let item = [...state.currentRezervation.items, { count: 1, id: Date.now(), product: action.item, productId: action.item.productId }]
            return {
                currentRezervation: {
                    ...state.currentRezervation,
                    items: item,
                },
                rezervations: state.rezervations
            }
        }
        case EDIT_DATE: {
            return {
                currentRezervation: {
                    ...state.currentRezervation,
                    rezervationDate: action.date
                },
                rezervations: state.rezervations
            }
        }
        case GET_REZERVATIONS: {
            return {
                currentRezervation: state.currentRezervation,
                rezervations: action.item
            }
        }
        case SEND_REZERVATION: {
            return {
                currentRezervation: {
                    rezervationDate: new Date(),
                    items: Array<OrderItemType>(),
                    tableId: 0,
                    personName: ""
                },
                rezervations: state.rezervations
            }
        }
        case EDIT_NAME: {
            return {
                currentRezervation: {
                    ...state.currentRezervation,
                    personName: action.name
                },
                rezervations: state.rezervations
            }
        }
        case EDIT_TABLE: {
            return {
                currentRezervation: {
                    ...state.currentRezervation,
                    tableId: action.id
                },
                rezervations: state.rezervations
            }
        }
        case EDIT_ORDER_ITEM: {
            let items = state.currentRezervation.items.map(item => {
                if (item.id == action.item.id) {
                    item.count = action.item.count
                    item.product = action.item.product
                }
                return item
            })
            return {
                currentRezervation: {
                    ...state.currentRezervation,
                    items: items
                },
                rezervations: state.rezervations
            }
        }
        case ADD_COUNT: {
            let items = state.currentRezervation.items.map(item => {
                if (item.product.productId == action.id) {
                    item.count += 1
                }
                return item
            })
            return {
                currentRezervation: {
                    ...state.currentRezervation,
                    items: items
                },
                rezervations: state.rezervations
            }
        }
        case REMOVE_ITEM_FROM_ORDER: {
            let newItems = state.currentRezervation.items.filter(item => item.id != action.id)
            return {
                currentRezervation: {
                    ...state.currentRezervation,
                    items: newItems
                },
                rezervations: state.rezervations
            }
        }
        default: {
            return state
        }
    }
}