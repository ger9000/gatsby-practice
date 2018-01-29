import React from 'react'

const ContactList = ({ items, onDeletePress }) => {
  const contacts = items.map(contact => (
    <li key={contact._id}>
      <div>{contact.firstName}</div>
      <div>{contact.lastName}</div>
      <div>{contact.phone}</div>
      <button onClick={() => onDeletePress(contact._id)}>Borrar</button>
    </li>
  ))
  return <ul>{contacts}</ul>
}

export default ContactList
