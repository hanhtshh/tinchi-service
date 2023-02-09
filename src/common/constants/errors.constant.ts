import HttpStatusCode from './httpStatus.enum';

const ERRORS = {
  UNAUTHORIZED: {
    message: 'UNAUTHORIZED',
    status: HttpStatusCode.FORBIDDEN
  }
};

export { ERRORS };