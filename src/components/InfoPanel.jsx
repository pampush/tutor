import React from 'react';
import { useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import InfoPanelCard from './InfoPanelCard';
import lessons from '../redux/reducers/lessons';

const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const endings = ['урок', 'урока', 'уроков'];

function endingsForm(n) {
  let a = n % 100;
  let b = a % 10;
  if (a > 10 && a < 20) return 'уроков';
  if (b > 1 && b < 5) return 'урока';
  if (b === 1) return 'урок';
  return 'уроков';
}

function InfoPanel() {
  let numLessons = useSelector(({ lessons }) => lessons.items);
  numLessons = Object.keys(numLessons).length;
  return (
    <Container maxWidth="md" className="info__container">
      <Grid container spacing={2}>
        <Hidden xsDown>
          <Grid item>
            <InfoPanelCard header={days[new Date().getDay()]}>
              <CalendarTodayIcon />
            </InfoPanelCard>
          </Grid>
          <Grid item>
            <InfoPanelCard header={endingsForm(numLessons)}>{numLessons}</InfoPanelCard>
          </Grid>
          <Grid item>
            <InfoPanelCard icon={null} />
          </Grid>
        </Hidden>
      </Grid>
    </Container>
  );
}

export default InfoPanel;
