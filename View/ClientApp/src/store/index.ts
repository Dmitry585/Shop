import { IAuthState } from "./auth/types";
import { authReducer } from "./auth/reducers";
import { ProductState } from "./products/types";
import { productsReducer } from "./products/reducers";
import { usersReducer } from "./users/reducers";
import { UsersState } from "./users/types";

// The top-level state object
export interface ApplicationState {
    auth: IAuthState,
    products: ProductState,
    user: UsersState
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
    user: usersReducer
};

