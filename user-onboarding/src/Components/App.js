// Import dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';

// Import CSS
import './styles.css';

// Import components
import schema from '../Validation/formSchema';
import User from './User';
import UserForm from './UserForm';

//----------------  Setting Initial States  ----------------//
// Set initial form values
const initialFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  terms: false,
};
// Set initial form error values
const initialFormErrors = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  terms: '',
};
// Set initial array of users
const initialUsers = [];
// Set initial boolean for submit to be disabled
const initialDisabled = true;

// Exported component
function App() {
  //----------------  Setting States  ----------------//
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  //----------------  Creating Helpers  ----------------//
  // Grab users from api and set them to `users`
  const getUsers = () => {
    axios.get('https://reqres.in/api/users')
      .then(res => {
        setUsers(res.data.data);
      })
      .catch(err => {
        console.error(`Ruh roh Raggy! ${err}`);
      })
  };

  // Post new users to API
  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
      .then(res => {
        setUsers([res.data, ...users]);
      })
      .catch(err => {
        console.error(`Ruh roh Raggy! ${err}`);
      })
      .finally(() => {
        setFormValues(initialFormValues);
      })
  };

  // Check the form to see if the inputs are valid
  const validate = (name, value) => {
    yup.reach(schema, name).validate(value)
      .then(() => {
        setFormErrors({ ...formErrors, [name]: '' });
      })
      .catch(err => {
        setFormErrors({ ...formErrors, [name]: err.errors[0] });
      })
  };

  //----------------  Event Handlers  ----------------//
  // Input-change event handler
  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value,
    })
  };

  // Submit event handler
  const formSubmit = () => {
    const newUser = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      password: formValues.password,
      terms: formValues.terms,
    }

    postNewUser(newUser);
  };

    //----------------  Side Effects  ----------------//
    // Acquire users
    useEffect(() => {
      getUsers();
    }, []);

    // Adjust value of `disabled` when `formValues` changes
    useEffect(() => {
      schema.isValid(formValues)
        .then(valid => {
          setDisabled(!valid);
        })
    }, [formValues]);

  // Render content
  return (
    <div className="container">
      <header><h1>User Form</h1></header>

      <UserForm
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

      {
        users.map(user => {
          return (
            <User key={user.email} details={user} />
          )
        })
      }
    </div>
  );
}

export default App;
