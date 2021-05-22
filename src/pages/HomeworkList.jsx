import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { storage } from "../firebase";

import { Container, List, Typography } from "@material-ui/core";

import { HomeworkListItem } from "../components";

function HomeworkList({ currentUser }) {
  const [folders, setFolders] = React.useState([]);
  const { userId, pupil } = useParams();
  let homeworkLink = null;

  const pupils = useSelector(({ pupils }) => pupils.items);
  const isLoaded = useSelector(({ pupils }) => pupils.isLoaded);
  if (isLoaded) homeworkLink = pupils[pupil].homeworkLink;

  React.useEffect(() => {
    const storageRef = storage.ref();
    const folders = [];
    storageRef
      .child(`${userId}/${pupil}`)
      .listAll()
      .then((res) => res.prefixes.forEach((item) => folders.push(item.name)))
      .then(() => setFolders(folders));
  }, []);

  async function handleSubmit(date, e) {
    const storageRef = storage.ref();
    const imagesHomeworkRef = storageRef.child(
      `${userId}/${pupil}/${date}/${e.currentTarget.files[0].name}`
    );
    const snapshot = await imagesHomeworkRef.put(e.currentTarget.files[0]);
    return snapshot;
  }

  return (
    <Container maxWidth="sm" className="homework__container">
      <Typography variant="h5" className="pupils__header">
        Домашняя работа
      </Typography>
      {currentUser && (
        <Typography
          style={{ overflowWrap: "break-word", margin: "10px 0" }}
          variant="body1"
        >
          {`Ссылка на домашнюю работу для ученика: ${homeworkLink}`}
        </Typography>
      )}
      <List>
        {folders.map((item, i) => (
          <HomeworkListItem
            key={`${item}${i}`}
            date={item}
            pupil={pupil}
            userId={userId}
            handleSubmit={handleSubmit}
          />
        ))}
      </List>
    </Container>
  );
}

export default HomeworkList;
