import * as yup from 'yup';

const MAX_LESSON_PAY = 999999;

const validationSchema = yup.object().shape({
  day: yup
    .mixed()
    .oneOf(['1', '2', '3', '4', '5', '6', '7'])
    .typeError('День занятия указан неверно')
    .required('Укажите день занятия'),
  time: yup
    .string('Введите время занятия')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Введите время занятия в формате: "17:00"')
    .max(5, 'Это поле не может быть длиннее пяти символов')
    .required('Введите время занятия'),
  price: yup
    .number('Укажите стоимость занятия')
    .typeError('Лучше ввести число')
    .min(0, 'Стоимость должна быть положительной')
    .max(MAX_LESSON_PAY, 'Возможно вы ошиблись и занятие стоит не так дорого')
    .required('Укажите стоимость занятия'),
  subject: yup
    .string()
    .max(200, 'Слишком длинная строка, попробуйте сократить')
    .typeError('Предмет должен быть строкой')
    .required('Укажите ваш предмет'),
});

export default validationSchema;
