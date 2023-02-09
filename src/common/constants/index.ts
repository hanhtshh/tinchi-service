import { ERRORS } from './errors.constant';
const SERVICE_NAME = 'tinchi';
enum LANGUAGE {
  VN = 'vi',
  EN = 'en'
}

export const MEDIA_CONSTANTS = {
  EXPIRY: 60 * 5, // 15m
};

export {
  ERRORS,
  SERVICE_NAME,
  LANGUAGE
};

export const TIME_ZONE = {
  VIETNAM: 'Asia/Ho_Chi_Minh',
};