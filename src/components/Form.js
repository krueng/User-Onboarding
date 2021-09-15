import React from "react";

function Form(props) {

    const { values, submit, change, disabled, errors } = props;

    const onChange = evt => {
        const { name, value, checked, type } = evt.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse);
    }

    const onSubmit = evt => {
        evt.preventDefault();
        submit();
    }

    return (
        <form className='form container' onSubmit={onSubmit}>

            <div className='form-group submit'>
                <h2>User Onboarding</h2>
                <div className='form-group input'>
                    <h4>General Information</h4>
                    <label>Name
                        <input
                            type='text'
                            name='name'
                            value={values.name}
                            onChange={onChange}
                        />
                    </label>
                    <label>Email
                        <input
                            type='email'
                            name='email'
                            value={values.email}
                            onChange={onChange}
                        />
                    </label>
                    <label>Password&nbsp;
                        <input
                            type='password'
                            name='password'
                            value={values.password}
                            onChange={onChange}
                        />
                    </label>
                    <label>Term of Service
                        <input
                            type='checkbox'
                            name='tos'
                            onChange={onChange}
                            checked={values.tos}
                        />
                    </label>
                </div>
                <div className='errors'>
                    <div>{errors.name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.tos}</div>
                </div>
                <div className='form-group submit'>
                    <button disabled={disabled}>submit</button>
                </div>
            </div>

        </form>
    )
}

export default Form;