import * as yup from 'yup';

const validationSchema = yup.object().shape({
  email: yup
    .string('Введите адрес электронной почты')
    .email('Введите адрес электронной почты')
    .required('Необходимо указать адрес эл. почты'),
  password: yup
    .string('Введите пароль')
    .min(6, 'Минимальная длина пароля 6 символов')
    .max(30, 'Максимальная длина пароля 30 символов')
    .required('Введите пароль'),
    
});
export default validationSchema;
