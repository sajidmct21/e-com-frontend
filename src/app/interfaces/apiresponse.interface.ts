export interface Apiresponse<T> {
  statusCode: number;
  message: string;
  data: T;
}
