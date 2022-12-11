import React from "react"
import DeleteContact from "./DeleteContact"

const ShowContacts = ({ contacts, filterValue, deleteContact }) => {
  const filteredName = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filterValue.toLowerCase()) ||
      contact.number.toString().includes(filterValue)
  )

  return filteredName.map((contact, i) => (
    <React.Fragment key={i} >
      <p className="break-words">
        {contact.name}
      </p>
      <p>
        {contact.number}
      </p>
      <div className="pb-1">
        <DeleteContact
          id={contact.id}
          name={contact.name}
          deleteContact={deleteContact}
        />
      </div>
    </React.Fragment>
  ))
}

export default ShowContacts
