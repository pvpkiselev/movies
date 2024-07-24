export type Genre = {
  id: number;
  name: string;
  checked: boolean;
};

export interface GenreResponse {
  genres: Genre[];
}
