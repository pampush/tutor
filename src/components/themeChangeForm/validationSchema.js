import * as yup from 'yup';

const validationSchema = yup.object().shape({
  theme: yup
    .string('Введите тему урока')
    .max(200, 'Слишком длинная тема, попробуйте сократить')
    .required('Необходимо указать тему урока'),
});

export default validationSchema;
