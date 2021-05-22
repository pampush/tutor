import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { storage } from "../firebase";

import {
  Container,
  List,
  Typography,
  Button,
  ListItem,
  Link,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

function LessonHomework({ currentUser }) {
  const { userId, pupil, date } = useParams();
  const [files, setFiles] = React.useState([]);
  const [urls, setUrls] = React.useState([]);

  const homeworkLink = useSelector(
    ({ pupils }) => pupils.items[pupil].homeworkLink
  );
  React.useEffect(() => {
    // TODO: replace  arrays to objects
    const storageRef = storage.ref();
    const files = [];
    const urlPromises = [];
    storageRef
      .child(`${userId}/${pupil}/${date}`)
      .listAll()
      .then((res) =>
        res.items.forEach((item) => {
          urlPromises.push(item.getDownloadURL());
          files.push(item.name);
        })
      )
      .then(() => {
        setFiles(files);
        Promise.all(urlPromises).then((res) => setUrls(res));
      });
  }, []);

  async function handleSubmit(e) {
    const storageRef = storage.ref();

    const fileSnapshot = await storageRef
      .child(`${userId}/${pupil}/${date}/${e.currentTarget.files[0].name}`)
      .put(e.currentTarget.files[0]);

    setFiles((prev) => [...prev, fileSnapshot.metadata.name]);
    fileSnapshot.ref
      .getDownloadURL()
      .then((url) => setUrls((prev) => [...prev, url]));
  }

  return (
    <Container className="homework__lesson-container">
      {currentUser && (
        <Typography style={{ overflowWrap: "break-word" }} variant="body2">
          Ссылка на домашнюю работу для ученика: {homeworkLink}
        </Typography>
      )}
      <Button
        variant="contained"
        color="secondary"
        component="label"
        startIcon={<AddIcon />}
        className="lessons__button-text"
      >
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
