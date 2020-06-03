import axios from 'axios';
import { ProductTypeType } from '../modelsTypes';


export default {
    async getMenu(): Promise<Array<ProductTypeType> | null> {
        return axios.get("/api/ProductTypes").then((res: { data: Array<ProductTypeType>  | null }) => {
            return res.data
        }).catch(() => {
            return null
        })
    },
}