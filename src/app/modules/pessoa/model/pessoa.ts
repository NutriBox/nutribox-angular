export interface Pessoa{
  idPessoa: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  idUser?: number;
  idTipoPessoa?: number;
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

export interface Pessoas {
  pessoa: Pessoa[];
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
