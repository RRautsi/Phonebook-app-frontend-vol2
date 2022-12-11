import Notification from "./Notification"
import FilterForm from "./FilterForm"
import ContactForm from "./ContactForm"
import ShowContacts from "./ShowContacts"
import useAxiosPrivate from "../hooks/useAxiosForTokens"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import jwt_decode from "jwt-decode"

const Phonebook = () => {
  const { auth } = useAuth()
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterValue, setFilterValue] = useState("")
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()

  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined
  const userId = decoded?.UserInfo.id

  const contactObject = {
    name: newName,
    number: newNumber,
    userId: userId
  }

  const clearNameAndNumber = () => {
    setNewName("")
    setNewNumber("")
  }

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getContactData = async () => {
      try {
        setLoading(true)
        const response = await axiosPrivate.get("/api/contacts")
        isMounted && setContacts(response.data)
        setLoading(false)
      } catch (err) {
        console.error(err)
        navigate("/login")
      }
    }
    getContactData()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const addNewContact = async (e) => {
    e.preventDefault()
    const alreadyAdded = contacts.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )
    if (alreadyAdded) {
      const numberChange = { ...alreadyAdded, number: newNumber }
      if (
        window.confirm(
          `${alreadyAdded.name} is already added to phonebook, replace the old number with a new one?`
        )
      )
        try {
          const request = await axiosPrivate.put(
            "/api/contacts/" + alreadyAdded.id,
            numberChange
          )
          const response = request.data.result
          setContacts(
            contacts.map((contact) =>
              contact.id !== alreadyAdded.id ? contact : response
            )
          )
          setNotification("Number updated succesfully!")
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        } catch (err) {
          if (err.response.status === 403) {
            navigate("/login")
            return
          }
          setErrorMessage(`User not found. `)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        }
    } else {
      try {
        const request = await axiosPrivate.post("/api/contacts", contactObject)
        const response = request.data.result
        setContacts(contacts.concat(response))
        clearNameAndNumber()
        setNotification(`${contactObject.name} added!`)
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      } catch (err) {
        if (err.response.status === 403) {
          console.log("Authentication failed, " + err.response.statusText)
          navigate("/login")
          return
        }
        setErrorMessage(`Adding contact failed. Try again later`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      }
    }
  }

  const deleteContact = async (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      try {
        await axiosPrivate.delete("/api/contacts/" + id)
        setContacts(contacts.filter((contact) => contact.id !== id))
        setNotification(`${name} deleted successfully`)
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      } catch (err) {
        if (err.response.status === 403) {
          console.log("Authentication failed, " + err.response.statusText)
          navigate("/login")
          return
        }
        setErrorMessage(`Contact deletion failed. Try again later`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      }
    }
  }
  
  return (
    <div className="body-custom to-blue-500 body-font">
      <h2 className="flex justify-center text-4xl antialiased py-10">
        Phonebook
      </h2>
      <Notification message={notification} error={errorMessage} />
      <div className="grid justify-center m-auto border border-black rounded-xl w-80 md:w-96 p-2">
        <h4 className="flex justify-center text-xl py-2">Filter users:</h4>
        <FilterForm filterValue={filterValue} setFilterValue={setFilterValue} />
        <h4 className="flex justify-center text-xl pt-5">Add new user</h4>
        <ContactForm
          newName={newName}
          newNumber={newNumber}
          setNewName={setNewName}
          setNewNumber={setNewNumber}
          addNewContact={addNewContact}
        />
      </div>
      {loading 
        ? 
        <div className="m-auto border border-black rounded-xl w-80 md:w-96 my-3 p-2">
          <p className="text-l text-center">Loading...</p>
        </div>
        :
        <div className="grid grid-cols-3 m-auto border border-black rounded-xl w-80 md:w-96 my-3 p-2">
          <h1 className="text-lg">Name</h1>
          <h1 className="text-lg">Number</h1>
          <br />
          <ShowContacts
            contacts={contacts}
            filterValue={filterValue}
            deleteContact={deleteContact}
          />
        </div>
      }
    </div>
  )
}

export default Phonebook
