import { auth } from '../../firebase';

const signup = (email, password) => async (dispatch) =>
  await auth.createUserWithEmailAndPassword(email, password);

export default signup;
