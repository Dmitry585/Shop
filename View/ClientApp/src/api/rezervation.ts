﻿import axios from 'axios';
import { RezervationType, ProductType } from '../modelsTypes';
import ProductItem from '../components/products-f/ProductItem';


export default {
    async getItems(): Promise<Array<RezervationType> | null> {
        return axios.get("/api/Rezervation").then((res: { data: Array<RezervationType> | null }) => {
            return res.data
        }).catch(() => {
            return null
        })
    },
    async addItem(rezervation: RezervationType): Promise<boolean | null> {
        var items = rezervation.items.map((item,i) => { return { count: item.count, productId: item.productId, id:i+1 } })
        return axios.post("/api/Rezervation", {
            ...rezervation,
            items: items
        }).then(() => {
            return true
        }).catch(() => {
            return null
        })
    },
}