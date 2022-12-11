import { Link, Outlet } from "react-router-dom"
import useLogout from "../hooks/useLogout"

function Layout() {
  const logout = useLogout()
  const isLogged = JSON.parse(localStorage.getItem("isLogged")) || false

  return (
    <>
      <nav className="flex h-16 bg-white bg-opacity-20 border-gray-200 px-2 sm:px-4 py-2.5">
        <div className="container flex flex-wrap items-center justify-start mx-auto">
          <Link to="/" className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 flex items-center mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            Home
          </Link>
        </div>

        {!isLogged ? (
          <div className="container flex m-auto flex-wrap items-center w-full md:block md:w-auto justify-end mx-auto">
            <ul className="flex bg-opacity-0 bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent">
              <li>
                <Link
                  to="/login"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-transparent border-0 hover:text-blue-700 p-0"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-transparent border-0 hover:text-blue-700 p-0"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="container flex m-auto flex-wrap items-center w-full md:block md:w-auto justify-end mx-auto">
            <ul className="flex bg-opacity-0 bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent">
              <li>
                <Link
                  to="/phonebook"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-transparent border-0 hover:text-blue-700 p-0"
                >
                  Phonebook
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-transparent border-0 hover:text-blue-700 p-0"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
