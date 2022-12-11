import { useNavigate } from "react-router-dom"
import axios from "../services/axios"
import useAuth from "./useAuth"

function useLogout() {
  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const logout = () => {
    localStorage.setItem("isLogged", false)
    setAuth({})
    try {
      axios.get("/logout", {
        withCredentials: true
      })
      navigate("/login")
    } catch (err) {
      console.log("logout: ", err)
    }
  }
  return logout
}

export default useLogout