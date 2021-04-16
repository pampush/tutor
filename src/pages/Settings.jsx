import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

import { AuthContext } from '../contexts/AuthContext';

function Settings() {
  const { signout } = React.useContext(AuthContext);
  return (
    <List className="settings__container">
      <ListItem button>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Редактировать профиль" />
      </ListItem>
      <ListItem button>
        <ListItemAvatar>
          <Avatar>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Изменить пароль" />
      </ListItem>
      <ListItem button>
        <ListItemAvatar>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Изменить email" />
      </ListItem>
      <ListItem button onClick={signout}>
        <ListItemAvatar>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Выйти из аккаунта" />
      </ListItem>
    </List>
  );
}

export default Settings;
