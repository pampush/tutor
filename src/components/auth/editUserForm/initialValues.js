const initialValues = (name) => {
  const [firstName, lastName] = name.split(' ');
  return { firstName, lastName };
};

export default initialValues;
