import * as yup from 'yup';

const MAX_LESSON_PAY = 999999;

const validationSchema = [
  yup.object().shape({
    name: yup
      .string('Укажите имя ученика')
      .typeError('Имя должно быть строкой')
      .max(100, 'Имя длиннее 100 символов?')
      .required('Необходимо указать имя ученика'),
    grade: yup // number?
      .string('В каком классе ребенок учится?')
      .typeError('Класс должен быть строкой')
      .matches(/^([1-9]?|1[0-9])$/, 'Укажите класс от 1 до 11')
      .max(2, 'Слишком большое значение, возможно вы ошиблись')
      .required('Укажите класс, в котором учится ребенок'),
    address: yup
      .string('Укажите адрес')
      .max(200, 'Попробуйте написать адрес короче')
      .typeError('Адрес должен быть строкой'),

    parents: yup.array().of(
      yup.object().shape({
        contact: yup
          .string('Укажите телефонный номер')
          .matches(/^[[0-9]+$/, 'Введите номер телефона')
          .typeError('Номер должен быть строкой')
          .max(20, 'Строка должна быть короче'),

        person: yup
          .string('Укажите информацию о родителе')
          .max(100, 'Cтрока должна быть короче')
          .typeError('Информация о родителе должна быть строкой'),
      }),
    ),
  }),

  yup.object().shape({
    schedules: yup.array().of(
      yup.object().shape({
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
          .max(300, 'Слишком длинная строка, попробуйте сократить')
          .typeError('Предмет должен быть строкой')
          .required('Укажите ваш предмет'),
      }),
    ),
  }),
];

export default validationSchema;
