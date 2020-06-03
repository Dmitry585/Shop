import axios from 'axios';

type LoginResult = {
    access_token: string,
    role: string
} | null

type RegisterResult = LoginResult

export default {
    async register(data: FormData): Promise<RegisterResult> {
        return axios.post("/register", data, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res: { data: RegisterResult; }) => {
            return res.data
        }).catch(() => {
            return null
        })
    },
    async login(data: FormData): Promise<LoginResult> {
        return axios.post("/login", data, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res: { data: LoginResult; }) => {
            return res.data
        }).catch(() => {
            return null
        })
    }
}