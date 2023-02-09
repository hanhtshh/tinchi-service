import { StatusCode } from './htttp.enums';
import { IHttpResponseBody } from './http.interface';

export class ResponseBase<DataType, ErrorEnumType> {
  private body: IHttpResponseBody<DataType, ErrorEnumType> = {};

  private statusCode: StatusCode;

  constructor() {
    this.body.data = undefined;
    this.body.error = undefined;
    this.statusCode = StatusCode.INTERNAL_SERVER_ERROR;
  }

  success(data: DataType, statusCode: StatusCode = StatusCode.OK) {
    this.body.data = data;
    this.statusCode = statusCode;
  }

  fail(
    error: ErrorEnumType,
    statusCode: StatusCode = StatusCode.INTERNAL_SERVER_ERROR
  ) {
    this.body.error = error;
    this.statusCode = statusCode;
  }

  getData() {
    return this.body.data;
  }

  getBody() {
    return this.body;
  }

  getError() {
    return this.body.error;
  }

  getStatusCode() {
    return this.statusCode;
  }
}
