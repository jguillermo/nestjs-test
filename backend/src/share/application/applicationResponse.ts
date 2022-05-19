export class ResponseId {
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}

export class ResponseStatus {
  status: string;

  constructor(status: string) {
    this.status = status;
  }

  static ok() {
    return new ResponseStatus('ok');
  }
}

export class ApplicationResponse {
  public static id(id: string): ResponseId {
    return new ResponseId(id);
  }
}

export interface PaginatorResponse {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: number;
}
