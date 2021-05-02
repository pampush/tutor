import * as yup from 'yup';

const validationSchema = yup.object().shape({
  oldpassword: yup
    .string()
    .min(6, 'Минимальная длина пароля 6 символов')
    .max(30, 'Максимальная длина пароля 30 символов')
    .required('Введите пароль'),
  password: yup
    .string()
    .min(6, 'Минимальная длина пароля 6 символов')
    .max(30, 'Максимальная длина пароля 30 символов')
    .required('Введите пароль'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
    .min(6, 'Минимальная длина пароля 6 символов')
    .max(30, 'Максимальная длина пароля 30 символов')
    .required('Введите пароль'),
});

export default validationSchema;
