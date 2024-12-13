import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { Context } from "../../context";
import { mainPath } from "../../routes";

import "./coment.css";

const Coment = ({ coment }) => {
  const { user } = useContext(Context);
  const [liked, setLiked] = useState(false);
  const [like, setLike] = useState([]);

  const [amountLikes, setAmountLikes] = useState(0);

  useEffect(() => {
    const likes = JSON.parse(localStorage.getItem("mylikes")) || [];
    const existentLike = likes.find((l) => l.coment_id === coment.id);

    setAmountLikes(likes.filter((like) => like.coment_id === coment.id).length);

    if (existentLike) {
      setLiked(true);
      setLike(existentLike);
    }
  }, [coment]);

  function handleLike() {
    const likes = JSON.parse(localStorage.getItem("mylikes")) || [];

    if (liked) {
      const newLikes = likes.filter((l) => l.coment_id !== coment.id);
      localStorage.setItem("mylikes", JSON.stringify(newLikes));
      setLiked(false);
      setAmountLikes(amountLikes - 1);
    } else {
      const newLike = { user_id: user.id, coment_id: coment.id };
      localStorage.setItem("mylikes", JSON.stringify([...likes, newLike]));
      setLiked(true);
      setAmountLikes(amountLikes + 1);
    }
  }

  return (
    <div key={coment.id} className="coment">
      <div className="header-coment">
        <div className="info-user">
          <ion-icon style={{ color: "blueviolet" }} name="chatbox"></ion-icon>
          <div className="user-info">
            <h3>{coment.user_name}</h3>
            <p>@{coment.user_user}</p>
          </div>
        </div>
        <div className="info-post">
          <p style={{ backgroundColor: "blueviolet" }}>{coment.created_at}</p>
        </div>
      </div>
      <div className="content-coment">{coment.content}</div>
      <div className="footer-coment">
        <div className="info-media">
          <div
            style={{ backgroundColor: "blueviolet" }}
            className="color-coment"
          >
            <ion-icon name="film-outline"></ion-icon>
          </div>
          <div className="info-footer">
            <h3>Sobre</h3>
            <p>
              {coment.media_name.length > 18
                ? `${coment.media_name.substring(0, 17)}...`
                : coment.media_name}
            </p>
          </div>
        </div>
        <div className="info-coment">
          <div
            style={{ backgroundColor: "blueviolet" }}
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
            style={liked ? { animation: "heart 0.5s" } : { animation: "none" }}
            name={liked ? "heart" : "heart-outline"}
          ></ion-icon>
        </button>
        {user.id !== coment.user_id && (
          <Link to={`/${mainPath}/user/${coment.user_user}`}>
            <ion-icon name="person-outline"></ion-icon>
          </Link>
        )}
        <Link to={`/${mainPath}/avaliation/${coment.avaliation_id}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="51"
            height="40"
            viewBox="0 0 51 40"
            fill="#fff"
          >
            <path d="M1.84167 23.1579L16.575 0H24.65L15.1583 20.0702C19.0306 22.0351 20.9667 25.1696 20.9667 29.4737C20.9667 32.2807 19.9278 34.7602 17.85 36.9123C15.7722 38.9708 13.3167 40 10.4833 40C7.46111 40 4.95833 38.9708 2.975 36.9123C0.991667 34.8538 0 32.3743 0 29.4737C0 27.1345 0.613889 25.0292 1.84167 23.1579ZM28.1917 23.1579L42.925 0H51L41.5083 20.0702C45.3806 22.0351 47.3167 25.1696 47.3167 29.4737C47.3167 32.2807 46.2778 34.7602 44.2 36.9123C42.1222 38.9708 39.6667 40 36.8333 40C33.8111 40 31.3083 38.9708 29.325 36.9123C27.3417 34.8538 26.35 32.3743 26.35 29.4737C26.35 27.1345 26.9639 25.0292 28.1917 23.1579Z"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Coment;