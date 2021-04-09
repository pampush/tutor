import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const MAX_LESSON_PAY = 1000000000;

const validationSchema = yup.object({
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
    .positive('Cтоимость должна быть положительной')
    .max(MAX_LESSON_PAY, 'Возможно вы ошиблись и занятие стоит не так дорого')
    .required('Укажите стоимость занятия'),
  subject: yup.string().typeError('Предмет должен быть строкой').required('Укажите ваш предмет'),
});

// (async function test() {
//   const res = await validationSchema.isValid({
//     day: 1,
//     time: '15:00',
//     price: 600,
//     subject: 'test',
//   });
//   console.log(res);
// })();

function AddScheduleForm() {
  const formik = useFormik({
    initialValues: {
      day: '0',
      time: '',
      price: '',
      subject: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form className="pupil-form" onSubmit={formik.handleSubmit}>
      <InputLabel id="demo-customized-select-label">День занятия</InputLabel>
      <Select
        native
        labelId="demo-customized-select-label"
        // value={state.age}
        // onChange={handleChange}
        inputProps={{
          name: 'day',
          id: 'day',
        }}
        name="day"
        id="day"
        value={formik.values.day}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.day}
        error={formik.touched.day && Boolean(formik.errors.day)}
        helperText={formik.touched.day && formik.errors.day}>
        <option value={1}>Понедельник</option>
        <option value={2}>Вторник</option>
        <option value={3}>Среда</option>
        <option value={4}>Четверг</option>
        <option value={5}>Пятница</option>
        <option value={6}>Суббота</option>
        <option value={7}>Воскресенье</option>
      </Select>
      <TextField
        margin="normal"
        id="time"
        name="time"
        label="Время занятия, 17:00"
        value={formik.values.time}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.time && Boolean(formik.errors.time)}
        helperText={formik.touched.time && formik.errors.time}
        fullWidth
      />
      <TextField
        margin="normal"
        id="price"
        name="price"
        label="Стоимость занятия, 800"
        value={formik.values.price}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.price && Boolean(formik.errors.price)}
        helperText={formik.touched.price && formik.errors.price}
        fullWidth
      />
      <TextField
        margin="normal"
        id="subject"
        label="Предмет"
        value={formik.values.subject}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.subject && Boolean(formik.errors.subject)}
        helperText={formik.touched.subject && formik.errors.subject}
        fullWidth
      />
    </form>
  );
}

export default AddScheduleForm;
