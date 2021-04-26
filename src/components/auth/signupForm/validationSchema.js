import * as yup from 'yup';

const validationSchema = yup.object().shape({
  firstName: yup
    .string('Введите имя')
    .max(100, 'Имя не может быть длиннее 100 символов')
    .required('Необходимо указать имя'),
  lastName: yup
    .string('Введите фамилию')
    .max(100, 'Фамилия не может быть длиннее 100 символов')
    .required('Необходимо указать фамилию'),
  email: yup
    .string('Введите адрес электронной почты')
    .email('Введите адрес электронной почты')
    .required('Необходимо указать адрес эл. почты'),
  password: yup
    .string('Введите пароль')
    .min(6, 'Минимальная длина пароля 6 символов')
    .max(30, 'Максимальная длина пароля 30 символов')
    .required('Введите пароль'),
  recaptcha: yup
    .mixed()
    .notOneOf([''], 'Выполните проверку Recaptcha')
    .required('Выполните проверку Recaptcha'),
  business: yup
    .boolean()
});

export default validationSchema;
