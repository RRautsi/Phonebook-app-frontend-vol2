const DeleteContact = ({ id, name, deleteContact }) => {
  return (
    <button
      onClick={() => deleteContact(id, name)}
      className="button-custom h-6 w-16 md:w-20 text-md ml-3 md:ml-1.5"
    >
      Delete
    </button>
  )
}

export default DeleteContact
