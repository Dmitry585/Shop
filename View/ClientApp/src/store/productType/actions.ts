import productTypes_api from "../../api/productType";
import { AppThunkAction } from "../index";
import { ProductTypeType } from "../../modelsTypes";
import { GET_PRODUCTTYPES, GetProductTypeAction, AddProductTypeAction, ADD_PRODUCTTYPES, EditProductTypeAction, EDIT_PRODUCTTYPES, DELETE_PRODUCTTYPE, DeleteProductTypeAction } from "./types";

const getProductTypes = (productTypes: Array<ProductTypeType>): GetProductTypeAction => {
    return {
        type: GET_PRODUCTTYPES,
        productTypes: productTypes
    }
}

const addProductTypeAction = (productType: ProductTypeType): AddProductTypeAction => {
    return {
        type: ADD_PRODUCTTYPES,
        productType: productType
    }
}

const editProductTypeAction = (productType: ProductTypeType): EditProductTypeAction => {
    return {
        type: EDIT_PRODUCTTYPES,
        productType: productType
    }
}

const deleteProductTypeAction = (id: number): DeleteProductTypeAction => {
    return {
        type: DELETE_PRODUCTTYPE,
        id: id
    }
}


export const getProductType = (): AppThunkAction<GetProductTypeAction> => {
    return async (dispatch) => {
        let productTypes = await productTypes_api.getItems()
        if (productTypes)
            dispatch(getProductTypes(productTypes))
    }
}

export const editProductType= (productType: ProductTypeType): AppThunkAction<EditProductTypeAction> => {
    return async (dispatch) => {
        var data: FormData = new FormData()
        data.set("name", productType.name)
        let productTyp = await productTypes_api.editItem(productType.productTypeId ,data)
        if (productTyp)
            dispatch(editProductTypeAction(productTyp))
    }
}

export const deleteProductType = (id: number): AppThunkAction<DeleteProductTypeAction> => {
    return async (dispatch) => {
        let result = await productTypes_api.deleteItem(id)
        if (result)
            dispatch(deleteProductTypeAction(id))
    }
}

export const addProductType = (productType: ProductTypeType): AppThunkAction<AddProductTypeAction> => {
    return async (dispatch) => {
        var data: FormData = new FormData()
        data.set("name", productType.name)
        let result = await productTypes_api.addItem(data)
        if (result)
            dispatch(addProductTypeAction(result))
    }
}