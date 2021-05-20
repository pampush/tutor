import React from "react";
import { Container, Typography, Box, List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  container: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  typography: {
    margin: "20px 0",
  },
  list: {
    listStyle: "disc inside",
  },
  listItemRoot: {
    display: "list-item",
  },
});

const credentials = [
  "Изображение профиля (аватар)",
  "Фамилия, имя",
  "Адрес электронной почты",
];

const foundations = [
  "статья 24 Конституции Российской Федерации;",
  "пункты 1 и 5 части 1 статьи 6 Федерального закона №152-ФЗ «О персональных данных»;",
  "настоящее Согласие.",
];

function PrivacyPolicy() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h4" className={classes.typography}>
        Согласие на обработку персональных данных
      </Typography>
      <Typography variant="body2" className={classes.typography}>
        Пользователь, регистрируясь на интернет-сайте "TutorDeck"
        (https://tutor-49686.web.app/), принимает настоящее Согласие на
        обработку персональных данных (далее – Согласие). Действуя свободно,
        своей волей и в своем интересе, а также подтверждая свою дееспособность,
        Пользователь дает свое согласие{" "}
        <Box fontWeight="fontWeightBold" component="span">
          Иванов И.И. (юрлицо/физлицо/ип)
        </Box>
        , на обработку своих персональных данных со следующими условиями:
      </Typography>
      <Typography variant="body2" className={classes.typography}>
        <b>1.</b> Данное Согласие дается на обработку персональных данных, как
        без использования средств автоматизации, так и с их использованием.
      </Typography>
      <Typography
        variant="body2"
        component="div"
        className={classes.typography}
      >
        <b>2.</b> Согласие дается на обработку следующих моих персональных
        данных, не являющихся специальными или биометрическими:
        <List classes={{ root: classes.list }}>
          {credentials.map((item, i) => (
            <ListItem key={i} classes={{ root: classes.listItemRoot }}>
              {item}
            </ListItem>
          ))}
        </List>
      </Typography>
      <Typography variant="body2" className={classes.typography}>
        <b>3.</b> В случае предоставления персональных данных третьих лиц, я
        подтверждаю, что мною получено согласие третьих лиц, в интересах которых
        я действую, на обработку их персональных данных, в том числе: сбор,
        систематизацию, накопление, хранение, уточнение (обновление или
        изменение), использование, распространение (в том числе, трансграничная
        передача), обезличивание, блокирование, уничтожение, а также
        осуществление любых иных действий с персональными данными в соответствии
        с действующим законодательством.
      </Typography>
      <Typography variant="body2" className={classes.typography}>
        <b>4.</b> Персональные данные не являются общедоступными.
      </Typography>
      <Typography
        variant="body2"
        className={classes.typography}
        component="div"
      >
        <b>5.</b> Основанием для обработки персональных данных является:
        <List classes={{ root: classes.list }}>
          {foundations.map((item, i) => (
            <ListItem key={i} classes={{ root: classes.listItemRoot }}>
              {item}
            </ListItem>
          ))}
        </List>
      </Typography>
      <Typography
        variant="body2"
        component="div"
        className={classes.typography}
      >
        <b>6.</b> В ходе обработки с персональными данными будут совершены
        следующие действия:
        <List classes={{ root: classes.list }}>
          <ListItem classes={{ root: classes.listItemRoot }}>
            сбор; запись; систематизация; накопление; хранение; уточнение
            (обновление, изменение); извлечение; использование; передача
            (распространение, предоставление, доступ); блокирование; удаление;
            уничтожение.
          </ListItem>
        </List>
      </Typography>
      <Typography variant="body2" className={classes.typography}>
        <b>7.</b> Персональные данные обрабатываются до момента удаления
        аккаунта физического лица, либо в момент получения запроса субъекта
        персональных данных на прекращение обработки.
      </Typography>
    </Container>
  );
}

export default PrivacyPolicy;
