import axios from 'axios';
import { PersonType } from '../modelsTypes';


export default {
    async getItems(): Promise<Array<PersonType> | null> {
        return axios.get("/api/users").then((res: { data: Array<PersonType>  | null }) => {
            return res.data
        }).catch(() => {
            return null
        })
    },
    async editItem(id:number,user: FormData): Promise<PersonType | null> {
        return axios.put("/api/users/" + id, user,{ headers: { 'Content-Type': 'multipart/form-data' } }).then((res: { data: PersonType | null }) => {
            return res.data
        }).catch(() => {
            return null
        })
    },
    async deleteItem(id: number): Promise<boolean | null> {
        return axios.delete("/api/users/" + id).then(() => {
            return true
        }).catch(() => {
            return null
        })
    }
}