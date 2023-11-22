/**
 * @type T : type of documents array in body response
 */
export interface IResponseHasPaginate<T> {
   body: {
      docs: T[];
      totalDocs: number;
      limit: number;
      page: number;
      pagingCounter: number;
      hasPrevPage: boolean;
      hasNextPage: boolean;
      prevPage: null;
      nextPage: null;
   };
   message: string;
   status: number;
}
export interface IResponseUserHasPaginate<T> {
   user: {
      docs: T[];
      totalDocs: number;
      limit: number;
      page: number;
      pagingCounter: number;
      hasPrevPage: boolean;
      hasNextPage: boolean;
      prevPage: null;
      nextPage: null;
   };
   message: string;
   status: number;
}

export interface IResponse<T> {
   body: { data: T[] | T };
   message: string;
   status: number;
}
export interface IResponseUser<T> {
   user: T;
   message: string;
   status: number;
}
export interface IQueryParam {
   sort: string;
   order: 'asc' | 'desc';
   limit: number;
   page: number;
   expand: boolean;
   q: string;
   category: string;
   brand: string;
   subCate: string;
}
