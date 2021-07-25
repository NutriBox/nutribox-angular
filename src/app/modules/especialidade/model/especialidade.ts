export interface Especialidade {
  idEspecialidade: number;
  nomeEspecialidade: string;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Pageable {
  sort: Sort;
  pageSize: number;
  pageNumber: number;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface Sort2 {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface SortOrdem {
  active: string;
  direction: string;
}

export interface Especialidades {
  especialidade: Especialidade[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: Sort2;
  sortOrdem: SortOrdem;
  numberOfElements: number;
  first: boolean;
  size: number;
  number: number;
  empty: boolean;
}
