import axios from 'axios';
import { ProductTypeType } from '../modelsTypes';


export default {
    async getItems(): Promise<Array<ProductTypeType> | null> {
        return axios.get("/api/ProductTypes").then((res: { data: Array<ProductTypeType>  | null }) => {
            return res.data
        }).catch(() => {
            return null
        })
    },
    async addItem(productTypes: FormData): Promise<ProductTypeType | null> {
        return axios.post("/api/ProductTypes/", productTypes, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res: { data: ProductTypeType | null }) => {
            return res.data
        }).catch(() => {
            return null
        })
    },
    async editItem(id: number, productTypes: FormData): Promise<ProductTypeType | null> {
        return axios.put("/api/ProductTypes/" + id, productTypes, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res: { data: ProductTypeType | null }) => {
            return res.data
        }).catch(() => {
            return null
        })
    },
    async deleteItem(id: number): Promise<boolean | null> {
        return axios.delete("/api/ProductTypes/" + id).then(() => {
            return true
        }).catch(() => {
            return null
        })
    }
}