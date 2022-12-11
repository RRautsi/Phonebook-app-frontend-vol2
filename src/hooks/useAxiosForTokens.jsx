import { useEffect } from "react"
import { axiosPrivate } from "../services/axios"
import useAuth from "./useAuth"
import useRefreshToken from "./useRefreshToken"

function useAxiosPrivate() {
  const { auth } = useAuth()
  const refresh = useRefreshToken()

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
          console.log(config)
          if (!config.headers.authorization) {
            config['headers'] = {...config.headers, authorization: `Bearer ${auth.accessToken}`}
          }
          return config
        }, (error) => Promise.reject(error)
      )

    const responseInterceptor = axiosPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
          const prevRequest = error?.config
          if (error?.response?.status === 403 && !prevRequest?.sent) {
            const newAccessToken = await refresh()
            return axiosPrivate({
              ...prevRequest,
              headers: { ...prevRequest.headers, authorization: `Bearer ${newAccessToken}` },
              sent: true
            })
          }
          return Promise.reject(error)
        }
      )
    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor)
      axiosPrivate.interceptors.response.eject(responseInterceptor)
    }
  }, [auth, refresh])

  return axiosPrivate
}

export default useAxiosPrivate
