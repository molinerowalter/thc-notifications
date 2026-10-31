import api from "@/common/services"
import type { UserToRegister } from "../types" 

const registerUser = (newUser: UserToRegister) => {
    return api.post(`api/users/`, newUser).then(response => {
        console.log("Created User: ", response.data)
    }).catch(err => {
        console.log("err: ", err)
        return false
    })
}

export default registerUser;