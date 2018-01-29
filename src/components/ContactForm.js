import React from 'react'

import ContactInput from './ContactInput'

const ContactForm = ({
  firstName,
  lastName,
  phone,
  onFormChange,
  onFormSubmit,
  onBlur
}) => (
  <div>
    <h3>Nuevo Contacto</h3>
    <div className="form-group row">
      <div className="col col-3">
        <label htmlFor="firstName">Nombre</label>
      </div>
      <div className="col col-9">
        <ContactInput
          id="firstName"
          name="firstName"
          type="text"
          value={firstName.value}
          onChange={onFormChange}
          onBlur={onBlur}
          error={firstName.error}
        />
      </div>
    </div>
    <div className="form-group row">
      <div className="col col-3">
        <label htmlFor="lastName">Apellido</label>
      </div>
      <div className="col col-9">
        <ContactInput
          id="lastName"
          name="lastName"
          type="text"
          value={lastName.value}
          onChange={onFormChange}
          onBlur={onBlur}
          error={lastName.error}
        />
      </div>
    </div>
    <div className="form-group row">
      <div className="col col-3">
        <label htmlFor="phone">Teléfono</label>
      </div>
      <div className="col col-9">
        <ContactInput
          id="phone"
          name="phone"
          type="phone"
          value={phone.value}
          onChange={onFormChange}
          onBlur={onBlur}
          error={phone.error}
        />
      </div>
    </div>
    <div className="text-center">
      <button className="btn mt-2 btn-primary" onClick={onFormSubmit}>
        Guardar
      </button>
    </div>
  </div>
)

export default ContactForm
