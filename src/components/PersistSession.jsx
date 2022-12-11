import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useLocalStorage from "../hooks/useLocalStorage"
import useRefreshToken from "../hooks/useRefreshToken"

function PersistSession() {
  const { auth } = useAuth()
  const refresh = useRefreshToken()
  const [loading, setLoading] = useState(true)
  const [persist] = useLocalStorage("persist", false)

  useEffect(() => {
    let isMounted = true
    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (err) {
        if(err.response.status === 401) {
          console.log("Unauthorized:", err.message)
          return
        }
        console.log(err.response.statusText)
      } finally {
        isMounted && setLoading(false)
      }
    }

    !auth?.accessToken ? verifyRefreshToken() : setLoading(false)

    return () => isMounted = false
    
  }, [])

  return (
    <div>
      {!persist 
        ? <Outlet />
        : loading 
          ? <p className="flex h-screen justify-center mt-80 text-center text-2xl">
              Loading page...
            </p>
          : <Outlet />
      }
    </div>
  )
}

export default PersistSession
