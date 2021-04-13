const tzoffset = new Date().getTimezoneOffset() * 60000;
const localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, 10);


const formInitialValues = {
  theme: '',
  pupil: '',
  subject: '',
  date: localISOTime,
  time: '15:00',
};

export default formInitialValues;