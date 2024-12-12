import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../context";
import { v4 as uuid } from "uuid";

import { mainPath } from "../../routes";
import Media from "../../components/Media";
import Loading from "../../components/Loading";
import Coment from "../../components/Coment";

import "./detailedavaliation.css";

const DetailedAvaliation = () => {
  const { user } = useContext(Context);
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [avaliationDetailed, setAvaliationDetailed] = useState({});
  const [contentComent, setContentComent] = useState("");
  const [coments, setComents] = useState([]);
  const [like, setLike] = useState([]);
  const [liked, setLiked] = useState(false);

  const [amountLikes, setAmountLikes] = useState(0);
  const [amountComents, setAmountComents] = useState(0);

  useEffect(() => {
    const likes = JSON.parse(localStorage.getItem("mylikes")) || [];
    const existentLike = likes.find((l) => l.avaliation_id === id);

    setAmountLikes(likes.filter((like) => like.avaliation_id === id).length);

    const comments = JSON.parse(localStorage.getItem("comments")) || [];

    setAmountComents(
      comments.filter((comment) => comment.avaliation_id === id).length
    );

    if (existentLike) {
      setLiked(true);
      setLike(existentLike);
    }
  }, [id]);

  useEffect(() => {
    const avaliations = JSON.parse(localStorage.getItem("avaliations")) || [];
    const avaliation = avaliations.find((avaliation) => avaliation.id === id);

    if (avaliation) {
      setAvaliationDetailed(avaliation);
      setLoading(false);

      const comments = JSON.parse(localStorage.getItem("comments")) || [];
      const commentsAvaliation = comments.filter(
        (coment) => coment.avaliation_id === id
      );

      setComents(commentsAvaliation);
    }
  }, [id]);

  function handleLike() {
    const likes = JSON.parse(localStorage.getItem("mylikes")) || [];

    if (liked) {
      const newLikes = likes.filter((l) => l.avaliation_id !== id);
      localStorage.setItem("mylikes", JSON.stringify(newLikes));
      setLiked(false);
      setAmountLikes(amountLikes - 1);
    } else {
      const newLike = { user_id: user.id, avaliation_id: id };
      localStorage.setItem("mylikes", JSON.stringify([...likes, newLike]));
      setLiked(true);
      setAmountLikes(amountLikes + 1);
    }
  }

  function handleComent() {
    const coment = {
      id: uuid(),
      user_id: user.id,
      avaliation_id: id,
      user_name: user.name,
      user_user: user.user,
      media_name: avaliationDetailed.media_name,
      content: contentComent,
      amountLikes: 0,
      created_at: new Date().toLocaleString(),
    };

    const existentComments = JSON.parse(localStorage.getItem("comments")) || [];
    localStorage.setItem(
      "comments",
      JSON.stringify([coment, ...existentComments])
    );

    setComents([coment, ...coments]);
    setContentComent("");
    setAmountComents(amountComents + 1);
  }

  return (
    <div className="avaliation-detail-container">
      {loading && <Loading />}
      <div className="avaliation-container">
        <div className="avaliation-container-header">
          <Link to={`/${mainPath}/timeline`}>
            <ion-icon name="arrow-back-outline"></ion-icon>
            Timeline
          </Link>
        </div>
        {avaliationDetailed && (
          <div className="avaliation">
            <div className="header-coment">
              <div className="info-user">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="51"
                  height="40"
                  viewBox="0 0 51 40"
                  fill="blueviolet"
                >
                  <path d="M1.84167 23.1579L16.575 0H24.65L15.1583 20.0702C19.0306 22.0351 20.9667 25.1696 20.9667 29.4737C20.9667 32.2807 19.9278 34.7602 17.85 36.9123C15.7722 38.9708 13.3167 40 10.4833 40C7.46111 40 4.95833 38.9708 2.975 36.9123C0.991667 34.8538 0 32.3743 0 29.4737C0 27.1345 0.613889 25.0292 1.84167 23.1579ZM28.1917 23.1579L42.925 0H51L41.5083 20.0702C45.3806 22.0351 47.3167 25.1696 47.3167 29.4737C47.3167 32.2807 46.2778 34.7602 44.2 36.9123C42.1222 38.9708 39.6667 40 36.8333 40C33.8111 40 31.3083 38.9708 29.325 36.9123C27.3417 34.8538 26.35 32.3743 26.35 29.4737C26.35 27.1345 26.9639 25.0292 28.1917 23.1579Z"></path>
                </svg>
                <div className="user-info">
                  <h3>{avaliationDetailed.user_name}</h3>
                  <p>@{avaliationDetailed.user_user}</p>
                </div>
              </div>
              <div className="info-post">
                <p
                  style={{
                    backgroundColor: "blueviolet",
                  }}
                >
                  {avaliationDetailed.created_at}
                </p>
              </div>
            </div>
            <div className="content-coment">{avaliationDetailed.content}</div>
            <div className="footer-coment">
              <div className="info-media">
                <div
                  style={{
                    backgroundColor: "blueviolet",
                  }}
                  className="color-coment"
                >
                  <ion-icon name="film-outline"></ion-icon>
                </div>
                <div className="info-footer">
                  <h3>Sobre</h3>
                  <p>{avaliationDetailed.media_name}</p>
                </div>
              </div>
              <div className="info-avaliation">
                <div
                  style={{
                    backgroundColor: "blueviolet",
                  }}
                  className="amount-coments"
                >
                  <ion-icon name="chatbubble"></ion-icon>
                  <p>{amountComents}</p>
                </div>
                <div
                  style={{
                    backgroundColor: "blueviolet",
                  }}
                  className="amount-likes"
                >
                  <ion-icon name="heart"></ion-icon>
                  <p>{amountLikes}</p>
                </div>
              </div>
            </div>
            <div className="links-coment-container">
              <button onClick={() => handleLike()}>
                <ion-icon
                  style={
                    liked ? { animation: "heart 0.5s" } : { animation: "none" }
                  }
                  name={liked ? "heart" : "heart-outline"}
                ></ion-icon>
              </button>
            </div>
          </div>
        )}
        <div className="form-coment">
          <h1>Comente</h1>
          <textarea
            value={contentComent}
            onChange={(e) => setContentComent(e.target.value)}
            placeholder="O que você acha?"
            cols="30"
            rows="10"
            maxLength="360"
          ></textarea>
          <button onClick={() => handleComent()}>
            <ion-icon name="chatbox"></ion-icon>
            Comentar
          </button>
        </div>
        <div className="avaliations-coments-container">
          {coments.length > 0 && (
            <div className="header-avaliations-coments-container">
              <h1>Comentários</h1>
            </div>
          )}
          {coments.length === 0 && (
            <div className="nothing-container">
              <h1>Nenhum comentário encontrado</h1>
              <p>Assim que alguém comentar mostraremos aqui pra você.</p>
            </div>
          )}
          <div className="coments">
            {coments.length > 0 &&
              coments.map((coment) => (
                <Coment key={coment.id} coment={coment} />
              ))}
          </div>
        </div>
      </div>
      <div className="media-avaliation-container">
        <h1>Mídia Avaliada</h1>
        {avaliationDetailed.media_id && (
          <Media
            redirect
            selectMedia={() => {}}
            media={{
              id: avaliationDetailed.media_id,
              title: avaliationDetailed.media_name,
              poster_path: avaliationDetailed.media_poster_path,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DetailedAvaliation;
