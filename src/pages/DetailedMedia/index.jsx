import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import api from "../../services/api";

import "./detailedmedia.css";

const DetailedMedia = () => {
  const { id } = useParams();
  const [media, setMedia] = useState(null);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    api
      .get(`/movie/${id}`, { params: { append_to_response: "credits" } })
      .then((res) => {
        setMedia(res.data);
        const actors = res.data.credits.cast.slice(0, 10);
        setActors(actors);
      })
      .catch((error) => console.error(error.message));
  }, []);

  return (
    <div>
      {media && (
        <div className="detailed-media-container">
          <img
            className="image-detailed-media"
            src={`https://image.tmdb.org/t/p/original/${media.backdrop_path}`}
            alt={media.title}
          />
          <div className="media-detailed-container">
            <img
              className="image-poster-media"
              src={`https://image.tmdb.org/t/p/original/${media.poster_path}`}
              alt={media.title}
            />
            <div className="detailed-media-info">
              <div>
                <h1 className="detailed-media-title">{media.title}</h1>
                <p className="detailed-media-resume">{media.tagline}</p>
              </div>
              <div className="detailed-media-overview">
                <p>{media.runtime}</p>
                <p>{media.vote_average}</p>
              </div>
              <p className="detailed-media-synopsis">{media.overview}</p>
            </div>
            <div className="detailed-media-actors">
              {actors.map((actor) => (
                <div key={actor.id}>
                  <img
                    className="image-poster-media"
                    src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
                    alt={media.title}
                  />
                  <p>{actor.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedMedia;
