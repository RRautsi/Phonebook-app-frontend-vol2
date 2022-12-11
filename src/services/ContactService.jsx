import axios from "axios";
const contactsUrl = "http://localhost:3005/api/contacts"

const getContacts = async () => {
    const request = axios.get(contactsUrl)
    const response = await request;
    return response.data;
}

const postContact = async (contactObject) => {
    const request = axios.post(contactsUrl, contactObject)
    const response = await request;
    return response.data;
}

const deleteContact = (id) => {
    return axios.delete(`${contactsUrl}/${id}`)
}

const editContact = async (id, changedNumber) => {
  const request = axios.put(`${contactsUrl}/${id}`, changedNumber)
  const response = await request;
    return response.data;
}

const contactService = {
    getContacts,
    postContact,
    deleteContact,
    editContact
}

export default contactService