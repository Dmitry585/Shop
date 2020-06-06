import { ApplicationState } from "../../store/index";

export const currentOrder = (state: ApplicationState) => {
    return state.order.currentRezervation
}

export const rezervations = (state: ApplicationState) => {
    return state.order.rezervations
}
