import { Link } from "react-router-dom";

import "./style.css";

const Media = ({ media, redirect, selectMedia }) => {
  return (
    <Link
      to={redirect && `/media/${media.id}`}
      onClick={(e) => selectMedia(e)}
      className="media"
    >
      <div className="media-image-container">
        <img
          src={`https://image.tmdb.org/t/p/original/${media.poster_path}`}
          alt={media.title}
        />
      </div>
      <div className="media-info-container">
        <h2>{media.title}</h2>
      </div>
    </Link>
  );
};

export default Media;
