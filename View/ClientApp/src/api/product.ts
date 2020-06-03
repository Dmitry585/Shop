import axios from 'axios';
import { ProductType } from '../modelsTypes';


export default {
    async getItems(): Promise<Array<ProductType> | null> {
        return axios.get("/api/Product").then((res: { data: Array<ProductType>  | null }) => {
            return res.data
        }).catch(() => {
            return null
        })
    },
}