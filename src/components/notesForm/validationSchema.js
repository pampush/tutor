import * as yup from 'yup';

const validationSchema = yup.object().shape({
  note: yup.string('Отредактируйте заметку').max(500, 'Заметка не может быть длиннее 500 символов'),
});

export default validationSchema;
