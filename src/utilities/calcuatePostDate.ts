import moment from 'moment/moment';

export const secondsDiff = (d1: number, d2: number) => {
  const secDiff = Math.floor((d2 - d1) / 1000);
  return secDiff;
};

export const minutesDiff = (d1:number, d2:number) => {
  const seconds = secondsDiff(d1, d2);
  const minDiff = Math.floor(seconds / 60);
  return minDiff;
};

export const hoursDiff = (d1:number, d2:number) => {
  const minutes = minutesDiff(d1, d2);
  const hourDiff = Math.floor(minutes / 60);
  return hourDiff;
};


export const daysDiff = (d1:number, d2:number) => {
  const hours = hoursDiff(d1, d2);
  const dayDiff = Math.floor(hours / 24);
  return dayDiff;
};

export const calculatePostDate = (strTime: string, nowDate: Date = new Date()) => {
  const date: Date = new Date(strTime); // StringからDate
  const dateTime: number = date.getTime();
  const nowTime: number = nowDate.getTime();
  const secDiff = secondsDiff(dateTime, nowTime);

  if (secDiff >= 60 * 60 * 24 * 365) {
    return `${nowDate.getFullYear() - date.getFullYear()}年前`;
  } if (secDiff >= 60 * 60 * 24 * 7) {
    const formatted = moment(date).format('MM月DD日');
    return formatted;
  } if (secDiff >= 60 * 60 * 24) {
    return `${daysDiff(dateTime, nowTime)}日前`;
  } if (secDiff >= 60 * 60) {
    return `${hoursDiff(dateTime, nowTime)}時間前`;
  } if (secDiff >= 60) {
    return `${minutesDiff(dateTime, nowTime)}分前`;
  }
  return `${secDiff}秒前`;
};
