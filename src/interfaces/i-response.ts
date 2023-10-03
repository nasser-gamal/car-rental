export interface IApiResponse<T> {
  status?: string;
  statusCode: number;
  message?: string | null;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  } | null;
  data?: T | null;
}