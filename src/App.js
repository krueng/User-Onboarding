import React, { useEffect, useState } from 'react';
import Form from './components/Form'
import formSchema from './validations/formSchema';
import * as yup from 'yup';
import './App.css';
import axios from 'axios';

const initialFormValues = {
  name: '',
  email: '',
  password: '',
  tos: false
}
const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  tos: true
}
const initialUser = [];
const initialDisabled = false;

function App() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [users, setUsers] = useState(initialUser);

  const postNewUser = newUser => {
    axios
      .post('https://reqres.in/api/users', newUser)
      .then(res => {
        setUsers([res.data, ...users]);
        console.log([res.data, ...users])
        setFormValues(initialFormValues)
      })
      .catch(err => {
        console.error(err);
        setFormValues(initialFormValues);
      })
  }
  const validate = (name, value) => {
    yup.reach(formSchema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
  }

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      tos: formValues.tos
    }
    postNewUser(newUser)
  }

  useEffect(() => {
    formSchema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  return (
    <div className="container">
      <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
      {
        users.map(user => {
          return (
            <div className='container'>
              <h2>{users.name}</h2>
              <p>Email: {users.email}</p>
              <p>Password: {users.password}</p>
              <p>Tos: {users.tos}</p>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
