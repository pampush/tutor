import React from "react";
import { storage } from "../../firebase";

import {
  Button,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Avatar,
  Collapse,
  Link,
  Typography,
  Box,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import FolderIcon from "@material-ui/icons/Folder";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function HomeworkListItem({ date, pupil, userId, handleSubmit }) {
  const [opened, setOpened] = React.useState(false);
  const [metas, setMetas] = React.useState([]);
  const [urls, setUrls] = React.useState([]);

  const memoizedFolder = React.useEffect(() => {
    const storageRef = storage.ref();
    const metadataPromises = [];
    const urlPromises = [];

    storageRef
      .child(`${userId}/${pupil}/${date}`)
      .listAll()
      .then((res) => {
        res.items.forEach((item) => {
          const urlPromise = item.getDownloadURL();
          urlPromises.push(urlPromise);
          const metadataPromise = item.getMetadata();
          metadataPromises.push(metadataPromise);
        });
      })
      .then(() => {
        Promise.all(urlPromises).then((urlArray) => {
          setUrls(urlArray);
        });
        Promise.all(metadataPromises).then((metadataArray) => {
          setMetas(metadataArray);
        });
      });
  }, []);

  async function handleSubmitDecorator(e) {
    if (!e.currentTarget.files.length) return;
    const fileRef = await handleSubmit(date, e);
    const meta = fileRef.metadata;
    const url = await fileRef.ref.getDownloadURL();
    setUrls((prev) => [...prev, url]);
    setMetas((prev) => [...prev, meta]);
  }

  async function handleDelete(metadata) {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(metadata.fullPath);
    fileRef.delete();

    const index = metas.findIndex((item) => item.name === metadata.name);
    if (index >= 0) setUrls((prev) => prev.filter((item, i) => i !== index));
    setMetas((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <Box mb={3}>
      <ListItem button>
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={date} />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="Раскрыть"
            onClick={() => {
              setOpened((prev) => !prev);
            }}
          >
            {opened ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={opened} timeout="auto">
        <List>
          {metas.map((meta, i) => (
            <ListItem key={meta.name}>
              <Link href={urls[i]} target="_blank">
                <Typography>{meta.name}</Typography>
              </Link>
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="Удалить"
                  onClick={() => {
                    handleDelete(meta);
                  }}
                >
                  {<DeleteIcon />}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          color="secondary"
          component="label"
          size="medium"
          startIcon={<AddIcon />}
          className="lessons__button-text"
        >
          Загрузить дз
          <input
            type="file"
            onChange={handleSubmitDecorator}
            accept=""
            hidden
          />
        </Button>
      </Collapse>
    </Box>
  );
}

export default HomeworkListItem;
