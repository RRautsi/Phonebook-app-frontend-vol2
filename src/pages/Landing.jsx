import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Landing = (props) => {
  const { auth } = useAuth()
  const isLogged = JSON.parse(localStorage.getItem("isLogged")) || false
  const storageName = JSON.parse(localStorage.getItem("user"))

  return (
    <>
      {!isLogged ? (
        <main className="w-auto m-auto flex flex-col">
          <h1 className="text-center mt-10 text-4xl">
            Welcome to phonebook app!
          </h1>
          <p className="text-center mt-5 text-2xl">
            To use this app and keep track of your contacts you need to{" "}
            <Link to="/register" className="hover:text-blue-700 underline">
              register
            </Link>{" "}
            an account
          </p>
          <p className="text-center mt-5 text-2xl">Already have an account?</p>
          <Link to="/login" className="m-auto">
            <p className="text-center text-2xl hover:text-blue-700 underline">
              Sign in
            </p>
          </Link>
        </main>
      ) : (
        <main className="w-auto m-auto flex flex-col">
          <h1 className="text-center mt-10 text-4xl">
            Hello, {auth.name ? auth.name : storageName}!
          </h1>
          <p className="text-center mt-10 text-2xl">To start using phonebook</p>
          <Link to="/phonebook" className="m-auto mt-5">
            <p className="hover:text-blue-700 underline">Click here!</p>
          </Link>
        </main>
      )}
    </>
  )
}
export default Landing
