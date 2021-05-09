import React from 'react';
import { useParams } from 'react-router-dom';
import { storage } from '../firebase';

import { Container, List, Typography, Button, ListItem, Link } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

function LessonHomework({ currentUser }) {
  // TODO: replace  arrays to objects
  const { storageId, pupil, date } = useParams();
  const [files, setFiles] = React.useState([]);
  const [urls, setUrls] = React.useState([]);

  React.useEffect(() => {
    const storageRef = storage.ref();
    const files = [];
    const urlPromises = [];
    storageRef
      .child(`${storageId}/${pupil}/${date}`)
      .listAll()
      .then((res) =>
        res.items.forEach((item) => {
          urlPromises.push(item.getDownloadURL());
          files.push(item.name);
        }),
      )
      .then(() => {
        setFiles(files);
        Promise.all(urlPromises).then((res) => setUrls(res));
      });
  }, []);

  async function handleSubmit(e) {
    const storageRef = storage.ref();

    const fileSnapshot = await storageRef
      .child(`${storageId}/${pupil}/${date}/${e.currentTarget.files[0].name}`)
      .put(e.currentTarget.files[0]);

    setFiles((prev) => [...prev, fileSnapshot.metadata.name]);
    fileSnapshot.ref.getDownloadURL().then((url) => setUrls((prev) => [...prev, url]));
  }

  return (
    <Container class="homework__lesson-container">
      {currentUser && (
        <Typography style={{ overflowWrap: 'break-word' }} variant="body2">
          Ссылка на домашнюю работу для ученика:
          {`https://tutor-49686.web.app/homework/${storageId}/${pupil}`}
        </Typography>
      )}
      <Button
        variant="contained"
        color="secondary"
        component="label"
        startIcon={<AddIcon />}
        className="lessons__button-text">
        Загрузить дз
        <input type="file" onChange={handleSubmit} accept="" hidden />
      </Button>
      <List>
        {files.map((item, i) => (
          <ListItem key={`${item}${i}`}>
            <Link href={urls[i]} target="_blank">
              <Typography>{item}</Typography>
            </Link>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default LessonHomework;
