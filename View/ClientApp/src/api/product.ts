import axios from 'axios';
import { ProductType } from '../modelsTypes';
const FileDownload = require('js-file-download');


export default {
    async getItems(): Promise<Array<ProductType> | null> {
        return axios.get("/api/product").then((res: { data: Array<ProductType> | null }) => {
            return res.data
        }).catch(() => {
            return null
        })
    },
    async addItem(product: FormData): Promise<ProductType | null> {
        return axios.post("/api/product/", product, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res: { data: ProductType | null }) => {
            return res.data
        }).catch(() => {
            return null
        })
    },
    async editItem(id: number, product: FormData): Promise<ProductType | null> {
        return axios.put("/api/product/" + id, product, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res: { data: ProductType | null }) => {
            return res.data
        }).catch(() => {
            return null
        })
    },
    async deleteItem(id: number): Promise<boolean | null> {
        return axios.delete("/api/product/" + id).then(() => {
            return true
        }).catch(() => {
            return null
        })
    },
    async downloadXlsx(): Promise<boolean | null> {

        return axios({
            url: "/api/product/xlsx",
            method: 'GET',
            responseType: 'blob',
        }).then((res) => {
            FileDownload(res.data, "products.xlsx")
            return true
        }).catch(() => {
            return null
        })
    }

}