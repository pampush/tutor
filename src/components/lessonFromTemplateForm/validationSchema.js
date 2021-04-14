import * as yup from 'yup';

const validationSchema = yup.object().shape({
  theme: yup
    .string('Введите тему урока')
    .max(200, 'Слишком длинная тема, попробуйте сократить')
    .required('Необходимо указать тему урока'),
  notes: yup
    .string('Для заметок')
    .max(500, 'Заметка не может быть длиннее 500 символов')
});

export default validationSchema;
