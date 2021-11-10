// Import dependencies
import React from 'react';

// Import CSS
import './styles.css';

// Exported component
function UserForm(props) {
    // Setting vlaues
    const {
        values,
        submit,
        change,
        disabled,
        errors,
    } = props;

    //----------------  Setting Change & Submit  ----------------//
    // Submit
    const onSubmit = evt => {
        evt.preventDefault();
        submit();
    };

    // Change
    const onChange = evt => {
        const { name, value, checked, type } = evt.target;
        const valueCheck = type === 'checkbox' ? checked : value;
        change(name, valueCheck);
    };

    // Render content
    return (
        <form className='form container' onSubmit={onSubmit}>
            <div className='form-group submit'>
                <h2>Add User</h2>

                <button disabled={disabled}>Submit</button>

                <div className='errors'>
                    <div>{errors.first_name}</div>
                    <div>{errors.last_name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.terms}</div>
                </div>
            </div>

            <div className='form-group inputs'>
                <h3>Information</h3>

                <label>First Name (3 characters minimum)
                    <input
                        value={values.first_name}
                        onChange={onChange}
                        name='first_name'
                        type='text'
                    />
                </label>

                <label>Last Name (3 characters minimum)
                    <input
                        value={values.last_name}
                        onChange={onChange}
                        name='last_name'
                        type='text'
                    />
                </label>

                <label>Email
                    <input
                        value={values.email}
                        onChange={onChange}
                        name='email'
                        type='text'
                    />
                </label>

                <label>Password (8 character minimum)
                    <input
                        value={values.password}
                        onChange={onChange}
                        name='password'
                        type='password'
                    />
                </label>

                <label>I agree to the Terms of Service
                    <input
                        checked={values.terms}
                        onChange={onChange}
                        name='terms'
                        type='checkbox'
                    />
                </label>
            </div>
        </form>
    )
}

export default UserForm;