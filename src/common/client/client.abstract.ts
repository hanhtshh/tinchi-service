import { Logger } from "../../logger";
import { HttpClient, createHttpClient } from "../http";
import { IRequest } from "../http/http.interface";
import { Method } from "../http/htttp.enums";

const logger = Logger.getInstance(module);

export abstract class ClientAbstract {
  protected readonly httpClient: HttpClient;

  constructor(
    private readonly baseURL: string,
    private readonly headers: Record<string, any>
  ) {
    this.httpClient = createHttpClient({
      baseURL,
      headers,
    });
  }

  public async request({
    apiPath,
    method,
    headers,
    payload,
    params,
  }: IRequest) {
    let response;
    logger.debug(`payload >>: ${JSON.stringify(payload)}`);
    try {
      const config: object = {
        headers: { ...this.headers, ...headers },
        params,
      };
      switch (method) {
        case Method.GET: {
          response = this.httpClient.get(apiPath, config);
          break;
        }
        case Method.POST: {
          response = this.httpClient.post(apiPath, payload, config);
          break;
        }
        case Method.PUT: {
          response = this.httpClient.put(apiPath, payload, config);
          break;
        }
        case Method.PATCH: {
          response = this.httpClient.patch(apiPath, payload, config);
          break;
        }
        case Method.DELETE: {
          response = this.httpClient.delete(apiPath, config);
          break;
        }
        default: {
          throw new Error("Method wrong!");
        }
      }
      return response;
    } catch (error) {
      logger.error(
        `Request have been failed in url: ${
          this.baseURL
        }/${apiPath}: ${JSON.stringify(error)}`
      );
      throw error;
    }
  }
}
