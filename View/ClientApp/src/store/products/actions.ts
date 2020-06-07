import products_api from "../../api/product";
import { AppThunkAction } from "../index";
import { INIT, ADD_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT, InitProductAction, AddProductAction, EditProductAction, DeleteProductAction } from "./types";
import { ProductType } from "../../modelsTypes";

export const initAction = (products: Array<ProductType>): InitProductAction => {
    return {
        type: INIT,
        products: products
    }
}

const addProductAction = (product: ProductType): AddProductAction => {
    return {
        type: ADD_PRODUCT,
        product: product
    }
}

const editProductAction = (product: ProductType): EditProductAction => {
    return {
        type: EDIT_PRODUCT,
        product: product
    }
}

const deleteProductAction = (id: number): DeleteProductAction => {
    return {
        type: DELETE_PRODUCT,
        id: id
    }
}


export const init = (): AppThunkAction<InitProductAction> => {
    return async (dispatch) => {
        let products = await products_api.getItems()
        if (products)
            dispatch(initAction(products))
    }
}

export const editProduct = (product: ProductType): AppThunkAction<EditProductAction> => {
    return async (dispatch) => {
        var data: FormData = new FormData()
        data.set("about", product.about)
        data.set("count", product.count.toString())
        data.set("image", product.image)
        data.set("name", product.name)
        data.set("price", product.price)
        data.set("productTypeId", product.productTypeId.toString())
        let produc = await products_api.editItem(product.productId, data)
        if (produc)
            dispatch(editProductAction(produc))
    }
}

export const deleteProduct = (id: number): AppThunkAction<DeleteProductAction> => {
    return async (dispatch) => {
        let result = await products_api.deleteItem(id)
        if (result)
            dispatch(deleteProductAction(id))
    }
}

export const addProduct = (product: ProductType): AppThunkAction<AddProductAction> => {
    return async (dispatch) => {
        var data: FormData = new FormData()
        data.set("about", product.about)
        data.set("count", product.count.toString())
        data.set("image", product.image)
        data.set("name", product.name)
        data.set("price", product.price)
        data.set("productTypeId", product.productTypeId.toString())
        let result = await products_api.addItem(data)
        if (result)
            dispatch(addProductAction(result))
    }
}