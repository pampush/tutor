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

import signoutAction from '../redux/actions/signout';
import EditEmailForm from '../components/auth/editEmailForm/EditEmailForm';

function Settings() {
  const dispatch = useDispatch();
  const [viewEditEmailForm, setViewEditEmailForm] = React.useState(false);
  const { signout } = React.useContext(AuthContext);

  const handleEditEmailForm = React.useCallback(() => setViewEditEmailForm(false), []);

  async function handleSignout() {
    await signout();
    dispatch(signoutAction());
  }

  return (
    <React.Fragment>
      <EditEmailForm open={viewEditEmailForm} handleClose={handleEditEmailForm} />

      <List className="settings__container">
        <ListItem button>
          <ListItemAvatar>
            <Avatar className="settings__avatar">
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Редактировать профиль(disabled)" />
        </ListItem>
        <ListItem button>
          <ListItemAvatar>
            <Avatar className="settings__avatar">
              <LockIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Изменить пароль(disabled)" />
        </ListItem>
        <ListItem button onClick={() => setViewEditEmailForm(true)}>
          <ListItemAvatar>
            <Avatar className="settings__avatar">
              <EmailIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Изменить email(disabled)" />
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
