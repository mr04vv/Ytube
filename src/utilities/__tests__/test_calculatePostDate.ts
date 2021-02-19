import moment from 'moment';
import { secondsDiff, minutesDiff, hoursDiff, daysDiff, calculatePostDate } from 'utilities/calcuatePostDate';

describe('secondsDiff()', () => {
  const nowDate: Date = new Date();
  const beforeDate = moment(nowDate);
  test('秒数差分', () => {
    const second = 5;
    const afterDate = moment(nowDate).add(second, 'seconds');
    const diff = secondsDiff(beforeDate.valueOf(), afterDate.valueOf());
    expect(diff).toStrictEqual(second);
  });

  test('秒数差分', () => {
    const second = 10;
    const afterDate = moment(nowDate).add(second, 'seconds');
    const diff = secondsDiff(beforeDate.valueOf(), afterDate.valueOf());
    expect(diff).toStrictEqual(second);
  });

  test('秒数差分', () => {
    const second = 100;
    const afterDate = moment(nowDate).add(second, 'seconds');
    const diff = secondsDiff(beforeDate.valueOf(), afterDate.valueOf());
    expect(diff).toStrictEqual(second);
  });
});

describe('minutesDiff()', () => {
  const nowDate: Date = new Date();
  const beforeDate = moment(nowDate);
  test('分差分', () => {
    const minute = 5;
    const afterDate = moment(nowDate).add(minute, 'minutes');
    const diff = minutesDiff(beforeDate.valueOf(), afterDate.valueOf());
    expect(diff).toStrictEqual(minute);
  });
  test('分差分', () => {
    const minute = 10;
    const afterDate = moment(nowDate).add(minute, 'minutes');
    const diff = minutesDiff(beforeDate.valueOf(), afterDate.valueOf());
    expect(diff).toStrictEqual(minute);
  });
  test('分差分', () => {
    const minute = 100;
    const afterDate = moment(nowDate).add(minute, 'minutes');
    const diff = minutesDiff(beforeDate.valueOf(), afterDate.valueOf());
    expect(diff).toStrictEqual(minute);
  });
});

describe('hoursDiff()', () => {
  const nowDate: Date = new Date();
  const beforeDate = moment(nowDate);
  test('時間差分', () => {
    const hour = 5;
    const afterDate = moment(nowDate).add(hour, 'hours');
    const diff = hoursDiff(beforeDate.valueOf(), afterDate.valueOf());
    expect(diff).toStrictEqual(hour);
  });
  test('時間差分', () => {
    const hour = 10;
    const afterDate = moment(nowDate).add(hour, 'hours');
    const diff = hoursDiff(beforeDate.valueOf(), afterDate.valueOf());
    expect(diff).toStrictEqual(hour);
  });
  test('時間差分', () => {
    const hour = 100;
    const afterDate = moment(nowDate).add(hour, 'hours');
    const diff = hoursDiff(beforeDate.valueOf(), afterDate.valueOf());
    expect(diff).toStrictEqual(hour);
  });
});

describe('daysDiff()', () => {
  const nowDate: Date = new Date();
  const beforeDate = moment(nowDate);
  test('日差分', () => {
    const day = 5;
    const afterDate = moment(nowDate).add(day, 'days');
    const diff = daysDiff(beforeDate.valueOf(), afterDate.valueOf());
    expect(diff).toStrictEqual(day);
  });
  test('日差分', () => {
    const day = 10;
    const afterDate = moment(nowDate).add(day, 'days');
    const diff = daysDiff(beforeDate.valueOf(), afterDate.valueOf());
    expect(diff).toStrictEqual(day);
  });
  test('日差分', () => {
    const day = 100;
    const afterDate = moment(nowDate).add(day, 'days');
    const diff = daysDiff(beforeDate.valueOf(), afterDate.valueOf());
    expect(diff).toStrictEqual(day);
  });
});

describe('calculatePostDate()', () => {
  const postDate: string = '2019-12-31T23:59:59';
  test('5秒前', () => {
    const comparedDate: string = '2020-01-01T00:00:04';
    const formattedDate = calculatePostDate(postDate, new Date(comparedDate));
    expect(formattedDate).toStrictEqual('5秒前');
  });

  test('20秒前', () => {
    const comparedDate: string = '2020-01-01T00:00:19';
    const formattedDate = calculatePostDate(postDate, new Date(comparedDate));
    expect(formattedDate).toStrictEqual('20秒前');
  });

  test('6分前', () => {
    const comparedDate: string = '2020-01-01T00:06:19';
    const formattedDate = calculatePostDate(postDate, new Date(comparedDate));
    expect(formattedDate).toStrictEqual('6分前');
  });

  test('59分前', () => {
    const comparedDate: string = '2020-01-01T00:59:19';
    const formattedDate = calculatePostDate(postDate, new Date(comparedDate));
    expect(formattedDate).toStrictEqual('59分前');
  });

  test('1時間前', () => {
    const comparedDate: string = '2020-01-01T00:59:59';
    const formattedDate = calculatePostDate(postDate, new Date(comparedDate));
    expect(formattedDate).toStrictEqual('1時間前');
  });

  test('23時間前', () => {
    const comparedDate: string = '2020-01-01T23:59:58';
    const formattedDate = calculatePostDate(postDate, new Date(comparedDate));
    expect(formattedDate).toStrictEqual('23時間前');
  });

  test('1日前', () => {
    const comparedDate: string = '2020-01-01T23:59:59';
    const formattedDate = calculatePostDate(postDate, new Date(comparedDate));
    expect(formattedDate).toStrictEqual('1日前');
  });

  test('6日前', () => {
    const comparedDate: string = '2020-01-06T23:59:59';
    const formattedDate = calculatePostDate(postDate, new Date(comparedDate));
    expect(formattedDate).toStrictEqual('6日前');
  });

  test('日付', () => {
    const comparedDate: string = '2020-01-07T23:59:59';
    const formattedDate = calculatePostDate(postDate, new Date(comparedDate));
    expect(formattedDate).toStrictEqual('12月31日');
  });

  test('1年前', () => {
    const comparedDate: string = '2020-12-31T23:59:59';
    const formattedDate = calculatePostDate(postDate, new Date(comparedDate));
    expect(formattedDate).toStrictEqual('1年前');
  });
});
