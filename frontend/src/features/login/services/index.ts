import api from "@/common/services"
import type { UserCredentials } from "../types" 

const login = (credentials: UserCredentials) => {
    return api.post(`api/users/signin`, credentials).then(response => {
        console.log("LoggedIn: ", response.data);
        return response.data
    }).catch(err => {
        console.log("err: ", err)
        return false
    })
}

export default login;