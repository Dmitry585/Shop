import { IAuthState } from "./auth/types";
import { authReducer } from "./auth/reducers";
import { ProductState } from "./products/types";
import { productsReducer } from "./products/reducers";
import { usersReducer } from "./users/reducers";
import { UsersState } from "./users/types";
import { ProductTypesState } from "./productType/types";
import { productTypesReducer } from "./productType/reducers";
import { OrderState } from "./orders/types";
import { orderReducer } from "./orders/reducers";
import { TableState } from "./table/types";
import { tableReducer } from "./table/reducers";
import { SnackBarState } from "./snackBar/types";
import { snackBarReducer } from "./snackBar/reducers";

// The top-level state object
export interface ApplicationState {
    auth: IAuthState,
    products: ProductState,
    user: UsersState,
    productType: ProductTypesState,
    order: OrderState,
    table: TableState,
    snackBar:SnackBarState
}

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}


// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    auth: authReducer,
    products: productsReducer,
    user: usersReducer,
    productType: productTypesReducer,
    order: orderReducer,
    table: tableReducer,
    snackBar: snackBarReducer
};

