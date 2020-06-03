import { ApplicationState } from "../../store/index";

export const products = (state: ApplicationState) => {
    return state.products.products
}
