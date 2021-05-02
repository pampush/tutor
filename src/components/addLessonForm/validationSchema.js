import * as yup from 'yup';

const MAX_LESSON_PAY = 999999;

const validationSchema = yup.object().shape({
  theme: yup
    .string('Введите тему урока')
    .max(200, 'Слишком длинная тема, попробуйте сократить')
    .required('Необходимо указать тему урока'),
  pupil: yup.mixed().typeError('Такого ученика не существует').required('Укажите ученика'),
  note: yup.string('Заметки').max(500, 'Заметка не может быть длинее 500 символов'),
  subject: yup
    .string('Укажите предмет')
    .max(100, 'Слишком длинная строка, попробуйте сократить')
    .typeError('Предмет должен быть строкой')
    .required('Укажите ваш предмет'),
  date: yup
    .string('Укажите дату урока')
    .required('Укажите дату урока'),
  time: yup
    .string('Укажите время занятия')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Введите время занятия в формате: "17:00"')
    .required('Укажите время урока'),
  price: yup
    .number('Укажите стоимость занятия')
    .typeError('Лучше ввести число')
    .min(0, 'Cтоимость должна быть положительной')
    .max(MAX_LESSON_PAY, 'Возможно вы ошиблись и занятие стоит не так дорого')
    .required('Укажите стоимость занятия'),
});

export default validationSchema;
