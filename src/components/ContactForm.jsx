const ContactForm = (props) => {
  const {
    newName,
    newNumber,
    setNewName,
    setNewNumber,
    addNewContact,
  } = props;

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  return (
    <form onSubmit={addNewContact}>
      <div className="grid gap-1 mb-2">
        <p>Name:</p> <input value={newName} onChange={handleNameChange} className="input-style-2 rounded-md"/>
        <br />
        Number: <input value={newNumber} onChange={handleNumberChange} className="input-style-2 rounded-md"/>
      </div>
      <div className="pt-1 pb-5">
        <button type="submit" className="button-custom relative h-6 w-64 md:w-80 text-md">Add</button>
      </div>
    </form>
  );
};

export default ContactForm;
