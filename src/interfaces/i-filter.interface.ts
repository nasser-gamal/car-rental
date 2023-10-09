export interface IFilterInterface {
  filter: string;
  fields: string;
  sort: string;
  keyword: string;
  paginate: IPaginate;
}

export interface IPaginate {
  page: number;
  limit: number;
  total: number;
}
