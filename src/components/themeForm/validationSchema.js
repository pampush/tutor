import * as yup from 'yup';

const validationSchema = yup.object().shape({
  theme: yup.string('Отредактируйте тему').max(200, 'Тема не может быть длиннее 200 символов'),
});

export default validationSchema;
