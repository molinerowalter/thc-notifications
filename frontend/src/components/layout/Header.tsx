import { Button } from "@/common/components/button"
import { Link } from "react-router-dom"

import { useAuth }  from "@/features/login/hooks/useAuth"

const Header = () => {
  const { token, saveUserAndToken } = useAuth()

  const logout = ()=>{
    saveUserAndToken(null, null);
  }

  return (
    <header className="app-header">
      <div className="brand">
        <span className="brand-mark">N</span>
        <span className="brand-name">TKH Notifications</span>
      </div>
      <div className="header-actions">
        {token ? (
          <Button
            className="btn-header"
            onClick={logout}
          >
            <Link to="/signin">Logout</Link>
          </Button>
        ):
        (
          <>
            <Button className="btn-header">
              <Link to="/signin">Login</Link>
            </Button>
            <Button className="btn-header">
              <Link to="/register">Register</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  )
}

export default Header