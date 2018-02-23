import { S } from 'common/locale';

export const AutoTimeStamp = (created: string) => {
  const now = new Date().getTime() + (new Date().getTimezoneOffset() * 60 * 1000);
  const time = new Date(created).getTime();
  let diff = (now - time) / (1000 * 60);
  if (diff < 2) {
    return S['a moment ago'];
  }
  if (diff < 60) {
    return Math.floor(diff) + S['minutes ago'];
  }
  diff = Math.floor(diff / 60);
  if (diff < 24) {
    return diff + S['hours ago'];
  }
  const day = Math.floor(diff / 24);
  if (day < 7) {
    return day + S['days ago'];
  }
  const week = Math.floor(day / 7);
  if (week < 4) {
    return week + S['weeks ago'];
  }
  const month = Math.floor(week / 4);
  return month + S['months ago'];
};
