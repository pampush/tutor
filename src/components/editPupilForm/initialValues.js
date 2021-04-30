const initialValues = ({ name, address, parents, grade }) => {
  if (parents.length === 0) parents = [{ person: '', contact: '' }];
  return {
    name,
    address,
    parents,
    grade,
  };
};

export default initialValues;
