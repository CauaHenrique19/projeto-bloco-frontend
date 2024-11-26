import { useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import Avaliation from "../../components/Avaliation";
import Coment from "../../components/Coment";

import { Context } from "../../context";
import api from "../../services/api";

import "./timeline.css";

const Timeline = () => {
  const { user, setUser } = useContext(Context);

  const [avaliations, setAvaliations] = useState([]);
  const [coments, setComents] = useState([]);
  const [viewInputSearchMediaMention, setViewInputSearchMediaMention] =
    useState(false);
  const [searchMediaMention, setSearchMediaMention] = useState("");
  const [mediasToMention, setMediasToMention] = useState([]);

  const [contentAvaliation, setContentAvaliation] = useState("");
  const [stars, setStars] = useState(0);
  const [mentionedMedia, setMentionedMedia] = useState(null);

  useEffect(() => {
    const avaliations = JSON.parse(localStorage.getItem("avaliations")) || [];
    setAvaliations(avaliations);

    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    setComents(comments);
  }, []);

  function handleSearchMediasMention(e) {
    setSearchMediaMention(e.target.value);

    if (!e.target.value) {
      setMediasToMention([]);
    } else {
      api
        .get(`/search/movie`, { params: { query: e.target.value } })
        .then((res) => setMediasToMention(res.data.results))
        .catch((error) => console.error(error.data));
    }
  }

  function handleAvaliate() {
    const avaliation = {
      id: uuid(),
      user_name: user.name,
      user_user: user.user,
      media_id: mentionedMedia.id,
      media_name: mentionedMedia.title,
      media_poster_path: mentionedMedia.poster_path,
      content: contentAvaliation,
      stars,
      amountComents: 0,
      amountLikes: 0,
      created_at: new Date().toLocaleString(),
    };

    const newUser = {
      ...user,
      avaliations: [avaliation, ...avaliations],
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const newUsers = users.filter((u) => u.user !== user.user);
    localStorage.setItem("users", JSON.stringify([newUser, ...newUsers]));

    localStorage.setItem(
      "avaliations",
      JSON.stringify([avaliation, ...avaliations])
    );

    setAvaliations([avaliation, ...avaliations]);
    setContentAvaliation("");
    setMentionedMedia(null);
    setStars(0);
    setSearchMediaMention("");
    setViewInputSearchMediaMention(false);
  }

  return (
    <div className="timeline-container">
      <div className="timeline-content-container">
        <div className="main-timeline">
          <div className="columns-container">
            <div className="container-new-avaliation">
              <h1>Avalie</h1>
              <textarea
                value={contentAvaliation}
                onChange={(e) => setContentAvaliation(e.target.value)}
                placeholder="O que você acha?"
                maxLength="360"
                cols="30"
                rows="5"
              ></textarea>
              {mentionedMedia && (
                <div className="media-mentioned-container">
                  <div className="media-mentioned">
                    <div
                      style={{ backgroundColor: "blueviolet" }}
                      className="color-media-mentioned"
                    >
                      <ion-icon name="film-outline"></ion-icon>
                    </div>
                    <div className="info-media-mentioned">
                      <h2>Sobre</h2>
                      <h2>{mentionedMedia.title}</h2>
                    </div>
                    <button onClick={() => setMentionedMedia(null)}>
                      <ion-icon name="trash-outline"></ion-icon>
                    </button>
                  </div>
                  <div className="stars">
                    <h2>Estrelas</h2>
                    <div>
                      <div>
                        <ion-icon name="star"></ion-icon>
                        <h2>{stars}</h2>
                      </div>
                      <input
                        value={stars}
                        type="range"
                        onChange={(e) => setStars(e.target.value)}
                        name="stars"
                        id="stars"
                        max="5"
                        step="0.1"
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="footer-container-new-avaliation">
                <div className="mention-media">
                  <button
                    onClick={() =>
                      setViewInputSearchMediaMention(
                        !viewInputSearchMediaMention
                      )
                    }
                  >
                    <ion-icon name="videocam-outline"></ion-icon>
                    Mencionar Mídia
                  </button>
                  {viewInputSearchMediaMention && (
                    <div className="input-container">
                      <input
                        value={searchMediaMention}
                        onChange={(e) => handleSearchMediasMention(e)}
                        type="text"
                        placeholder="Nome da mídia"
                      />
                      {searchMediaMention && (
                        <ion-icon
                          onClick={() => {
                            setMediasToMention([]);
                            setSearchMediaMention("");
                          }}
                          name="close-outline"
                        ></ion-icon>
                      )}
                      <ion-icon name="search-outline"></ion-icon>
                    </div>
                  )}
                </div>
                <button onClick={() => handleAvaliate()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 51 40"
                    fill="#fafafa"
                  >
                    <path d="M1.84167 23.1579L16.575 0H24.65L15.1583 20.0702C19.0306 22.0351 20.9667 25.1696 20.9667 29.4737C20.9667 32.2807 19.9278 34.7602 17.85 36.9123C15.7722 38.9708 13.3167 40 10.4833 40C7.46111 40 4.95833 38.9708 2.975 36.9123C0.991667 34.8538 0 32.3743 0 29.4737C0 27.1345 0.613889 25.0292 1.84167 23.1579ZM28.1917 23.1579L42.925 0H51L41.5083 20.0702C45.3806 22.0351 47.3167 25.1696 47.3167 29.4737C47.3167 32.2807 46.2778 34.7602 44.2 36.9123C42.1222 38.9708 39.6667 40 36.8333 40C33.8111 40 31.3083 38.9708 29.325 36.9123C27.3417 34.8538 26.35 32.3743 26.35 29.4737C26.35 27.1345 26.9639 25.0292 28.1917 23.1579Z"></path>
                  </svg>
                  Avaliar
                </button>
              </div>
              {mediasToMention.length > 0 && (
                <div className="medias-to-mention">
                  <div className="medias-to-mention-container">
                    {mediasToMention.length > 0 &&
                      mediasToMention.map((media) => (
                        <div
                          onClick={() => {
                            setMentionedMedia(media);
                            setMediasToMention([]);
                          }}
                          key={media.id}
                          className="media-to-mention"
                        >
                          <div className="img-media-to-mention-container">
                            <img
                              src={`https://image.tmdb.org/t/p/original/${media.backdrop_path}`}
                              alt={media.title}
                            />
                          </div>
                          <div className="info-media-to-mention-container">
                            <h2>{media.title}</h2>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
            <div className="columns">
              <div className="column-avaliations">
                {avaliations.length > 0 ? (
                  avaliations.map((avaliation) => (
                    <Avaliation
                      key={avaliation.id}
                      avaliation={avaliation}
                      handleDelete={() => {
                        console.log("delete");
                      }}
                    />
                  ))
                ) : (
                  <div className="nothing-container">
                    <h1>Nenhuma avaliação encontrada</h1>
                    <p>
                      Assim que alguém avaliar algo do seu gosto ou algum
                      seguidor avaliar alguma coisa mostraremos aqui.
                    </p>
                  </div>
                )}
              </div>
              <div className="column-coments">
                {coments.length > 0 ? (
                  coments.map((coment) => (
                    <Coment
                      key={coment.id}
                      coment={coment}
                      handleDelete={() => {
                        console.log("delete");
                      }}
                    />
                  ))
                ) : (
                  <div className="nothing-container">
                    <h1>Nenhum comentário encontrado</h1>
                    <p>
                      Assim que alguém comentar algo do seu gosto ou algum
                      seguidor comentar alguma coisa mostraremos aqui.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
