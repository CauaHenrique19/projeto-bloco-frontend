import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { Context } from "../../context";

import "./avaliation.css";

const Avaliation = ({ avaliation, handleDelete }) => {
  const mainPath = "projeto-bloco-frontend";

  const { user } = useContext(Context);
  const [liked, setLiked] = useState(false);
  const [like, setLike] = useState([]);

  useEffect(() => {
    const likes = JSON.parse(localStorage.getItem("mylikes")) || [];
    const existentLike = likes.find((l) => l.avaliation_id === avaliation.id);

    if (existentLike) {
      setLiked(true);
      setLike(existentLike);
    }
  }, [avaliation, user.id]);

  function handleLike() {
    const likes = JSON.parse(localStorage.getItem("mylikes")) || [];

    if (liked) {
      const newLikes = likes.filter((l) => l.avaliation_id !== avaliation.id);
      localStorage.setItem("mylikes", JSON.stringify(newLikes));
      setLiked(false);
    } else {
      const newLike = { user_id: user.id, avaliation_id: avaliation.id };
      localStorage.setItem("mylikes", JSON.stringify([...likes, newLike]));
      setLiked(true);
    }
  }

  return (
    <div key={avaliation.id} className="avaliation">
      <div className="header-avaliation">
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
            <h3>{avaliation.user_name}</h3>
            <p>@{avaliation.user_user}</p>
          </div>
        </div>
        <div className="info-post">
          <p style={{ backgroundColor: "blueviolet" }}>
            {avaliation.created_at}
          </p>
        </div>
      </div>
      <div className="content-avaliation">{avaliation.content}</div>
      <div className="footer-avaliation">
        <div className="info-media">
          <div
            style={{ backgroundColor: "blueviolet" }}
            className="color-avaliation"
          >
            <ion-icon name="film-outline"></ion-icon>
          </div>
          <div className="info-footer">
            <h3>Sobre</h3>
            <p>
              {avaliation.media_name.length > 18
                ? `${avaliation.media_name.substring(0, 20)}...`
                : avaliation.media_name}
            </p>
          </div>
        </div>
        <div className="info-avaliation">
          <div
            style={{ backgroundColor: "blueviolet" }}
            className="amount-avaliations"
          >
            <ion-icon name="chatbubble"></ion-icon>
            <p>{avaliation.amountComents}</p>
          </div>
          <div
            style={{ backgroundColor: "blueviolet" }}
            className="amount-likes"
          >
            <ion-icon name="heart"></ion-icon>
            <p>{avaliation.amountLikes}</p>
          </div>
        </div>
      </div>
      <div className="links-avaliation-container">
        <button onClick={() => handleLike()}>
          <ion-icon
            style={liked ? { animation: "heart 0.5s" } : { animation: "none" }}
            name={liked ? "heart" : "heart-outline"}
          ></ion-icon>
        </button>
        {user.id === avaliation.user_id && (
          <button onClick={handleDelete}>
            <ion-icon name="trash-outline"></ion-icon>
          </button>
        )}
        {user.id !== avaliation.user_id && (
          <Link to={`/${mainPath}/user/${avaliation.user_user}`}>
            <ion-icon name="person-outline"></ion-icon>
          </Link>
        )}
        <Link to={`/${mainPath}/avaliation/${avaliation.id}`}>
          <ion-icon name="add-outline"></ion-icon>
        </Link>
      </div>
    </div>
  );
};

export default Avaliation;
