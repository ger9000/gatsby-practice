import React from 'react'
import Link from 'gatsby-link'
import axios from 'axios'
import validator from 'validator'

import ContactList from '../components/ContactList'
import ContactForm from '../components/ContactForm'

class IndexPage extends React.Component {
  state = {
    searchTerm: '',
    firstName: {
      value: '',
      error: ''
    },
    lastName: {
      value: '',
      error: ''
    },
    phone: {
      value: '',
      error: ''
    },
    contacts: []
  }

  componentDidMount() {
    this.getContacts()
  }

  async getContacts() {
    try {
      const response = await axios({
        url: 'https://address-book-api-kfpkaqtghu.now.sh/api/contacts',
        method: 'GET',
        headers: {
          'Api-Key': '1718324948'
        }
      })
      const { data } = response.data
      this.setState({ contacts: data })
    } catch (error) {
      console.log(error)
    }
  }

  handleSearchTermChange = event => {
    this.setState({ searchTerm: event.target.value })
  }

  handleFormChange = event => {
    this.setState({ [event.target.name]: { value: event.target.value } })
  }

  saveContact() {
    return axios({
      url: 'https://address-book-api-kfpkaqtghu.now.sh/api/contacts',
      method: 'POST',
      headers: {
        'Api-Key': '1718324948'
      },
      data: {
        firstName: this.state.firstName.value,
        lastName: this.state.lastName.value,
        phone: this.state.phone.value
      }
    })
  }

  async deleteContact(_id) {
    return axios({
      method: 'DELETE',
      url: `https://address-book-api-kfpkaqtghu.now.sh/api/contacts/${_id}`,
      headers: {
        'Api-Key': '1718324948'
      }
    })
  }

  onDeletePress = async _id => {
    try {
      await this.deleteContact(_id)
      
      this.getContacts()
    } catch (error) {
      console.log(error)
    }
  }

  onSavePress = async () => {
    const error = this.validateNewContact()
    if (error) {
      alert(error)
      return
    }
    try {
      await this.saveContact()
      this.getContacts()
      this.setState({
        firstName: {
          value: ''
        },
        lastName: {
          value: ''
        },
        phone: {
          value: ''
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  validateNewContact() {
    if (this.state.firstName.value.trim().length === 0) {
      return 'El campo Nombre es obligatorio'
    }
    if (this.state.lastName.value.trim().length === 0) {
      return 'El campo Apellido es obligatorio'
    }
    if (this.state.phone.value.trim().length === 0) {
      return 'El campo Teléfono es obligatorio'
    }
    if (!validator.isNumeric(this.state.phone.value)) {
      return 'El teléfono no es válido'
    }
    return null
  }

  handleFormBlur = event => {
    if (event.target.value.length === 0) {
      this.setState({
        [event.target.name]: {
          value: event.target.value,
          error: 'Este campo es requerido'
        }
      })
    }
  }

  render() {
    const contacts = this.state.contacts.filter(contact => {
      if (contact.firstName.includes(this.state.searchTerm)) return true
      if (contact.lastName.includes(this.state.searchTerm)) return true
      return false
    })
    return (
      <div>
        <div className="row">
          <div className="col col-6 text-center">
            <input
              type="text"
              value={this.state.searchTerm}
              onChange={this.handleSearchTermChange}
            />
            <ContactList items={contacts} onDeletePress={this.onDeletePress} />
          </div>
          <div className="col col-6 text-center">
            <ContactForm
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              phone={this.state.phone}
              onFormChange={this.handleFormChange}
              onFormSubmit={this.onSavePress}
              onBlur={this.handleFormBlur}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default IndexPage
