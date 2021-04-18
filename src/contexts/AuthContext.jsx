import { isEmptyArray } from 'formik';
import React from 'react';
import { auth, emailAuthProvider } from '../firebase';

auth.languageCode = 'ru';
export const AuthContext = React.createContext({ test: 'success' });

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [firstLogin, setFirstLogin] = React.useState(false);

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  const login = (email, password) => {
    const authCred = emailAuthProvider.credential(email, password);
    console.log(authCred);
    return auth.signInWithEmailAndPassword(email, password);
  };
  const updateUser = (name) => auth.currentUser.updateProfile({ displayName: name });
  const signout = () => auth.signOut();
  //  const getCredential = (credential) = () => credential. ;
  // somehow this func runs befare currentUser state updating (race condition)
  const verifyEmail = (user) =>
    user.sendEmailVerification({
      url: 'http://localhost:3000/schedule?first=true',
      handleCodeInApp: true,
    });

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.metadata.lastSignInTime === user.metadata.creationTime) {
          console.log('equal');
          let params = new URLSearchParams(document.location.search.substring(1));
          let first = params.get('first'); // is the string "Jonathan"
          setFirstLogin(Boolean(first));
        }
        console.log('onauth');
        console.log(user.getIdToken());
         //сonsole.log(auth.checkActionCode());
        setCurrentUser(user);
        user.reload();
        setLoading(false);
      } else {
        setCurrentUser(user);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    verifyEmail,
    updateUser,
    signout,
    firstLogin,
    setFirstLogin,
  };

  return (
    <AuthContext.Provider value={value}>{!loading ? children : 'loading'}</AuthContext.Provider>
  );
}

export { AuthProvider };
