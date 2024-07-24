interface Gravatar {
  hash: string;
}

interface Tmdb {
  avatar_path: string | null;
}

export interface Avatar {
  gravatar: Gravatar;
  tmdb: Tmdb;
}

export interface User {
  avatar: Avatar;
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}
