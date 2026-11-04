import { useEffect, useState } from "react"
import { useAuth } from "./useAuth"
import { getUserData } from "../services"
import { type LoggedUser } from "@/common/types"
import { useNavigate } from "react-router-dom"
import { useFirebase } from "@/features/notifications/hooks/useFirebase"


export const useLoggedUser = () => {
  const [ userData, setUserData ] = useState<LoggedUser | null>(null)
  const { username, token } = useAuth()
  const { initialize } = useFirebase()
  const navigate = useNavigate()
  
  useEffect(()=>{
    const getData = async () => {
      try {
        const userData = await getUserData(username)
        setUserData(userData)
        initialize(userData?.username)
      } catch (err) {
        console.log("Error fetching user data: ", err)
      }
    }

    if (!token) {
      navigate("/signin")
    }

    if (username) {
      getData()
    }
  },[username, token])

  return { userData }
}

