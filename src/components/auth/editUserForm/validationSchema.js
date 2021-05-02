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
});

export default validationSchema;
