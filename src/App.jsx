import { Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import Layout from "./pages/Layout"
import Landing from "./pages/Landing"
import AuthCheck from "./components/AuthCheck"
import Unauthorized from "./pages/Unauthorized"
import Phonebook from "./components/Phonebook"
import PersistSession from "./components/PersistSession"
import ErrorPage from "./pages/ErrorPage"

const App = () => {
  return (
    <main className="body-custom to-blue-500 body-font">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route element={<PersistSession />}>
            <Route element={<AuthCheck allowedRoles={[1010]} />}>
              <Route path="phonebook" element={<Phonebook />} />
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage/>} />
        </Route>
      </Routes>
    </main>
  )
}
export default App
