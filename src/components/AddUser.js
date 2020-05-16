import React, {useContext} from 'react';
import {Form, Field} from 'react-final-form';
import {FieldArray} from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import UsersContext from "../UsersContext";

const AddUser = () => {
    const {state, dispatch} = useContext(UsersContext);
    const handleSubmit = (values) => {
        const errors = {};
        const isIdExist = state.users.some(user => user.ID === values.ID);
        if (isIdExist && !state.editUser) {
            errors['form-errors'] = 'User with the same ID already exist';
            return errors;
        }
        console.log(values, "values");
        const requestMethod = state.editUser ? 'PUT' : 'POST';
        fetch('http://localhost:3001/users-list', {
            method: requestMethod,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                state.editUser ? dispatch({
                    type: 'UPDATE_USER_AND_CLOSE_FORM',
                    payload: res
                }) : dispatch({type: 'ADD_USER_AND_CLOSE_FORM', payload: res})
            }).catch((e) => {
        });
        return errors;
    };
    const required = value => (value ? undefined : 'Required');
    const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined);
    const mustBeTillLength = name => value => {
        if (name === 'firstName' || name === 'lastName') {
            return value && (value.length < 1 || value.length > 20) ? "Length must be 1 - 20 characters long" : undefined;
        }
        if (name === 'age') {
            return value && (Number(value) < 0 || Number(value) > 120) ? "Age must be between 0 - 100" : undefined;
        }
    }
    const composeValidators = (...validators) => value =>
        validators.reduce((error, validator) => error || typeof validator === 'function' && validator(value), undefined);
    return (
        <div className="new-user-form">
            <div className="form-title">
                <h2>New Member</h2>
            </div>
            <Form
                onSubmit={handleSubmit}
                mutators={{
                    ...arrayMutators
                }}
                initialValues={state.editUser ? {
                    ID: state.editUser.ID,
                    firstName: state.editUser.firstName,
                    lastName: state.editUser.lastName,
                    age: state.editUser.age,
                    gender: state.editUser.gender,
                    marialStatus: state.editUser.marialStatus,
                    kids: state.editUser.kids || ['', '']
                } : {
                    ID: '',
                    firstName: '',
                    lastName: '',
                    age: '',
                    gender: 'female',
                    marialStatus: 'single',
                    kids: ['', '']
                }}
                render={({handleSubmit, form, submitting, pristine, values, submitErrors}) => (
                    <form onSubmit={handleSubmit}>
                        <div className="form-field">
                            <Field
                                name="ID"
                                validate={composeValidators(required, mustBeNumber)}
                            >
                                {({input, meta}) => (
                                    <div>
                                        <label>ID:</label>
                                        <input {...input} type="text" placeholder="User ID"/>
                                        {meta.error && meta.touched && <span className='form-error'>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="form-field">
                            <Field
                                name="firstName"
                                validate={composeValidators(required, mustBeTillLength("firstName"))}
                            >
                                {({input, meta}) => (
                                    <div>
                                        <label>First Name:</label>
                                        <input {...input} type="text" placeholder="First Name"/>
                                        {meta.error && meta.touched && <span className='form-error'>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="form-field">
                            <Field
                                name="lastName"
                                validate={composeValidators(required, mustBeTillLength("lastName"))}
                            >
                                {({input, meta}) => (
                                    <div>
                                        <label>Last Name:</label>
                                        <input {...input} type="text" placeholder="Last Name"/>
                                        {meta.error && meta.touched && <span className='form-error'>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="form-field">
                            <Field
                                name="age"
                                validate={composeValidators(required, mustBeNumber, mustBeTillLength("age"))}
                            >
                                {({input, meta}) => (
                                    <div>
                                        <label>Age:</label>
                                        <input {...input} type="text" placeholder="Age"/>
                                        {meta.error && meta.touched && <span className='form-error'>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="form-field">
                            <div>
                                <label>Gender:</label>
                                <Field name="gender" component="select" validate={required}>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                </Field>
                            </div>
                        </div>
                        <div className="form-field">
                            <div>
                                <label>Marial Status:</label>
                                <Field name="marialStatus" component="select" validate={required}>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Widower">Widower</option>
                                </Field>
                            </div>
                        </div>
                        <div className="form-field">
                            <div>
                                <label>Kids:</label>
                                <FieldArray name="kids">
                                    {({fields}) => {
                                        const isAddButton = fields.value && !fields.value.some(val => !val);
                                        return (
                                            <>
                                            <div>
                                                {fields.map((name) => {
                                                    return (
                                                            <div key={name}>
                                                                <div>
                                                                    <Field name={`${name}`} component="input"/>
                                                                </div>
                                                            </div>
                                                    )
                                                })}


                                            </div>
                                        {isAddButton ?
                                            <button className="button pulse" type="button" onClick={() => fields.push('')}>
                                                Add Child
                                            </button> : ''}
                                            </>
                                        )
                                    }
                                    }
                                </FieldArray>
                            </div>
                        </div>
                        {submitErrors ? <span className='form-error'>{submitErrors['form-errors']}</span> : ''}
                        <button type="submit" disabled={submitting || pristine} className="button pulse">Save</button>
                    </form>
                )}
            />
        </div>
    );
};

export default AddUser;
