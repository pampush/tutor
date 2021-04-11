import * as yup from 'yup';

const validationSchema = yup.object().shape({
  theme: yup.string('Введите тему урока').max(200, 'Слишком длинная тема, попробуйте сократить'),
  pupil: yup.mixed().typeError('Такого ученика не существует').required('Укажите ученика'),
  subject: yup
    .string('Укажите предмет')
    .max(100, 'Слишком длинная строка, попробуйте сократить')
    .typeError('Предмет должен быть строкой')
    .required('Укажите ваш предмет'),
  date: yup.string('Укажите дату урока').required('Укажите дату урока'),
  time: yup
    .string('Укажите время занятия')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Введите время занятия в формате: "17:00"'),
});

export default validationSchema;
