import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, NavLink, useLocation } from 'react-router-dom';

import {
  Button,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemAvatar,
  ListItemText,
  Typography,
  IconButton,
  Avatar,
  Container,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from '@material-ui/icons/Folder';

import { storage } from '../firebase';
import { AuthContext } from '../contexts/AuthContext';

function Homework() {
  const { id } = useParams();
  const [files, setFiles] = React.useState([]);

  const lesson = useSelector(({ lessons }) => lessons.items[id]);
  const { currentUser } = React.useContext(AuthContext);

  React.useEffect(() => {
    const storageRef = storage.ref();
    const metadataPromises = [];
    storageRef
      .child(`${currentUser.uid}/${lesson.pupil}/${lesson.date}`)
      .listAll()
      .then((res) => {
        res.items.forEach((item) => {
          const promise = item.getMetadata();
          metadataPromises.push(promise);
        });
      })
      .then(() => {
        Promise.all(metadataPromises).then((metadataArray) => setFiles(metadataArray));
      });
  }, []);

  async function handleSubmit(e) {
    const storageRef = storage.ref();
    if (e.currentTarget.files.length) {
      const imagesHomeworkRef = storageRef.child(
        `${currentUser.uid}/${lesson.pupil}/${lesson.date}/${e.currentTarget.files[0].name}`,
      );
      const snapshot = await imagesHomeworkRef.put(e.currentTarget.files[0]);
      setFiles([...files, snapshot.metadata]);
    }
  }

  return (
    <div className="homework__container">
      <Button
        variant="contained"
        color="secondary"
        component="label"
        startIcon={<AddIcon />}
        className="lessons__button-text">
        Загрузить дз
        <input type="file" onChange={handleSubmit} accept="" hidden multiple />
      </Button>
      <Typography variant="h5" className="homework__header">
        {lesson.theme}
      </Typography>
      <Container maxWidth="sm">
        <List>
          {files.map((file, i) => (
            <ListItem key={`${file.name}${i}`}>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={file.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  );
}

export default Homework;
