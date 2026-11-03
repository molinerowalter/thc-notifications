import api from "@/common/services"
import type { UserCredentials } from "../types" 

export const login = (credentials: UserCredentials) => {
    return api.post(`api/users/signin`, credentials).then(response => {
        return response.data
    }).catch(err => {
        console.log("err: ", err)
        return false
    })
}

export const getUserData=(username: string | null) => {
    return api.get(`api/users/${username}`).then(response => {
        return response.data
    }).catch(err => {
        console.log("err: ", err)
        return false
    })
}
