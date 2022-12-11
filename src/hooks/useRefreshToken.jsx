import axios from '../services/axios'
import useAuth from './useAuth'

function useRefreshToken() {
  const { auth, setAuth } = useAuth()

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true
    })
    const newAccessToken = response.data.accessToken
    setAuth({ name: response.data.name, accessToken: newAccessToken })
    return response.data.accessToken
  }
  return refresh
}

export default useRefreshToken