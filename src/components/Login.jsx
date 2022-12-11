import { useRef, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useInput from "../hooks/useInput"
import useToggle from "../hooks/useToggle"
import axios from "../services/axios"

const Login = (props) => {
  const { setAuth } = useAuth()
  const [name, resetName, nameAttributes] = useInput("user", "")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [checkbox, toggleCheckbox] = useToggle("persist", false)
  
  const userRef = useRef()
  const navigate = useNavigate()
  const location = useLocation()
  const isLogged = JSON.parse(localStorage.getItem("isLogged"))

  const lastPage = location.state?.from?.pathname || "/"

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrorMessage("")
  }, [name, password])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (isLogged) {
      setErrorMessage("You are already logged in")
      return
    }
    localStorage.setItem("isLogged", true)
    try {
      const response = await axios.post(
        "/login",
        JSON.stringify({
          name,
          password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )

      const accessToken = response?.data?.accessToken
      setAuth({ name, accessToken })
      resetName()
      setPassword("")
      navigate(lastPage, { replace: true })
    } catch (err) {
      if (!err?.response) {
        setErrorMessage(
          "Something went wrong. No response from server. Try again later"
        )
      } else if (err.response?.status === 400) {
        setErrorMessage("Name or password missing")
      } else if (err.response?.status === 401) {
        setErrorMessage("Unauthorized: Check username and password")
      } else {
        setErrorMessage("Login failed")
      }
    }
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center pt-12 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in
            </h2>
          </div>
          <form className="mt-8 space-y-3" onSubmit={onSubmit}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  ref={userRef}
                  required
                  className="input-style-2 rounded-t-md"
                  placeholder="Name"
                  onChange={nameAttributes.onChange} //{...nameAttributes} would apply both onChange and value but it is not very verbose.
                  value={nameAttributes.value}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password check
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="input-style-2 rounded-b-md"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
            </div>
            <Link to="/register">
              <p className="text-xs pl-1 pt-1">Need an account? Register here</p>
            </Link>
            <div>
              <button
                type="submit"
                disabled={name && password ? false : true}
                className="group relative sign-up-btn bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-zinc-700"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                Sign in
              </button>
            </div>
            <div>
              <label htmlFor="persist" className="text-m font-medium">Remember me</label>
              <input 
                id="persist"
                name="persist"
                type="checkbox"
                onChange={toggleCheckbox} 
                checked={checkbox}
                className="checkbox-style ml-1"
                />
            </div>
          </form>
        </div>
      </div>
      <p className={errorMessage ? "error" : "invisible"}>{errorMessage}</p>
    </>
  )
}

export default Login
