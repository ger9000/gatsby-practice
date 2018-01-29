import React from 'react'

import styled from 'styled-components'

const Input = styled.input`
  border-color: ${props => (props.error ? 'red' : 'black')};
`

const ContactInput = props => (
  <div>
    <Input {...props} />
    {props.error && <p>{props.error}</p>}
  </div>
)

export default ContactInput
