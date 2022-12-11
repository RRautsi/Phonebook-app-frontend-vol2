import { useRef, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "../services/axios"


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z]).{8,24}$/

const Register = (props) => {
  const userRef = useRef()

  const [name, setName] = useState("")
  const [validName, setValidName] = useState(false)
  const [nameFocus, setNameFocus] = useState(false)

  const [password, setPassword] = useState("")
  const [validPassword, setValidPassword] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)

  const [passwordCheck, setPasswordCheck] = useState("")
  const [validCheck, setValidCheck] = useState(false)
  const [checkFocus, setCheckFocus] = useState(false)

  const [errorMessage, setErrorMessage] = useState("")
  const [notification, setNotification] = useState("")
  const [success, setSuccess] = useState(false)

  //const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{7,24}$/

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    const isValid = USER_REGEX.test(name)
    setValidName(isValid)
    if (nameFocus && name && !isValid) {
      setNotification(
        "Username must be atleast 4 characters long and it must start with a letter."
      )
    }
  }, [name, nameFocus])

  useEffect(() => {
    const isValid = PWD_REGEX.test(password)
    setValidPassword(isValid)
    const match = password === passwordCheck
    setValidCheck(match)
    if (passwordFocus && password && !isValid) {
      setNotification(
        "Password must be atleast 8 characters long and include letters, numbers and special characters (!@#$%)"
      )
    } else if (checkFocus && !match) {
      setNotification("Passwords must match")
    }
  }, [password, passwordCheck, passwordFocus, checkFocus])

  useEffect(() => {
    setErrorMessage("")
  }, [name, password, passwordCheck])

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(
        "/register",
        JSON.stringify({
          name,
          password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      setName("")
      setPassword("")
      setPasswordCheck("")
      setSuccess(true)
    } catch (err) {
      if (!err?.response) {
        setErrorMessage("Something went wrong. No response from server. Try again later")
      } else if (err.response?.status === 409) {
        setErrorMessage("Username is already in use")
      } else {
        setErrorMessage("Registration failed")
      }
    }
  }

  return (
    <>
      {success ? (
        <div className="min-h-full w-96 items-center m-auto justify-center py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="mt-6 text-center text-4xl font-bold tracking-tight text-gray-900">User registered!</h1>
          <Link to="/login">
            <p className="mt-6 text-center text-l font-bold tracking-tight text-gray-900" ref={userRef}>Back to login screen</p>
          </Link>
        </div>
      ) : (
        <>
          <div className="flex min-h-full items-center justify-center pt-12 pb-6 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  Register
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
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setNameFocus(true)}
                      onBlur={() => setNameFocus(false)}
                      value={name}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="text"
                      required
                      className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setPasswordFocus(true)}
                      onBlur={() => setPasswordFocus(false)}
                      value={password}
                    />
                  </div>
                  <div>
                    <label htmlFor="passwordCheck" className="sr-only">
                      Password check
                    </label>
                    <input
                      id="passwordCheck"
                      name="passwordCheck"
                      type="password"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Re-enter password"
                      onChange={(e) => setPasswordCheck(e.target.value)}
                      onFocus={() => setCheckFocus(true)}
                      onBlur={() => setCheckFocus(false)}
                      value={passwordCheck}
                    />
                  </div>
                </div>
                <Link to="/login">
                  <p className="text-xs pl-1 pt-1">Already registered? Sign in here</p>
                </Link>
                <div>
                  <button
                    type="submit"
                    disabled={
                      validName && validPassword && validCheck ? false : true
                    }
                    className="group relative sign-up-btn bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-zinc-700"
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
          <p
            className={
              (password && !validPassword) ||
              (name && !validName) ||
              (passwordCheck && !validCheck)
                ? "instructions"
                : "invisible"
            }
          >
            {notification}
          </p>
          <p className={errorMessage ? "error" : "invisible"}>{errorMessage}</p>
        </>
      )}
    </>
  )
}

export default Register
