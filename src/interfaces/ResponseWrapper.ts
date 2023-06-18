export interface ResponseWrapper {
  data: string;
  status: 'Ok' | 'Unauthorized' | 'Error';
}

export interface ResponseWrapperT<T extends object> {
  data: T;
  status: 'Ok' | 'Unauthorized' | 'Error';
}