import React from 'react';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../contexts/AuthContext';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';

import SnackPopup from '../components/SnackPopup';
import signoutAction from '../redux/actions/signout';
import EditEmailForm from '../components/auth/editEmailForm/EditEmailForm';
import EditPasswordForm from '../components/auth/editPasswordForm/EditPasswordForm';
import EditUserForm from '../components/auth/editUserForm/EditUserForm';

function Settings() {
  const dispatch = useDispatch();
  const [viewEditEmailForm, setViewEditEmailForm] = React.useState(false);
  const [viewEditPasswordForm, setViewEditPasswordForm] = React.useState(false);
  const [viewEditUserForm, setViewEditUserForm] = React.useState(false);

  const [viewEditEmailSnack, setViewEditEmailSnack] = React.useState(false);
  const [viewEditPasswordSnack, setViewEditPasswordSnack] = React.useState(false);
  const [viewEditUserSnack, setViewEditUserSnack] = React.useState(false);

  const { signout, currentUser } = React.useContext(AuthContext);

  const handleEditEmailForm = React.useCallback(() => setViewEditEmailForm(false), []);
  const handleEditPasswordForm = React.useCallback(() => setViewEditPasswordForm(false), []);
  const handleEditUserForm = React.useCallback(() => setViewEditUserForm(false), []);
  const handleCloseEditEmailSnack = React.useCallback(() => setViewEditEmailSnack(false), []);
  const handleCloseEditPasswordSnack = React.useCallback(() => setViewEditPasswordSnack(false), []);
  const handleCloseEditUserSnack = React.useCallback(() => setViewEditUserSnack(), []);

  async function handleSignout() {
    await signout();
    dispatch(signoutAction());
  }

  return (
    <React.Fragment>
      <EditEmailForm
        open={viewEditEmailForm}
        handleClose={handleEditEmailForm}
        handleSnack={setViewEditEmailSnack}
      />

      <EditPasswordForm
        open={viewEditPasswordForm}
        handleClose={handleEditPasswordForm}
        handleSnack={setViewEditPasswordSnack}
      />

      <EditUserForm
        open={viewEditUserForm}
        handleClose={handleEditUserForm}
        handleSnack={setViewEditUserSnack}
      />

      <SnackPopup
        open={viewEditEmailSnack}
        message={'Пожалуйста, проверьте почту и войдите в личный кабинет заново'}
        onClose={handleCloseEditEmailSnack}
      />

      <SnackPopup
        open={viewEditPasswordSnack}
        message={'Пароль успешно изменен'}
        onClose={handleCloseEditPasswordSnack}
      />

      <SnackPopup
        open={viewEditUserSnack}
        message={'Пожалуйста, проверьте почту и войдите в личный кабинет заново'}
        onClose={handleCloseEditUserSnack}
      />

      <List className="settings__container">
        <ListItem>
          <ListItemText>email: {currentUser.email}</ListItemText>
        </ListItem>
        <ListItem button onClick={() => setViewEditUserForm(true)}>
          <ListItemAvatar>
            <Avatar className="settings__avatar">
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Редактировать профиль" />
        </ListItem>
        <ListItem button onClick={() => setViewEditPasswordForm(true)}>
          <ListItemAvatar>
            <Avatar className="settings__avatar">
              <LockIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Изменить пароль" />
        </ListItem>
        <ListItem button onClick={() => setViewEditEmailForm(true)}>
          <ListItemAvatar>
            <Avatar className="settings__avatar">
              <EmailIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Изменить email" />
        </ListItem>
        <ListItem button onClick={handleSignout}>
          <ListItemAvatar>
            <Avatar className="settings__avatar">
              <ExitToAppIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Выйти из аккаунта" />
        </ListItem>
      </List>
    </React.Fragment>
  );
}

export default Settings;
