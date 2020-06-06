import axios from 'axios';
import { TableType } from '../modelsTypes';


export default {
    async getItems(): Promise<Array<TableType> | null> {
        return axios.get("/api/tables").then((res: { data: Array<TableType> | null }) => {
            return res.data
        }).catch(() => {
            return null
        })
    },
    async addItem(table: FormData): Promise<TableType | null> {
        return axios.post("/api/tables/", table, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res: { data: TableType | null }) => {
            return res.data
        }).catch(() => {
            return null
        })
    },
    async editItem(id: number, table: FormData): Promise<TableType | null> {
        return axios.put("/api/tables/" + id, table, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res: { data: TableType | null }) => {
            return res.data
        }).catch(() => {
            return null
        })
    },
    async deleteItem(id: number): Promise<boolean | null> {
        return axios.delete("/api/tables/" + id).then(() => {
            return true
        }).catch(() => {
            return null
        })
    }
}