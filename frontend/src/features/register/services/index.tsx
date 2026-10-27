import axios from "axios";
import type { UserToRegister } from "../types" 

const registerUser = (newUser: UserToRegister) => {
    return axios.post(`user`, {
        body: JSON.stringify(newUser),
    }).then(response => {
        console.log("response: ", response.data)
    }).catch(err => {
        console.log("err: ", err)
        return false
    })
}

export default registerUser;