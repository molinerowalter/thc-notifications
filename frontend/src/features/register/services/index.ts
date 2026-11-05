import api from "@/common/services"
import type { UserToRegister } from "../types" 

const registerUser = (newUser: UserToRegister) => {
    const payload = {
        first_name: newUser["first-name"],
        last_name: newUser["last-name"],
        email: newUser.email,
        country_code: newUser["country-code"],
        phone: newUser.phone,
        username: newUser.username,
        password: newUser.password,
    }

    return api.post(`api/users/`, payload).then(response => {
        console.log("Created User: ", response.data)
    }).catch(err => {
        console.log("err: ", err)
        return false
    })
}

export default registerUser;