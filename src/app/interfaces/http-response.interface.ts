export interface IHttpResponse<T = any> {
  status: number;
  data: T;
  token: string;
  [key: string]: any;
}
