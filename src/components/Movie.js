export const Movie = (props) => {
  return (
    <li
      key={props.keyId}
      className="one-movie"
      onClick={() => {
        props.onClickMovie(props.title);
      }}
    >
      <div>
        <div className="title">{props.title}</div>
        <div>
          {props.rating} Rating, {props.year.slice(0, 4)}
        </div>
      </div>
    </li>
  );
};
