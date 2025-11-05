export default interface PropsPaginate {
  numberResults: number;
  currentPage: number;
  numberPages: number;
  totalResults: number;
  onUpdatePage: (page: number) => void;
}

export const PAGINATE_INITIAL: PropsPaginate = {
  numberResults: 0,
  currentPage: 1,
  numberPages: 10,
  totalResults: 0,
  onUpdatePage: () => {},
};
