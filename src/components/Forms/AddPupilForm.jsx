import React from 'react'
import TextField from '@material-ui/core/TextField'
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

function AddPupilForm() {
  return (
    <form className="pupil-form">
      <TextField autoFocus margin="normal" id="name" label="Имя" fullWidth />
      <TextField margin="normal" id="grade" label="Класс" fullWidth />
      <TextField margin="normal" id="address" label="Адрес" fullWidth />
      <TextField margin="normal" id="parents" label="Родитель" fullWidth />
      <TextField margin="normal" id="contacts" label="Контакты" fullWidth />
    </form>
  )
}

export default AddPupilForm
