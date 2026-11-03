import { useEffect, useState } from "react"
import { useAuth } from "./useAuth"
import { getUserData } from "../services"
import { type LoggedUser } from "@/common/types"


export const useLoggedUser = () => {
  const [ userData, setUserData ] = useState<LoggedUser | null>(null)
  const { username } = useAuth()
  
  useEffect(()=>{
    const getData = async () => {
      try {
        const userData = await getUserData(username)
        setUserData(userData)
      } catch (err) {
        console.log("Error fetching user data: ", err)
      }
    }

    if (username) {
      getData()
    }
  },[username])

  return { userData }
}

