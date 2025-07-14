export interface RequestResponse<T> {
  code: string,
  message: string,
  body: T
}
