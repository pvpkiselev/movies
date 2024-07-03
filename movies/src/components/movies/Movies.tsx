import styles from './Movies.module.scss';

// interface MoviesProps {
//   movies: Movie[];
// }

// type Movie = {
//   title: string;
// };

export default function Movies() {
  return (
    <article className={styles.movies}>
      <div>Тут должны быть фильмы</div>
      {/* {movies.map((movie) => (
        <div key={movie.title} className={styles.movieItem}>
          <p>{movie.title}</p>
        </div>
      ))} */}
    </article>
  );
}
