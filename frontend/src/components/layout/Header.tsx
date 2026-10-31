import { Button } from "@/common/components/button"
import { Link } from "react-router-dom"

import { useAuth }  from "@/features/login/hooks/useAuth"

const Header = () => {
  const { token, setToken } = useAuth()

  const logout = ()=>{
    setToken("")
  }

  return (
    <header className='app-header'>
      {token ? (
        <Button
          className="pr-4 self-end"
          onClick={logout}
        >
          <Link to="/signin">Logout</Link>
        </Button>
      ):
      (
        <>
          <Button
            className="pr-4"
          >
            <Link to="/signin">Login</Link>
          </Button>
          <Button>
            <Link to="/register">Register</Link>
          </Button>
        </>
      )}
    </header>   
  )
}

export default Header