import moment from 'moment-timezone';
import { TIME_ZONE } from '../constants';

moment.tz.setDefault(TIME_ZONE.VIETNAM);

export function vnDateFormat(time: Date, format: string, locale?: string) {
  moment.locale(locale || 'vi');
  return moment(time).tz(TIME_ZONE.VIETNAM).format(format);
}

export function getVnTime(time: Date) {
  return moment(time).tz(TIME_ZONE.VIETNAM);
}

export function getDiffDate(start: Date, end: Date) {
  const startMoment = getVnTime(start).startOf('day');
  const endMoment = getVnTime(end).startOf('day');
  return endMoment.diff(startMoment, 'days');
}

export const moment_tz_vn = moment;
